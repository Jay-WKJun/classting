import { decodeHtmlString, shuffle } from '@/utils';

import { SelectionModel } from './SelectionModel';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizModelPOJO {
  category: string;
  type: boolean;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface QuizModel {
  category: string;
  type: boolean;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  selections: SelectionModel[];
  correctAnswerIndex: number;
  selectedIndex: number | null;
}

export function createQuizModel(quizPOJO: QuizModelPOJO): QuizModel {
  const { incorrectAnswers, correctAnswer } = quizPOJO;
  const newSelections = shuffle(incorrectAnswers);
  const correctAnswerIndex = Math.floor(Math.random() * newSelections.length);
  newSelections.splice(correctAnswerIndex, 0, correctAnswer);

  const selections = newSelections.map((el, i) => ({
    content: el,
    index: i,
    isCorrect: i === correctAnswerIndex,
    isSelected: false,
  }));

  return {
    ...quizPOJO,
    question: decodeHtmlString(quizPOJO.question),
    selections,
    correctAnswerIndex,
    selectedIndex: null,
  };
}

export function selectQuiz(quiz: QuizModel, selectionIndex: number): QuizModel {
  return {
    ...quiz,
    selectedIndex: selectionIndex,
    selections: quiz.selections.map((selection, i) => ({
      ...selection,
      isSelected: i === selectionIndex,
    })),
  };
}
