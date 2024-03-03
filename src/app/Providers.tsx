'use client';

import React from 'react';

import { QuizStateProvider, TimeStateProvider } from '@/contexts';

interface ProvidersProps {
  children?: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QuizStateProvider>
      <TimeStateProvider>{children}</TimeStateProvider>
    </QuizStateProvider>
  );
}
