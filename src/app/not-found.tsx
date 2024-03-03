'use client';

import React from 'react';

import { LinkButton } from '@/components';
import { HOME } from '@/constants/route';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="flex justify-center items-end w-full h-[30%]">
        Page Not Found! 😵‍💫
      </h1>
      <div className="flex justify-center items-center flex-1">
        <LinkButton href={HOME} className="bg-red-600">
          Back To Home
        </LinkButton>
      </div>
    </div>
  );
}

export default NotFoundPage;
