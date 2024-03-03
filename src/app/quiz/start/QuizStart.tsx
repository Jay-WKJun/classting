'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { createDynamicQuizRoute } from '@/constants/route';
import { useSetTimeContext } from '@/contexts';
import { useQuizsSettersContext } from '@/contexts/QuizContext';
import { QuizModelPOJO } from '@/models/QuizModel';

interface QuizStartProps {
  quizs: QuizModelPOJO[];
}

export function QuizStart({ quizs: quiz }: QuizStartProps) {
  const router = useRouter();

  const quizsSettersContext = useQuizsSettersContext();
  const initQuizs = quizsSettersContext?.initQuizs;
  const setTime = useSetTimeContext();

  useEffect(() => {
    if (initQuizs && setTime) {
      initQuizs(quiz);
      setTime(Date.now());
      router.push(createDynamicQuizRoute(0));
    }
  }, [initQuizs, quiz, router, setTime]);

  // TODO: 가운데 맞추고, 로딩 스피너 추가
  return <div>Loading...</div>;
}
