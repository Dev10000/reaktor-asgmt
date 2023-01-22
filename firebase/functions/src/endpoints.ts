import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * @description - Update a lock timestamp - endpoint
 *
 * Update a lock timestamps with the current timestamp. Everytime someone
 * hits the website either LockStart will trigger a fetchData function or
 * keepActive resets and the fetchData keep running X amount of time.
 * X amount of time is set in the fetchData function.
 *
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {void}
 * https://us-central1-reaktor-asgmt.cloudfunctions.net/updateLock
 */
const updateLock = functions.https.onRequest(async (req, res) => {
  const oneMinute = 60000;
  const collection = admin.firestore().collection('locks');

  // docLockStart is only used to start the fetchData
  const docLockStart = collection.doc('fetchDataLockStart');

  // docKeepActive is used for keep the fetch active for X amount of time
  const docKeepActive = collection.doc('fetchDataLockKeepActive');
  const lockRefKeepActive = await docKeepActive.get();

  const timeSpentKeepActive = Date.now() - lockRefKeepActive.get('timestamp');

  // Start fetch request if KeepActive is older than 30 mim else just update the keepActive
  if (!lockRefKeepActive || timeSpentKeepActive > 30 * oneMinute) {
    const timestamp = Date.now();
    await docLockStart.set({ timestamp: timestamp });
    await docKeepActive.set({ timestamp: timestamp });
    console.log('Lock Start', new Date(timestamp));
    res.send('Lock Start and Lock Keep Active timestamp updated');
  } else {
    const timestamp = Date.now();
    await docKeepActive.set({ timestamp: timestamp });
    console.log('Lock Keep Active', new Date(timestamp));
    res.send('Lock Keep Active timestamp updated');
  }
});

// eslint-disable-next-line import/prefer-default-export
export { updateLock };
