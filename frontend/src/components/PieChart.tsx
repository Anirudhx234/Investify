import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

// Define the data type for each entry
interface DataEntry {
  name: string;
  value: number;
}

// Define the props interface to accept types and numbers
interface PieChartExampleProps {
  types: string[];
  numbers: number[];
}

// Predefined color palette for better visual appeal
const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#FF5722']; // Custom color palette

// Functional component that accepts types and numbers as props
const PieChartExample: React.FC<PieChartExampleProps> = ({ types, numbers }) => {
  // Create data array from props
  const data: DataEntry[] = types.map((type, index) => ({
    name: type,
    value: numbers[index],
  }));

  return (
    <PieChart width={700} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label={({ name }) => name} // Display the name/type
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Use predefined colors
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartExample;