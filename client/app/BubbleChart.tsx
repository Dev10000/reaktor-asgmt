'use client';

import { Chart as ChartJS } from 'chart.js/auto';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import db from '../firebase';

const rounding = (num: number) =>
  Number(Math.round(Number(num.toString() + 'e1')) + 'e-1');

function BubbleChart() {
  const [drones, setDrones] = useState<any[]>([]);
  const defaultData = [
    { x: 0, y: 0, r: 0 },
    { x: 500, y: 500, r: 0 },
  ];
  useEffect(() => {
    const q = query(collection(db, 'history'));
    const unsubscribe = onSnapshot(q, (querySnapshot) =>
      setDrones(
        querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          data: {
            x: Math.round(doc.data().positionX / 1000),
            y: Math.round(doc.data().positionY / 1000),
            r: 2,
          },
        })),
      ),
    );
  }, []);
  ChartJS.register();

  const deviceData = [
    {
      x: 250,
      y: 250,
      r: 78,
    },
  ];
  const data = {
    datasets: [
      {
        label: 'Drone',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: 'rgba(0,0,100,0.5)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(10,10,0,0.2)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        hoverRadius: 0,
        hitRadius: 0,
        radius: 0,
        pointHitRadius: 0,
        pointStyle: 'circle',
        data: [...defaultData, ...drones.map((drone) => drone.data)],
      },
      {
        label: 'NDZ',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(100,0,0,0.5)',
        pointBackgroundColor: 'rgba(100,0,0,0.5)',
        //pointBackgroundColor: 'rgba(0,200,0,0.5)',
        pointBorderWidth: 1,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: 'rgba(10,10,0,0.2)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        hoverRadius: 0,
        hitRadius: 0,
        radius: 0,
        pointHitRadius: 0,
        pointStyle: 'circle',
        data: deviceData,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0 break-all">
          <h2 className="text-lg sm:text-2xl leading-none font-bold text-gray-900 break-all">
            Birdnest NDZ Map
          </h2>
          <h3 className="text-base font-normal text-gray-500">
            Data is deleted after 10 minutes of last update from drone
          </h3>
        </div>
      </div>
      <Chart type="bubble" data={data} />
    </div>
  );
}

export default BubbleChart;
