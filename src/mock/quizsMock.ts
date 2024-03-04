import { QuizModel } from '@/models/QuizModel';

// @ts-expect-error: This is quizmodel
export const mockQuizs: QuizModel[] = [
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Video Games',
    question:
      'Gordon Freeman is said to have burnt and destroyed what food in the break room microwave?',
    correctAnswer: 'Casserole',
    incorrectAnswers: ['Sub Sandwich', 'Chicken Soup', 'Pepperoni Pizza'],
    selections: [
      {
        content: 'Casserole',
        index: 0,
        isCorrect: true,
        isSelected: false,
      },
      {
        content: 'Pepperoni Pizza',
        index: 1,
        isCorrect: false,
        isSelected: false,
      },
      {
        content: 'Chicken Soup',
        index: 2,
        isCorrect: false,
        isSelected: false,
      },
      {
        content: 'Sub Sandwich',
        index: 3,
        isCorrect: false,
        isSelected: false,
      },
    ],
    correctAnswerIndex: 0,
    selectedIndex: null,
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Music',
    question:
      'Which member of the Foo Fighters was previously the drummer for Nirvana?',
    correctAnswer: 'Dave Grohl',
    incorrectAnswers: ['Taylor Hawkins', 'Nate Mendel', 'Chris Shiflett'],
    selections: [
      {
        content: 'Nate Mendel',
        index: 0,
        isCorrect: false,
        isSelected: false,
      },
      {
        content: 'Chris Shiflett',
        index: 1,
        isCorrect: false,
        isSelected: false,
      },
      {
        content: 'Dave Grohl',
        index: 2,
        isCorrect: true,
        isSelected: false,
      },
      {
        content: 'Taylor Hawkins',
        index: 3,
        isCorrect: false,
        isSelected: false,
      },
    ],
    correctAnswerIndex: 2,
    selectedIndex: null,
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Music',
    question:
      'Which Disney character sings the song "A Dream is a Wish Your Heart Makes"?',
    correctAnswer: 'Cinderella',
    incorrectAnswers: ['Belle', 'Snow White', 'Pocahontas'],
    selections: [
      {
        content: 'Cinderella',
        index: 0,
        isCorrect: true,
        isSelected: false,
      },
      {
        content: 'Snow White',
        index: 1,
        isCorrect: false,
        isSelected: false,
      },
      {
        content: 'Belle',
        index: 2,
        isCorrect: false,
        isSelected: false,
      },
      {
        content: 'Pocahontas',
        index: 3,
        isCorrect: false,
        isSelected: false,
      },
    ],
    correctAnswerIndex: 0,
    selectedIndex: null,
  },
] as QuizModel[];
