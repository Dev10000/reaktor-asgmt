'use client';

import { useEffect, useState } from 'react';
import StationRow from './StationRow';
import db from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

function StationList() {
  const [drones, setDrones] = useState<any[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, 'history'),
      orderBy('shortestDistance', 'asc'),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) =>
      setDrones(
        querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    );
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Drones</h3>
          <span className="text-base font-normal text-gray-500">
            List of all drones
          </span>
        </div>
        <div className="flex-shrink-0">
          <a
            href="#"
            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
          >
            View all
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Drone
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pilot
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {drones.map(({ id, data }) => (
                    <StationRow
                      key={id}
                      drone1={`${data.model}, ${data.manufacturer}`}
                      drone2={data.serialNumber}
                      distance={data.shortestDistance}
                      name={`${data.pilot?.firstName} ${data.pilot?.lastName}`}
                      email={data.pilot?.email}
                      phone={data.pilot?.phoneNumber}
                      index={id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationList;
