import React from 'react';

import { getQuizs } from '@/api/quizApi';

import { QuizStart } from './QuizStart';

export async function QuizStartPage() {
  const quizs = await getQuizs({});

  if (!quizs) {
    return null;
  }

  return <QuizStart quizs={quizs.results} />;
}
