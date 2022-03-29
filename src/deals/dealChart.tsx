import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { useDeals } from './api';
import { useMemo } from 'react';

export const DealChart = () => {
  const { data: deals, loading, error } = useDeals();
  const chartAppropriateDeals = useMemo(() => {
    if (!deals) return [];
    return deals.map(deal => ({...deal, price: deal.price.toString()}));
  }, [deals])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return (
    <div className="deal-chart">
      {/*<LineChart width={500} height={300} data={chartAppropriateDeals}>*/}
      {/*  <XAxis dataKey="createdAt"/>*/}
      {/*  <YAxis domain={['auto', 'auto']} label="Stock Price"/>*/}
      {/*  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>*/}
      {/*  <Line type="monotone" dataKey="price" stroke="#ff7300" />*/}
      {/*</LineChart>*/}
    </div>
  );
};