import { QuizModel } from '@/models/QuizModel';

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
