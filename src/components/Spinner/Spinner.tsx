import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  spinnerWidth?: string;
  backgroundColor?: string;
  spinnerColor?: string;
}

export function Spinner({
  className,
  spinnerWidth = '10px',
  spinnerColor = '#007bff',
  backgroundColor = '#ccc',
  style,
  ...props
}: SpinnerProps) {
  return (
    <div
      {...props}
      className={clsx(
        'w-full h-full aspect-square rounded-full animate-spin',
        className,
      )}
      style={{
        ...style,
        borderWidth: spinnerWidth,
        borderStyle: 'solid',
        borderColor: backgroundColor,
        borderTopColor: spinnerColor,
      }}
    />
  );
}
