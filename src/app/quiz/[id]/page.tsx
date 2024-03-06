'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';

import { LinkButton } from '@/components/LinkButton';
import { QuizSelections } from '@/components/QuizSelections';
import { Spinner } from '@/components/Spinner';
import { HOME, RESULT, createDynamicQuizRoute } from '@/constants/route';
import {
  useQuizsContext,
  useQuizsSettersContext,
} from '@/contexts/QuizContext';
import { QuizModel, selectQuiz } from '@/models/QuizModel';
import { toNumber } from '@/utils';

function QuizPage() {
  const router = useRouter();
  const quizs = useQuizsContext();
  const quizsSetters = useQuizsSettersContext();
  const setQuizs = quizsSetters?.setQuizs;

  const params = useParams();
  const id = toNumber(params.id);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(
    function validatePage() {
      if (quizs.length <= 0 || id == null) {
        router.push(HOME);
      }
    },
    [id, quizs, router],
  );

  const createToTheNextButtonComponent = useCallback(
    (id: number, quizs: QuizModel[]) => {
      const quizLength = quizs.length;
      const isLast = id + 1 === quizLength;

      const [href, content] = isLast
        ? [RESULT, '결과 보기']
        : [createDynamicQuizRoute(id + 1), '다음 문항'];

      return (
        <LinkButton
          href={href}
          className="text-[24px] bg-red-400"
          onClick={() => {
            setIsSelected(false);
          }}
        >
          {content}
        </LinkButton>
      );
    },
    [],
  );

  const handleQuizSelectionClick = useCallback(
    (_: MouseEvent<Element>, selectionIndex: number) => {
      if (id == null) return;

      setIsSelected(true);
      setQuizs?.((prevQuizs) => {
        const newQuizs = [...prevQuizs];
        const quiz = newQuizs[id];
        newQuizs[id] = selectQuiz(quiz, selectionIndex);

        return newQuizs;
      });
    },
    [id, setQuizs],
  );

  if (quizs.length <= 0 || id == null) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[100px] h-[100px]">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full py-[50px]">
      <QuizSelections
        quiz={quizs[id]}
        onClick={isSelected ? undefined : handleQuizSelectionClick}
      />
      <footer className="w-full flex justify-center items-center mt-[50px]">
        {isSelected && createToTheNextButtonComponent(id, quizs)}
      </footer>
    </div>
  );
}

export default QuizPage;
