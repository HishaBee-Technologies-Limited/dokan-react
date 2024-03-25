import React, { HTMLProps } from 'react';

const Card = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={`bg-white dark:bg-primary-90 rounded-lg text-text500 dark:text-primary-40 ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Card;
