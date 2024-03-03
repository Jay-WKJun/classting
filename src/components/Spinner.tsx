import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      {...props}
      className={clsx(
        'w-full h-full aspect-square rounded-full border-[10px] border-[#ccc] border-t-[#007bff] animate-spin',
        className,
      )}
    />
  );
}
