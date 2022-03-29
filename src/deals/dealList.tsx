import { useDeals } from './api';

export const DealList = () => {
  const { data: deals, loading, error } = useDeals();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return (
    <div className="latest-deals">
      <h2>Latest Deals</h2>
      <div className="deals-list">
        {deals!.slice(0, 20).map((deal) => (
          <div key={deal.id}>Qty: {deal.quantity} for ${deal.price} per one</div>
        ))}
      </div>
    </div>
  );
};