export const HOME = '/';
export const QUIZ = '/quiz';
export const RESULT = '/result';
export const QUIZ_START = `${QUIZ}/start`;

export function createDynamicQuizRoute(id: string | number) {
  return `${QUIZ}/${id}`;
}
