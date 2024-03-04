import type { Meta, StoryObj } from '@storybook/react';

import {mockQuizs} from '@/mock/quizsMock';

import { Selection } from './Selection';
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Quiz/Selection',
  component: Selection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Selection>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSelection = mockQuizs[0].selections[0];

export const Gallery: Story = {
  args: {
    content: mockSelection.content,
  },
  render: function Render(args) {
    return (
      <div className='w-full h-full flex justify-center items-center gap-[30px]'>
        <Selection {...args} state="selected" />
        <Selection {...args} state="answer" />
        <Selection {...args} />
      </div>
    );
  }
};

export const Toggle: Story = {
  args: {
    content: mockSelection.content,
  },
  render: function Render(args) {
    const [{ state }, setArgs] = useArgs();

    const onClick = () => {
      let newSelectState = null;
      if (state === 'selected') {
        newSelectState = 'answer';
      } else if (state === 'answer') {
        newSelectState = null;
      } else {
        newSelectState = 'selected';
      }

      setArgs({ state: newSelectState });
    };

    return (
      <Selection {...args} onClick={onClick} />
    );
  }
};

export const WithHold: Story = {
  args: {
    content: mockSelection.content,
    hold: true,
  },
  render: function Render(args) {
    const [{ state }, setArgs] = useArgs();

    const onClick = () => {
      let newSelectState = null;
      if (state === 'selected') {
        newSelectState = 'answer';
      } else if (state === 'answer') {
        newSelectState = null;
      } else {
        newSelectState = 'selected';
      }

      setArgs({ state: newSelectState });
    };

    return (
      <Selection {...args} onClick={onClick} />
    );
  }
};
