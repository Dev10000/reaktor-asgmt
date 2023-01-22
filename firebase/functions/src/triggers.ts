import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { setTimeout } from 'timers/promises';
import longPoll from './data/loadData';

/**
 * @description - Fetch Data and Update Database - Long Polling Data
 *
 * This function is triggered by the updateLock function. The updateLock function
 * is triggered by the website.
 *
 * The fetchData function is a long running function that fetches data from an API
 * and updates the database.
 *
 * This function is also recursive as the function is triggered again every X amount
 * of time. If the condition is met the function will run again by updating firestore
 * doc 'fetchDataLockStart'. If the condition is not met the function will stop.
 *
 * @function
 * @async
 * @return {void}
 *
 * @listens updateLock - The change event from the Firestore onUpdate. 'locks/fetchDataLockStart'
 * @fires longPoll - The longPoll function.
 */
const fetchData = functions
  .runWith({ timeoutSeconds: 540, minInstances: 5 })
  .firestore.document('locks/fetchDataLockStart')
  .onUpdate(async () => {
    console.log('fetchData trigger fired');
    const oneMinute = 60000;
    const locks = admin.firestore().collection('locks');
    const keepActiveDoc = await locks.doc('fetchDataLockKeepActive').get();
    const startDoc = await locks.doc('fetchDataLockStart').get();

    const timestampStartBefore = startDoc.get('timestamp');
    try {
      await longPoll(Date.now(), 5 * oneMinute, 2000);
    } catch (error) {
      console.log('MAIN fetch Data Error:', error);
      await setTimeout(2000);
    }

    const timestampStartAfter = startDoc.get('timestamp');
    const noNewStart = timestampStartBefore === timestampStartAfter;

    const timestampKeepActive = keepActiveDoc.get('timestamp');
    const timeSpentKeepActive = Date.now() - timestampKeepActive;

    console.log(
      'Time Spent Long Polling and noNewStart is: ',
      timeSpentKeepActive,
      noNewStart,
    );

    if (noNewStart && timeSpentKeepActive < 5 * oneMinute) {
      console.log('Run time less then 30 min KEEP ACTIVE!');
      return locks.doc('fetchDataLockStart').set({ timestamp: Date.now() });
    }
    return undefined;
  });

// eslint-disable-next-line import/prefer-default-export
export { fetchData };
