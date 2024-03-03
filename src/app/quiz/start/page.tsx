import React from 'react';

import { getQuizs } from '@/api/quizApi';

import { QuizStart } from './QuizStart';

async function QuizStartPage() {
  const quizs = await getQuizs({});

  if (!quizs || quizs.results.length === 0) {
    throw new Error('Failed to load quizs. 🤯 Please Try Again.');
  }

  return <QuizStart quizs={quizs.results} />;
}

export default QuizStartPage;
