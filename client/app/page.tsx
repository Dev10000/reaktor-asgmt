import { Chart as ChartJS } from 'chart.js/auto';
import BubbleChart from './BubbleChart';
import StationList from './StationList';
import InfoBoxes from './InfoBoxes';

const url = 'https://us-central1-reaktor-asgmt.cloudfunctions.net/updateLock';

// const getRequest = async () => {
//   const response = await fetch(url, { cache: 'no-store' });
//   const data = await response.text();
//   return data;
// };

async function Home() {
  ChartJS.register();

  // getRequest().then((data) => {
  //   console.log(data);
  // });

  return (
    <main className="flex bg-gray-50 max-w-screen-2xl mx-auto">
      <div className="h-full w-full bg-gray-50 relative overflow-y-auto">
        <div className="pt-6 px-4">
          <InfoBoxes />

          {/* CHART AND LIST */}
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 pb-4">
            <BubbleChart />
            <StationList />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
