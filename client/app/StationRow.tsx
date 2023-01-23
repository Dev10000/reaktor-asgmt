import React from 'react';

// Define proptypes
interface StationRowProps {
  drone1: any;
  drone2: any;
  distance: any;
  name: any;
  email: any;
  phone: any;
  index: any;
}

const rounding = (num: number) =>
  Number(Math.round(Number(num.toString() + 'e2')) + 'e-2');

function StationRow({
  drone1,
  drone2,
  distance,
  name,
  email,
  phone,
  index,
}: StationRowProps) {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        <span className="font-semibold">{drone1} </span>
        <p>{drone2}</p>
        <p>Shortest distance: {distance ? rounding(distance) : ''}</p>
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-500">
        {email ? (
          <>
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
          </>
        ) : (
          'No Pilot Info Available'
        )}
      </td>
    </tr>
  );
}

export default StationRow;
