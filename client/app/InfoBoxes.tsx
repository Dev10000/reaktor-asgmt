'use client';

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from '../firebase';
const url = 'https://us-central1-reaktor-asgmt.cloudfunctions.net/updateLock';
const rounding = (num: number) =>
  Number(Math.round(Number(num.toString() + 'e2')) + 'e-2');

function InfoBoxes() {
  const [device, setDevice] = useState<any>();
  const [snapshot, setSnapshot] = useState<any>();
  const [stats, setStats] = useState<any>();
  useEffect(() => {
    const q = doc(db, 'snapshots', 'report');
    const unsubscribe = onSnapshot(q, (doc) => {
      setDevice(() => doc.data()?.deviceInformation),
        setSnapshot(() => doc.data()?.capture);
    });
    const q2 = query(
      collection(db, 'history'),
      orderBy('shortestDistance', 'asc'),
    );
    const unsubscribe2 = onSnapshot(q2, (querySnapshot) =>
      setStats(() => querySnapshot?.docs[0]?.data()),
    );

    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
      {/* INFO BOX 3 */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Device Info
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Device Id: {device ? device.deviceId : ''}
            </h3>
            <h3 className="text-base font-normal text-gray-500">
              Device Started: {device ? device.deviceStarted : ''}
            </h3>
            <h3 className="text-base font-normal text-gray-500">
              Listen Range: {device ? device.listenRange : ''}
            </h3>
            <h3 className="text-base font-normal text-gray-500">
              Update Interval Ms: {device ? device.updateIntervalMs : ''}
            </h3>
            <h3 className="text-base font-normal text-gray-500">
              Uptime Seconds: {device ? device.uptimeSeconds : ''}
            </h3>
          </div>
        </div>
      </div>
      {/* INFO BOX 1 */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Closest Confirmed Distance
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Pilot: {stats ? stats.pilot?.firstName : ''}{' '}
              {stats ? stats.pilot?.lastName : ''}
            </h3>
            <h3 className="text-base font-normal text-gray-500">
              Distance: {stats ? `${rounding(stats.shortestDistance)} m` : ''}
            </h3>
          </div>
        </div>
      </div>
      {/* INFO BOX 2 */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              Snapshot
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Time: {snapshot ? snapshot.snapshotTimestamp : ''}
            </h3>
            {snapshot?.drone
              ? snapshot.drone.map((d: any) => (
                  <h3 className="text-base font-normal text-gray-500">
                    {d.model} - {d.manufacturer} - {rounding(d.positionX)},{' '}
                    {rounding(d.positionY)}
                  </h3>
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoBoxes;
