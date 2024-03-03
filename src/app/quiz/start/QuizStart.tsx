'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { createDynamicQuizRoute } from '@/constants/route';
import { useSetTimeContext } from '@/contexts';
import { useSetQuizContext } from '@/contexts/QuizContext';
import { QuizModelPOJO } from '@/models/QuizModel';

interface QuizStartProps {
  quizs: QuizModelPOJO[];
}

export function QuizStart({ quizs: quiz }: QuizStartProps) {
  const router = useRouter();

  const setQuizContext = useSetQuizContext();
  const initQuizs = setQuizContext?.initQuizs;
  const setTime = useSetTimeContext();

  useEffect(() => {
    if (initQuizs && setTime) {
      initQuizs(quiz);
      setTime(Date.now());
      router.push(createDynamicQuizRoute(0));
    }
  }, [initQuizs, quiz, router, setTime]);

  return <div>Loading...</div>;
}
