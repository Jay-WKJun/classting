'use client';

import React from 'react';

import { QuizStateProvider } from '@/contexts/QuizContext';
import { TimeStateProvider } from '@/contexts/TimeContext';

interface ProvidersProps {
  children: React.ReactElement;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QuizStateProvider>
      <TimeStateProvider>{children}</TimeStateProvider>
    </QuizStateProvider>
  );
}
