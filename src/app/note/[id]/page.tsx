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

initDB(DB_CONFIG);

type QuizHistory = {
  spendTime: number;
  createdAt: number;
  quizs: QuizModel[];
};

function NotePage() {
  const params = useParams();
  const id = Number(params.id);
  const prevId = id - 1;
  const nextId = id + 1;
  const router = useRouter();

  const [quizHistory, setQuizHistory] = useState<
    QuizHistory | null | undefined
  >();
  const [prevExistState, setPrevExistState] = useState<boolean>(false);
  const [nextExistState, setNextExistState] = useState<boolean>(false);

  const { getByID } = useIndexedDB(QUIZ_STORE_NAME);

  useEffect(() => {
    if (id == null || Number.isNaN(id)) {
      router.push('/not-found');
      return;
    }

    getByID<QuizHistory>(id).then((quizHistories) => {
      setQuizHistory(quizHistories ?? null);
    });

    if (prevId >= 0) {
      getByID<QuizHistory>(prevId).then((quizHistories) => {
        setPrevExistState(quizHistories != null);
      });
    } else {
      setPrevExistState(false);
    }

    if (nextId >= 0) {
      getByID<QuizHistory>(nextId).then((quizHistories) => {
        setNextExistState(quizHistories != null);
      });
    } else {
      setNextExistState(false);
    }
  }, [getByID, id, nextId, prevId, router]);

  useEffect(() => {
    if (quizHistory === null) {
      if (nextExistState) {
        router.replace(createDynamicNoteRoute(nextId));
        return;
      }
      if (prevExistState) {
        router.replace(createDynamicNoteRoute(prevId));
        return;
      }
      router.replace('/not-found');
    }
  }, [id, nextExistState, nextId, prevExistState, prevId, quizHistory, router]);

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

      {prevExistState && (
        <LinkButton
          href={`/note/${prevId}`}
          className="fixed top-[50%] left-[30px] bg-orange-400"
        >
          &lt;
        </LinkButton>
      )}
      {nextExistState && (
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
