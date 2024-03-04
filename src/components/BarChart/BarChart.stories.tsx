import type { Meta, StoryObj } from '@storybook/react';

import { BarChart, ChartData } from './BarChart';

const meta = {
  title: 'Components/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const BAR_COLORS = ['#8884d8', '#de3c13'];

const chartDatas: ChartData[] = [
  {
    name: 'result',
    values: {
      correct: 1,
      incorrect: 3,
    },
  },
];

export const Primary: Story = {
  args: {
    width: 300,
    height: 400,
    barColors: BAR_COLORS,
    chartDatas,
  },
};

const BAR_COLORS2 = ['#27b849', '#b0be18'];

const chartDatas2: ChartData[] = [
  {
    name: 'name1',
    values: {
      first: 1,
      second: 5,
    },
  },
  {
    name: 'name2',
    values: {
      first: 1,
      second: 3,
      third: 2,
    },
  },
  {
    name: 'name3',
    values: {
      first: 3,
      second: 2,
    },
  },
]

export const MultipleGraph: Story = {
  args: {
    width: 300,
    height: 400,
    barColors: BAR_COLORS2,
    chartDatas: chartDatas2,
  },
};
