import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { mockQuizs } from '@/mock/quizsMock';
import { selectQuiz } from '@/models/QuizModel';

import { QuizSelections } from './QuizSelections';

const meta = {
  title: 'Quiz/QuizSelections',
  component: QuizSelections,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuizSelections>;

export default meta;
type Story = StoryObj<typeof meta>;

const quizMock = mockQuizs[0];
const quizMock2 = mockQuizs[1];

export const Primary: Story = {
  args: {
    quiz: quizMock,
  },
  render: function Render(args) {
    const [{ quiz }, setArgs] = useArgs();

    const handleSelectionClick = (
      _: React.MouseEvent,
      selectionIndex: number,
    ) => {
      const { quiz } = args;
      const selectedQuiz = selectQuiz(quiz, selectionIndex);
      setArgs({ quiz: selectedQuiz });
    };

    return (
      <QuizSelections {...args} quiz={quiz} onClick={handleSelectionClick} />
    );
  },
};

export const Second: Story = {
  args: {
    quiz: quizMock2,
  },
  render: function Render(args) {
    const [{ quiz }, setArgs] = useArgs();

    const handleSelectionClick = (
      _: React.MouseEvent,
      selectionIndex: number,
    ) => {
      const { quiz } = args;
      const selectedQuiz = selectQuiz(quiz, selectionIndex);
      setArgs({ quiz: selectedQuiz });
    };

    return (
      <QuizSelections {...args} quiz={quiz} onClick={handleSelectionClick} />
    );
  },
};

export const WithHold: Story = {
  args: {
    hold: true,
    quiz: quizMock,
  },
  render: function Render(args) {
    const [{ quiz }, setArgs] = useArgs();

    const handleSelectionClick = (
      _: React.MouseEvent,
      selectionIndex: number,
    ) => {
      const { quiz } = args;
      const selectedQuiz = selectQuiz(quiz, selectionIndex);
      setArgs({ quiz: selectedQuiz });
    };

    return (
      <QuizSelections {...args} quiz={quiz} onClick={handleSelectionClick} />
    );
  },
};
