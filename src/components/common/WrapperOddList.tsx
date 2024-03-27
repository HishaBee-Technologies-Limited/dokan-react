import React, { HTMLProps } from 'react';

const WrapperOddList = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`[&>*:nth-child(even)]:bg-white [&>*:nth-child(even)]:dark:bg-primary-100 [&>*:nth-child(odd)]:bg-primary-5 [&>*:nth-child(odd)]:dark:bg-[#171717] ${className}`}
    >
      {props.children}
    </div>
  );
};

export default WrapperOddList;
