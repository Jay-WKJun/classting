'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';

import { QuizSelections } from '@/components';
import { LinkButton } from '@/components/LinkButton';
import {
  QUIZ_START,
  HOME,
  RESULT,
  createDynamicQuizRoute,
} from '@/constants/route';
import { useQuizsContext, useQuizsSettersContext } from '@/contexts';

import { selectQuiz } from './utils';

function QuizServerPage() {
  const router = useRouter();
  const quizs = useQuizsContext();
  const quizsSetters = useQuizsSettersContext();
  const setQuizs = quizsSetters?.setQuizs;

  const params = useParams();
  const id = Number(params.id);
  const isIdExist = params.id != null && !Number.isNaN(id);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (!isIdExist) {
      router.push(HOME);
    }
  }, [isIdExist, router]);

  const ToTheNextButton = useMemo(() => {
    if (!isIdExist || !quizs?.length) return null;

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
  }, [id, isIdExist, quizs]);

  const quizSelectClickHandler = useMemo(() => {
    if (isSelected) return undefined;

    return (_: MouseEvent<Element>, selectionIndex: number) => {
      setIsSelected(true);
      setQuizs?.((prevQuizs) => {
        const newQuizs = [...prevQuizs];
        const quiz = newQuizs[id];
        newQuizs[id] = selectQuiz(quiz, selectionIndex);

        return newQuizs;
      });
    };
  }, [id, isSelected, setQuizs]);

  if (!quizs || quizs.length <= 0) {
    router.push(QUIZ_START);
    return null;
  }

  return (
    <div className="w-full min-h-full py-[50px]">
      <QuizSelections quiz={quizs[id]} onClick={quizSelectClickHandler} />
      <footer className="w-full flex justify-center items-center mt-[50px]">
        {isSelected && ToTheNextButton}
      </footer>
    </div>
  );
}

export default QuizServerPage;
