import React, { HTMLProps } from 'react';

const CardWithSideIndicator = ({
  active,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & { active: boolean }) => {
  return (
    <div
      {...props}
      className={` ${active && 'after:bg-primary-100 dark:after:bg-primary-40 after:h-full'} flex justify-between items-center p-space12 cursor-pointer relative after:absolute after:w-[.4rem] after:left-0 after:top-0 after:rounded-tl-lg after:rounded-bl-lg after:transition-all after:duration-300 after:ease-in-out ${className}`}
    >
      {props.children}
    </div>
  );
};

export default CardWithSideIndicator;
