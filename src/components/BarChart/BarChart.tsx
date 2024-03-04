import React, { memo } from 'react';
import {
  BarChart as BarChartComponent,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

export type ChartData = {
  name: string;
  values: {
    [key: string]: number;
  };
};

interface BarChartProps {
  width: number;
  height: number;
  barColors: string[];
  chartDatas: ChartData[];
}

export const BarChart = memo(function BarChart({
  width,
  height,
  chartDatas,
  barColors,
}: BarChartProps) {
  const inputData = chartDatas.map(({ name, values }) => ({
    name,
    ...values,
  }));
  const longestValues = getLongestValues(chartDatas);

  return (
    <BarChartComponent width={width} height={height} data={inputData}>
      <YAxis />
      <XAxis dataKey="name" />
      <Tooltip />
      <Legend />
      {Object.entries(longestValues).map(([key], i) => {
        const barColor = barColors[i];
        return <Bar key={`${key}-${barColor}`} dataKey={key} fill={barColor} />;
      })}
    </BarChartComponent>
  );
});

function getLongestValues(data: ChartData[]) {
  let maxLength = 0;
  let index = 0;
  data.forEach(({ values }, i) => {
    const valueLength = Object.keys(values).length;
    if (valueLength > maxLength) {
      maxLength = valueLength;
      index = i;
    }
  });

  return data[index].values;
}
