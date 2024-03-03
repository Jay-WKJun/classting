import React from 'react';

import { getQuizs } from '@/api/quizApi';

import { QuizStart } from './QuizStart';

async function QuizStartPage() {
  const quizs = await getQuizs({});

  if (!quizs || quizs.results.length === 0) {
    // TODO: 에러 페이지로 이동
    return null;
  }

  return <QuizStart quizs={quizs.results} />;
}

export default QuizStartPage;
