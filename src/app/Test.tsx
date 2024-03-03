'use client';

import { getQuiz } from '@/api/quizApi';
import React, { useEffect } from 'react';

interface TestProps {}

export function Test({}: TestProps) {
  useEffect(() => {
    getQuiz({ amount: 3, difficulty: 'easy' }).then((res) => {
      console.log(res)
    });
  }, [])
  return <></>;
}
