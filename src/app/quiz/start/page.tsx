import React from 'react';

import { getQuizs } from '@/api/quizApi';

import { QuizStart } from './QuizStart';

async function QuizStartPage() {
  const quizs = await getQuizs({});

  if (!quizs) {
    return null;
  }

  return <QuizStart quizs={quizs.results} />;
}

export default QuizStartPage;
