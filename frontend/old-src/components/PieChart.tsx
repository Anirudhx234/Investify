// import React from 'react';
// import { PieChart, Pie, Cell } from 'recharts';

// // Define the data type for each entry
// interface DataEntry {
//   name: string;
//   value: number;
// }

// // Define the props interface to accept types and numbers
// interface PieChartExampleProps {
//   types: string[];
//   numbers: number[];
// }

// // Predefined color palette for better visual appeal
// const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#FF5722']; // Custom color palette

// // Functional component that accepts types and numbers as props
// const PieChartExample: React.FC<PieChartExampleProps> = ({ types, numbers }) => {
//   // Create data array from props
//   const data: DataEntry[] = types.map((type, index) => ({
//     name: type,
//     value: numbers[index],
//   }));

//   return (
//     <PieChart width={700} height={400}>
//       <Pie
//         data={data}
//         cx={200}
//         cy={200}
//         outerRadius={150}
//         fill="#8884d8"
//         dataKey="value"
//         label={({ name }) => name} // Display the name/type
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Use predefined colors
//         ))}
//       </Pie>
//     </PieChart>
//   );
// };

// export default PieChartExample;
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useFetchSectorValuationsQuery } from "../api/piechart";
import useAppSelector from "../hooks/useAppSelector";
import type { RootState } from "../app/store";

// Predefined color palette for better visual appeal
const COLORS = ["#4CAF50", "#FFC107", "#2196F3", "#FF5722"];

const PieChartExample: React.FC = () => {
  const clientId =
    useAppSelector((state: RootState) => state.client.id) || "me";

  const {
    data: sectorValuations,
    error,
    isLoading,
  } = useFetchSectorValuationsQuery(clientId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }

  const data = Object.entries(sectorValuations || {}).map(([name, value]) => ({
    name,
    value,
  }));

  if (
    !sectorValuations ||
    sectorValuations.length === 0 ||
    Object.entries(data).length === 0
  ) {
    return <div>No data available</div>;
  }

  let secVal: string = "";
  data.forEach(item => {
    secVal +=  `${item.name}: ${item.value}, `;
  });

  return (
    <div className="w-full h-full tooltip" data-tip={secVal}>
      <PieChart width={400} height={400} className="h-full w-full">
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={({ name }) => name}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          ></Cell>
        ))}
      </Pie>
    </PieChart>
    </div>
  );
};

export default PieChartExample;
