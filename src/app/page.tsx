import { LinkButton } from '@/components/LinkButton';
import { QUIZ_START } from '@/constants/route';

function Home() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="flex justify-center items-end w-full h-[30%]">
        Classting Quiz!
      </h1>
      <div className="flex justify-center items-center flex-1">
        <LinkButton className="bg-red-300" href={QUIZ_START}>
          퀴즈 풀기
        </LinkButton>
      </div>
    </div>
  );
}

export default Home;
