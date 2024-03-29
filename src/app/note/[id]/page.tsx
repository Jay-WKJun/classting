'use client';

import { format } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { LinkButton } from '@/components/LinkButton';
import { QuizSelections } from '@/components/QuizSelections';
import { Spinner } from '@/components/Spinner';
import { db } from '@/config/indexDB';
import { HOME, createDynamicNoteRoute } from '@/constants/route';
import { QuizModel } from '@/models/QuizModel';
import { getNextNumberInArray, toNumber } from '@/utils';

type QuizHistory = {
  spendTime: number;
  createdAt: number;
  quizs: QuizModel[];
};

function NotePage() {
  const params = useParams();
  const id = toNumber(params.id);
  const router = useRouter();

  const quizs = useLiveQuery(() => db.quizs.toArray());

  const [quizHistory, setQuizHistory] = useState<
    QuizHistory | null | undefined
  >();
  const [prevId, setPrevId] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);

  useEffect(
    function initPageState() {
      if (id == null) {
        router.push('/not-found');
        return;
      }
      if (!quizs) return;

      const currentQuiz = quizs.find((quiz) => quiz.id === id);

      const prevId = getNextNumberInArray({
        arr: quizs.map((quiz) => quiz.id!),
        center: id,
        isSmall: true,
      });
      const nextId = getNextNumberInArray({
        arr: quizs.map((quiz) => quiz.id!),
        center: id,
        isSmall: false,
      });

      setQuizHistory(currentQuiz ?? null);
      setPrevId(prevId ?? -1);
      setNextId(nextId ?? -1);
    },
    [id, quizHistory, quizs, router],
  );

  useEffect(
    function autoRedirectWhenNoteIsNotExist() {
      if (quizHistory === null && nextId != null && prevId != null) {
        if (nextId < 0 && prevId < 0) {
          alert('오답노트가 없습니다.');
          router.replace(HOME);
          return;
        }

        if (nextId !== id) {
          router.replace(createDynamicNoteRoute(nextId));
          return;
        }
        if (prevId !== id) {
          router.replace(createDynamicNoteRoute(prevId));
        }
      }
    },
    [id, nextId, prevId, quizHistory, router],
  );

  return (
    <div className="flex flex-col w-full h-full justify-center items-center relative overflow-y-auto">
      {quizHistory == null ? (
        <div className="w-[100px] h-[100px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-full relative">
          <h1 className="text-center">오답노트</h1>
          <div className="flex w-[70%] justify-between items-center mb-[50px]">
            <h3 className="">
              {format(quizHistory.spendTime, '소요시간 : m분 s초')}
            </h3>
            <h3>{format(quizHistory.createdAt, 'yyyy/MM/dd hh:mm')}</h3>
          </div>
          <div className="flex-1 pb-[50px]">
            {quizHistory.quizs.map((quiz) => (
              <div key={quiz.question}>
                <QuizSelections hold quiz={quiz} />
              </div>
            ))}
          </div>

          <LinkButton
            href={HOME}
            className="absolute top-[2%] left-[3%] bg-orange-400"
          >
            🏠
          </LinkButton>
          <button
            type="button"
            className="absolute top-[2%] right-[2%] rounded-xl bg-[gray] p-[1em]"
            onClick={() => {
              if (id != null) db.quizs.delete(id);
            }}
          >
            ❌
          </button>
        </div>
      )}

      {prevId != null && prevId !== id && (
        <LinkButton
          href={`/note/${prevId}`}
          className="fixed top-[50%] left-[30px] bg-orange-400"
        >
          &lt;
        </LinkButton>
      )}
      {nextId != null && nextId !== id && (
        <LinkButton
          href={`/note/${nextId}`}
          className="fixed top-[50%] right-[30px] bg-orange-400"
        >
          &gt;
        </LinkButton>
      )}
    </div>
  );
}

export default NotePage;
