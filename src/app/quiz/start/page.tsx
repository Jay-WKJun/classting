'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { getQuizs } from '@/api/quizApi';
import { Spinner } from '@/components/Spinner';
import { createDynamicQuizRoute } from '@/constants/route';
import { useQuizsSettersContext } from '@/contexts/QuizContext';
import { useSetTimeContext } from '@/contexts/TimeContext';

function QuizStartPage() {
  const router = useRouter();

  const quizsSettersContext = useQuizsSettersContext();
  const initQuizs = quizsSettersContext?.initQuizs;
  const setTime = useSetTimeContext();

  useEffect(() => {
    if (initQuizs && setTime) {
      getQuizs({}).then((res) => {
        const quizs = res.results;
        initQuizs(quizs);
        setTime(Date.now());
        router.push(createDynamicQuizRoute(0));
      });
    }
  }, [initQuizs, router, setTime]);

  return (
    <div className="w-full h-full flex flex-col gap-[30px] justify-center items-center">
      <div className="w-full h-full max-w-[200px] max-h-[200px] min-w-[100px] min-h-[100px] m-[50px]">
        <Spinner />
      </div>
      <h1>Loading...</h1>
    </div>
  );
}

export default QuizStartPage;
