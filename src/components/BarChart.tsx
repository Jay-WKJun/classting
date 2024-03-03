import React from 'react';
import {
  BarChart as BarChartComponent,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

interface BarChartProps {
  width: number;
  height: number;
  data: {
    name: string;
    bars: {
      key: string;
      color: string;
      value: number;
    }[];
  }[];
}

function BarChart({ width, height, data }: BarChartProps) {
  const inputData = data.map(({ name, bars }) => {
    const res: { [key: string]: string | number } = { name };
    bars.forEach(({ key, value }) => {
      res[key] = value;
    });

    return res;
  });

  return (
    <BarChartComponent width={width} height={height} data={inputData}>
      <YAxis />
      <XAxis dataKey="name" />
      <Tooltip />
      <Legend />
      {data[0].bars.map(({ key, color }) => (
        <Bar
          key={`${data[0].name}-${key}-${color}`}
          dataKey={key}
          fill={color}
        />
      ))}
    </BarChartComponent>
  );
}

export { BarChart };
