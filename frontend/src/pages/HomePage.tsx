import PieChart from '../components/PieChart';
export default function HomePage() {
  const types = ['Stocks', 'ETFs', 'Mutual Funds', 'Crypto'];
  const numbers = [200, 500, 1000, 50];
  return (
    <PieChart types={types} numbers={numbers} />
  );
}