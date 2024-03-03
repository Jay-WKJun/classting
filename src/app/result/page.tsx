'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { QuizSelections, BarChart } from '@/components';
import { LinkButton } from '@/components/LinkButton';
import { HOME, QUIZ_START } from '@/constants/route';
import { useQuizsContext, useTimeContext } from '@/contexts';

import { getCounts, getCountLabel, getSpentTime } from './utils';

function ResultPage() {
  const router = useRouter();
  const startTime = useTimeContext();
  const quizs = useQuizsContext();

  useEffect(() => {
    if (quizs.length <= 0 || !startTime) {
      router.push(HOME);
    }
  }, [quizs, router, startTime]);

  const correctCount = getCounts(
    (quiz) => quiz.correctAnswerIndex === quiz.selectedIndex,
    quizs,
  );
  const inCorrectCount = getCounts(
    (quiz) => quiz.correctAnswerIndex !== quiz.selectedIndex,
    quizs,
  );

  const CorrectCount = getCountLabel('정답 갯수', correctCount);
  const InCorrectCount = getCountLabel('오답 갯수', inCorrectCount);

  const SpentTime = format(getSpentTime(startTime!), '소요시간 : m분 s초');

  const barGraphData = [
    {
      name: 'result',
      bars: [
        {
          key: 'correct',
          color: '#8884d8',
          value: correctCount,
        },
        {
          key: 'inCorrect',
          color: '#de3c13',
          value: inCorrectCount,
        },
      ],
    },
  ];

  return (
    <div className="w-full py-[100px]">
      <section className="flex flex-col justify-around items-center h-fit mb-[50px]">
        <h1 className="mb-[30px]">결과</h1>
        <BarChart width={300} height={300} data={barGraphData} />
        <h3>{CorrectCount}</h3>
        <h3>{InCorrectCount}</h3>
        <h3>{SpentTime}</h3>
      </section>
      <section className="flex flex-col gap-[50px] mb-[50px]">
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
        <LinkButton href={QUIZ_START} className="bg-lime-500">
          다시 도전하기!
        </LinkButton>
        <LinkButton href={HOME} className=" bg-slate-400">
          홈으로!
        </LinkButton>
      </footer>
    </div>
  );
}

export default ResultPage;
