import React, { MouseEvent } from 'react';

import type { QuizModel } from '@/models/QuizModel';

import { Selection } from '../Selection';

import { getSelectionState } from './utils';

interface QuizSelectionsProps {
  hold?: boolean;
  quiz: QuizModel;
  onClick?: (e: MouseEvent<Element>, selectionIndex: number) => void;
}

export function QuizSelections({ hold, quiz, onClick }: QuizSelectionsProps) {
  const isSelected = quiz.selectedIndex != null;

  return (
    <div className="flex flex-col w-full h-fit gap-[30px]">
      <section className="flex items-center h-[40%] w-full px-[2em]">
        <h1 className="text-center w-full">{quiz?.question}</h1>
      </section>
      <section className="flex-1 flex justify-center items-center">
        <div className="flex flex-col gap-[20px]">
          {quiz?.selections.map((selection, i) => (
            <Selection
              key={`quiz-selection-${quiz.question}-${selection.content}]`}
              hold={hold}
              content={selection.content}
              state={isSelected ? getSelectionState(selection) : null}
              onClick={(e) => onClick?.(e, i)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
