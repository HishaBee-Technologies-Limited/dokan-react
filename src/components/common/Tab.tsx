import React from 'react';
import { Text } from '@/components/common/text';

export interface ITabOption {
  label: string;
  value: string;
}

interface IProps {
  active: string;
  data: ITabOption[];
  disabled?: boolean;
  className?: string;
  itemClasses?: string;
  handleChange: (tab: ITabOption) => void;
}

const CustomTab = ({
  data,
  active,
  className,
  itemClasses,
  handleChange,
}: IProps) => {
  return (
    <ul
      className={`${className} flex gap-space8 flex-wrap border-primary-20 dark:border-primary-80`}
    >
      {data.map((item, index) => (
        <li
          key={index}
          onClick={() => handleChange(item)}
          className={`${
            active === item.value
              ? 'after:h-[0.3rem] after:w-full'
              : 'after:h-0 after:w-0 cursor-pointer'
          } ${itemClasses} relative after:absolute after:bg-primary-100 dark:after:bg-primary-40 after:left-0 after:bottom-0 after:duration-300 group`}
        >
          <Text
            title={item.label}
            className={`${active === item.value && 'font-bold'} text-md p-space6 text-center`}
          />
        </li>
      ))}
    </ul>
  );
};

export default CustomTab;
