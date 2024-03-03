import clsx from 'clsx';
import React, { MouseEventHandler, useMemo } from 'react';

export type SelectionState = 'selected' | 'answer' | null;

interface SelectionProps {
  hold?: boolean;
  content: string;
  className?: string;
  state?: SelectionState;
  onClick?: MouseEventHandler;
}

function Selection({
  hold,
  content,
  className,
  state,
  onClick,
}: SelectionProps) {
  const backgroundColor = useMemo(() => {
    if (state === 'selected') {
      return 'green';
    }
    if (state === 'answer') {
      return 'red';
    }
    return 'white';
  }, [state]);

  return (
    <button
      type="button"
      className={clsx(
        'flex items-center w-full px-[20px] py-[5px] border-[2px] border-black rounded-full cursor-pointer font-bold transition-all hover:translate-y-[-10%] hover:bg-[rgb(238, 255, 80)]',
        className,
      )}
      style={{ backgroundColor }}
      onClick={hold ? undefined : onClick}
    >
      <div
        className={
          'w-[15px] h-[15px] mr-[10px] rounded-full content-none bg-black'
        }
        style={{
          backgroundColor:
            backgroundColor === 'white' ? 'black' : backgroundColor,
        }}
      />
      <span>{content}</span>
    </button>
  );
}

export { Selection };
