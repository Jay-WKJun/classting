'use client';

import { useEffect } from 'react';

import { LinkButton } from '@/components';
import { HOME } from '@/constants/route';

function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="flex justify-center items-end w-full h-[30%]">
        Sorry, Something went wrong! 😇
      </h1>
      <div className="flex flex-col justify-center items-center flex-1">
        <LinkButton href={HOME} className="bg-red-600" onClick={() => reset()}>
          Try again
        </LinkButton>
      </div>
    </div>
  );
}

export default GlobalErrorPage;
