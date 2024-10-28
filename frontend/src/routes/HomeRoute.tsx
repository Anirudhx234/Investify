import PieChartExample from '../components/piechart';
// import { Provider } from 'react-redux';
// import store from '../features/store';
import QuestionnaireForm from '../components/QuestionnaireForm';

export default function HomeRoute() {
  const types = ['Stocks', 'ETFs', 'Mutual Funds', 'Crypto'];
  const numbers = [200, 500, 1000, 50];
  return (
    <>
    {/* <Provider store={store}>
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <QuestionnaireForm />
      </div>
      </Provider> */}
      <PieChartExample types={types} numbers={numbers} />
      <h1 className="text-lg font-bold">Home Page</h1>
            <QuestionnaireForm />
    </>
  );
}
