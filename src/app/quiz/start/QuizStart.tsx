'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { Spinner } from '@/components';
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

  return (
    <div className="w-full h-full flex flex-col gap-[30px] justify-center items-center">
      <div className="w-full h-full max-w-[200px] max-h-[200px] min-w-[100px] min-h-[100px] m-[50px]">
        <Spinner />
      </div>
      <h1>Loading...</h1>
    </div>
  );
}
