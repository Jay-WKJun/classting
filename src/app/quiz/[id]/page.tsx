'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';

import { LinkButton } from '@/components/LinkButton';
import { QuizSelections } from '@/components/QuizSelections';
import {
  QUIZ_START,
  HOME,
  RESULT,
  createDynamicQuizRoute,
} from '@/constants/route';
import {
  useQuizsContext,
  useQuizsSettersContext,
} from '@/contexts/QuizContext';
import { QuizModel, selectQuiz } from '@/models/QuizModel';
import { toNumber } from '@/utils';

function QuizServerPage() {
  const router = useRouter();
  const quizs = useQuizsContext();
  const quizsSetters = useQuizsSettersContext();
  const setQuizs = quizsSetters?.setQuizs;

  const params = useParams();
  const id = toNumber(params.id);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (id == null) {
      router.push(HOME);
    }
  }, [id, router]);

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

  const createQuizSelectClickHandler = useCallback(
    (id: number) => (_: MouseEvent<Element>, selectionIndex: number) => {
      setIsSelected(true);
      setQuizs?.((prevQuizs) => {
        const newQuizs = [...prevQuizs];
        const quiz = newQuizs[id];
        newQuizs[id] = selectQuiz(quiz, selectionIndex);

        return newQuizs;
      });
    },
    [setQuizs],
  );

  if (!quizs || quizs.length <= 0 || id == null) {
    router.push(QUIZ_START);
    return null;
  }

  return (
    <div className="w-full min-h-full py-[50px]">
      <QuizSelections
        quiz={quizs[id]}
        onClick={isSelected ? createQuizSelectClickHandler(id) : undefined}
      />
      <footer className="w-full flex justify-center items-center mt-[50px]">
        {isSelected && createToTheNextButtonComponent(id, quizs)}
      </footer>
    </div>
  );
}

export default QuizServerPage;
