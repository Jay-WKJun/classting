'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { createDynamicQuizRoute } from '@/constants/route';
import { useSetQuizContext } from '@/contexts/QuizContext';
import { QuizModelPOJO } from '@/models/QuizModel';

interface QuizStartProps {
  quizs: QuizModelPOJO[];
}

export function QuizStart({ quizs: quiz }: QuizStartProps) {
  const router = useRouter();

  const setQuizContext = useSetQuizContext();
  const initQuizs = setQuizContext?.initQuizs;

  useEffect(() => {
    initQuizs?.(quiz);
    router.push(createDynamicQuizRoute(0));
  }, [initQuizs, quiz, router]);

  return <div>Loading...</div>;
}
