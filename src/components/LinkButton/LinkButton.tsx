import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface LinkButtonProps extends ComponentProps<typeof Link> {
  className?: string;
  children?: React.ReactNode;
}

export function LinkButton({ className, children, ...rest }: LinkButtonProps) {
  return (
    <Link
      {...rest}
      className={clsx(
        'flex justify-center items-center px-[20px] py-[10px] font-bold text-[30px] rounded-2xl hover:translate-y-[-10%] transition-transform',
        className,
      )}
    >
      {children}
    </Link>
  );
}
