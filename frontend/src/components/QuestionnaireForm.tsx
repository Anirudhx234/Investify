import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShortTermGoal, setLongTermGoal, setRiskTolerance } from '../features/store';
import { RootState } from '../features/store';

const QuestionnaireForm: React.FC = () => {
  const dispatch = useDispatch();
  const { shortTermGoal, longTermGoal, riskTolerance } = useSelector((state: RootState) => state.questionnaire);

  const handleShortTermGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShortTermGoal(e.target.value));
  };

  const handleLongTermGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLongTermGoal(e.target.value));
  };

  const handleRiskToleranceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRiskTolerance(e.target.value));
  };

  return (
    <form className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Investment Questionnaire</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium">What is your short-term goal?</label>
        <input
          type="text"
          value={shortTermGoal}
          onChange={handleShortTermGoalChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">What is your long-term goal?</label>
        <input
          type="text"
          value={longTermGoal}
          onChange={handleLongTermGoalChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">How risky are you willing to be with your investments?</label>
        <select
          value={riskTolerance}
          onChange={handleRiskToleranceChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Risk Tolerance</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default QuestionnaireForm;
