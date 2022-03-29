import { useDeals } from './api';
import { useMemo } from 'react';

import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Deals',
    },
  },
};

export const DealChart = () => {
  const { data: deals, loading, error } = useDeals();
  const data = useMemo(() => {
    return {
      datasets: [
        {
          data: !deals ? [] : deals.map(deal => Number(deal.price)),
        }
      ]
    }
  }, [deals])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className="deal-chart">
      <Line options={options} data={data} />
    </div>
  );
};