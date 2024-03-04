import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  args: {},
  render: function Render(args) {
    return (
      <div className="flex items-center gap-[100px]">
        <div className="flex flex-col justify-center items-center gap-[30px]">
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} />
          </div>
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} spinnerColor="red" />
          </div>
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} backgroundColor="red" />
          </div>
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} spinnerColor="yellow" backgroundColor="black" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-[30px]">
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} spinnerWidth="1px" />
          </div>
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} spinnerWidth="5px" />
          </div>
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} />
          </div>
          <div className="w-[50px] h-[50px]">
            <Spinner {...args} spinnerWidth="15px" />
          </div>
        </div>
      </div>
    );
  },
};

export const Primary: Story = {
  args: {
    spinnerWidth: '10px',
    spinnerColor: '#007bff',
    backgroundColor: '#ccc',
  },
  render: function Render(args) {
    return (
      <div className="w-[100px] h-[100px]">
        <Spinner {...args} />
      </div>
    );
  },
};
