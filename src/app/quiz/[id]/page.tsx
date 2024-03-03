'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';

import { QuizSelections } from '@/components';
import {
  QUIZ_START,
  HOME,
  RESULT,
  createDynamicQuizRoute,
} from '@/constants/route';
import { useQuizsContext, useQuizsSettersContext } from '@/contexts';

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

    const [callback, content] = isLast
      ? [() => router.push(RESULT), '결과 보기']
      : [() => router.push(createDynamicQuizRoute(id + 1)), '다음 문항'];

    return (
      <button
        type="button"
        className="text-[24px] rounded-2xl bg-red-400 px-[20px] py-[10px]"
        onClick={() => {
          setIsSelected(false);
          callback();
        }}
      >
        {content}
      </button>
    );
  }, [id, isIdExist, quizs, router]);

  const quizSelectClickHandler = useMemo(() => {
    if (isSelected) return undefined;

    return (_: MouseEvent<Element>, selectionIndex: number) => {
      setIsSelected(true);
      setQuizs?.((prevQuizs) => {
        const newQuizs = [...prevQuizs];
        const quiz = newQuizs[id];
        newQuizs[id] = {
          ...quiz,
          selectedIndex: selectionIndex,
          selections: quiz.selections.map((selection, i) => ({
            ...selection,
            isSelected: i === selectionIndex,
          })),
        };

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
