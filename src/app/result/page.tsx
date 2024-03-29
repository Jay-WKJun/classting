'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BarChart, ChartData } from '@/components/BarChart';
import { LinkButton } from '@/components/LinkButton';
import { QuizSelections } from '@/components/QuizSelections';
import { db } from '@/config/indexDB';
import { HOME, QUIZ_START, createDynamicNoteRoute } from '@/constants/route';
import { useQuizsContext } from '@/contexts/QuizContext';
import { useTimeContext } from '@/contexts/TimeContext';
import { QuizModel } from '@/models/QuizModel';
import { countMatchingElements, toNumber } from '@/utils';

const BAR_COLORS = ['#8884d8', '#de3c13'];

function getCountLabel(label: string, count: number) {
  return `${label} : ${count} 개`;
}

function getSpendTime(startTime: number) {
  return Date.now() - startTime;
}

function ResultPage() {
  const [spendTime, setSpendTime] = useState(0);
  const [newRecordId, setNewRecordId] = useState<number | null>(null);

  const router = useRouter();
  const startTime = useTimeContext();
  const quizs = useQuizsContext();

  useEffect(
    function initPage() {
      if (quizs.length <= 0 || !startTime) {
        router.push(HOME);
        return;
      }

      setSpendTime(getSpendTime(startTime));
    },
    [quizs, router, startTime],
  );

  useEffect(
    function setQuizResultInDb() {
      if (spendTime > 0 && quizs.length > 0) {
        db.quizs
          .add({
            quizs,
            spendTime,
            createdAt: Date.now(),
          })
          .then((newId) => {
            setNewRecordId(toNumber(newId));
          });
      }
    },
    [quizs, spendTime],
  );

  const correctCount = countMatchingElements<QuizModel>(
    quizs,
    (quiz) => quiz.correctAnswerIndex === quiz.selectedIndex,
  );
  const inCorrectCount = countMatchingElements<QuizModel>(
    quizs,
    (quiz) => quiz.correctAnswerIndex !== quiz.selectedIndex,
  );

  const CorrectCount = getCountLabel('정답 갯수', correctCount);
  const InCorrectCount = getCountLabel('오답 갯수', inCorrectCount);

  const SpendTime = format(spendTime, '소요시간 : m분 s초');

  const chartDatas: ChartData[] = [
    {
      name: 'result',
      values: {
        correct: correctCount,
        incorrect: inCorrectCount,
      },
    },
  ];

  return (
    <div className="w-full py-[100px]">
      <section className="flex flex-col justify-around items-center h-fit mb-[50px]">
        <h1 className="mb-[30px]">결과</h1>
        <BarChart
          width={300}
          height={300}
          barColors={BAR_COLORS}
          chartDatas={chartDatas}
        />
        <h3>{CorrectCount}</h3>
        <h3>{InCorrectCount}</h3>
        <h3>{SpendTime}</h3>
      </section>
      <hr />
      <section className="flex flex-col gap-[50px] mb-[50px]">
        <h1 className="w-full text-center text-[40px]">오답 노트</h1>
        {quizs.map((quiz) => (
          <div
            key={`quizResult-${quiz.question}`}
            className="w-full min-h-[400px]"
          >
            <QuizSelections hold quiz={quiz} />
          </div>
        ))}
      </section>
      <footer className="flex flex-col justify-center items-center gap-6 w-full min-h-[200px] child/Wo.last:mb-[30px]">
        <LinkButton href={QUIZ_START} className="bg-red-500">
          다시 도전하기!
        </LinkButton>
        <LinkButton href={HOME} className=" bg-slate-400">
          홈으로!
        </LinkButton>
        <LinkButton
          href={createDynamicNoteRoute(newRecordId ?? 0)}
          className=" bg-green-400"
        >
          기록보기
        </LinkButton>
      </footer>
    </div>
  );
}

export default ResultPage;
