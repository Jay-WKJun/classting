export const HOME = '/';
export const QUIZ = '/quiz';
export const RESULT = '/result';
export const QUIZ_START = `${QUIZ}/start`;
export const NOTE = `/note`;

export function createDynamicQuizRoute(id: string | number) {
  return `${QUIZ}/${id}`;
}

export function createDynamicNoteRoute(id: string | number) {
  return `${NOTE}/${id}`;
}
