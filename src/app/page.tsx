import Link from 'next/link';

import { QUIZ_START } from '@/constants/route';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="flex justify-center items-end w-full h-[30%] text-[40px] font-bold">
        Classting Quiz!
      </h1>
      <div className="flex justify-center items-center flex-1">
        <Link
          className="flex justify-center items-center font-bold w-fit h-[1.5em] rounded-xl text-[40px] px-[10px] bg-red-300 hover:translate-y-[-10%] transition-transform"
          href={QUIZ_START}
        >
          퀴즈 풀기
        </Link>
      </div>
    </div>
  );
}
