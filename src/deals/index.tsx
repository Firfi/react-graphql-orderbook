import { DealList } from './dealList';
import { DealChart } from './dealChart';

export const Deals = () => {
  return (
    <div className="deals">
      <DealChart />
      <DealList />
    </div>
  );
};