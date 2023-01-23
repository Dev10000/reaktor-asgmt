import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * @description - Delete Stale History
 * - Deletes history older than 10 minutes
 * @function
 * @async
 * @return {Promise<FirebaseFirestore.WriteResult>}
 * @throws {Error}
 */

const deleteStaleHistory = functions.pubsub
  .schedule('every 10 minutes')
  .onRun(async () => {
    const oneMinute = 60000;
    const cutoff = new Date(Date.now() - 10 * oneMinute);
    const stale = admin
      .firestore()
      .collection('history')
      .where('updatedAt', '<', cutoff);
    try {
      const snapshot = await stale.get();
      const staleStats = admin.firestore().collection('stats').doc('data');
      const statsSnapshot = await staleStats.get();
      const batch = admin.firestore().batch();
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      if (statsSnapshot.exists) batch.delete(staleStats);

      return await batch.commit();
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

// eslint-disable-next-line import/prefer-default-export
export { deleteStaleHistory };
