import type { QuizModel } from '@/models/QuizModel';

export function getCounts(
  callback: (el: QuizModel) => boolean,
  quizs?: QuizModel[],
) {
  if (!quizs) return 0;

  return quizs.reduce((prev, curr) => {
    if (callback(curr)) return prev + 1;
    return prev;
  }, 0);
}

export function getCountLabel(label: string, count: number) {
  return `${label} : ${count} 개`;
}

export function getSpentTime(startTime: number) {
  return Date.now() - startTime;
}
