import { fetchDrones, updateSnapShot } from './helpers';

/**
 * @description Long Polling background process to fetch data from API and update DB
 *
 * Promise rejection if the API call fails, XML parsing fails,
 * JSON validation fails or DB update fails.
 *
 * @param {Number} startTime date.now()
 * @param {Number} runningTime milliseconds
 * @param {Number} interval milliseconds
 * @return {Promise} - resolves to 'done' and after 10 seconds to void or rejects with error
 */
const longPoll = async (
  startTime: number,
  runningTime: number,
  interval: number,
): Promise<'done' | Error> =>
  new Promise((resolve, reject) => {
    (async function timer() {
      console.log('Fetching data from API and updating DB');
      const endTime = startTime + runningTime;
      if (Date.now() >= endTime) resolve('done');
      // Run extra 10 seconds due slow serverless function start
      if (Date.now() >= endTime + 10000) return;
      try {
        const data = await fetchDrones();
        updateSnapShot('report', data.report);
        setTimeout(timer, interval);
      } catch (error) {
        console.log('longPoll Error', error);
        reject(error);
      }
    })();
  });

export default longPoll;
