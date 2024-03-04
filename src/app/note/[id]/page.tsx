'use client';

import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useIndexedDB, initDB } from 'react-indexed-db-hook';

import { LinkButton } from '@/components/LinkButton';
import { QuizSelections } from '@/components/QuizSelections';
import { Spinner } from '@/components/Spinner';
import { DB_CONFIG, QUIZ_STORE_NAME } from '@/constants/db';
import { createDynamicNoteRoute } from '@/constants/route';
import { QuizModel } from '@/models/QuizModel';
import { getNextNumberInArray, toNumber } from '@/utils';

initDB(DB_CONFIG);

type QuizHistory = {
  spendTime: number;
  createdAt: number;
  quizs: QuizModel[];
};

function NotePage() {
  const params = useParams();
  const id = toNumber(params.id);
  const router = useRouter();

  const [quizHistory, setQuizHistory] = useState<
    QuizHistory | null | undefined
  >();
  const [prevId, setPrevId] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);

  const { getByID, getAll } = useIndexedDB(QUIZ_STORE_NAME);

  useEffect(() => {
    if (id == null) {
      router.push('/not-found');
      return;
    }

    async function init(id: number) {
      const quizHistory = await getByID(id);
      setQuizHistory(quizHistory ?? null);

      const currentId = quizHistory?.id ?? id;
      const quizHistories = await getAll();

      new Promise((resolve) => {
        const prevId = getNextNumberInArray({
          arr: quizHistories,
          center: currentId,
          isSmall: true,
        });
        setPrevId(prevId ?? null);
        resolve(null);
      });

      new Promise((resolve) => {
        const nextId = getNextNumberInArray({
          arr: quizHistories,
          center: currentId,
          isSmall: false,
        });
        setNextId(nextId ?? null);
        resolve(null);
      });
    }

    init(id);
  }, [getAll, getByID, id, router]);

  useEffect(() => {
    if (quizHistory === null) {
      if (nextId != null) {
        router.push(createDynamicNoteRoute(nextId));
        return;
      }
      if (prevId != null) {
        router.push(createDynamicNoteRoute(prevId));
        return;
      }
      router.push('/not-found');
    }
  }, [nextId, prevId, quizHistory, router]);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center relative overflow-y-auto">
      {quizHistory == null ? (
        <div className="w-[100px] h-[100px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-full">
          <h1 className="text-center">오답노트</h1>
          <div className="flex w-[70%] justify-between items-center mb-[50px]">
            <h3 className="">
              {format(quizHistory.spendTime, '소요시간 : m분 s초')}
            </h3>
            <h3>{format(quizHistory.createdAt, 'yyyy/MM/dd hh:mm')}</h3>
          </div>
          <div className="flex-1">
            {quizHistory.quizs.map((quiz) => (
              <div key={quiz.question}>
                <QuizSelections hold quiz={quiz} />
              </div>
            ))}
          </div>
        </div>
      )}

      {prevId != null && (
        <LinkButton
          href={`/note/${prevId}`}
          className="fixed top-[50%] left-[30px] bg-orange-400"
        >
          &lt;
        </LinkButton>
      )}
      {nextId != null && (
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
