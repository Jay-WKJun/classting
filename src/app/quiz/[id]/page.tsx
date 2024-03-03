'use client';

import React from 'react';

import { useQuizContext } from '@/contexts/QuizContext';

function QuizServerPage() {
  const quizs = useQuizContext();

  return (
    <div>
      {quizs?.map((quiz) => <div key={quiz.question}>{quiz.question}</div>)}
    </div>
  );
}

export default QuizServerPage;
