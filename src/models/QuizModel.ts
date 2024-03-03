import { decodeHtmlString, shuffle } from '@/utils/utils';

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

class QuizModel {
  category: string;

  type: boolean;

  difficulty: Difficulty;

  question: string;

  correctAnswer: string;

  incorrectAnswers: string[];

  selections: SelectionModel[];

  correctAnswerIndex: number;

  selectedIndex = -1;

  constructor({
    category,
    type,
    difficulty,
    question,
    correctAnswer,
    incorrectAnswers,
  }: QuizModelPOJO) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = decodeHtmlString(question);
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;

    const [selections, correctAnswerIndex] = this.setSelections(incorrectAnswers, correctAnswer);
    this.selections = selections.map((el, i) => (
      new SelectionModel({ content: el, index: i, isCorrect: i === correctAnswerIndex })
    ));
    this.correctAnswerIndex = correctAnswerIndex;
  }

  setSelections = <T>(array: T[], additionalElement: T): [T[], number] => {
    const newArr = shuffle(array);
    const correctAnswerIndex = Math.floor(Math.random() * newArr.length);

    newArr.splice(correctAnswerIndex, 0, additionalElement);
    return [newArr, correctAnswerIndex];
  };

  selectIndex = (index: number) => {
    this.selectedIndex = index;
  };

  isSelected = () => (this.selectedIndex >= 0);

  getSelectionsLength = () => this.selections.length;

  isCorrect = () => this.selectedIndex === this.correctAnswerIndex;

  initQuiz = () => {
    this.selectedIndex = -1;
    this.selections.forEach((selection) => selection.initSelect());
  };
}

export { QuizModel };
