import React, { HTMLProps } from 'react';
import { Icon } from '@iconify/react';

type SearchProps = HTMLProps<HTMLInputElement> & {
  wrapperClasses?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({
  className = '',
  wrapperClasses = '',
  htmlFor = 'search',
  placeholder = 'Search...',
  onChange,
  ...props
}: SearchProps) => {
  return (
    <div className={`h-[4.4rem] relative w-full ${wrapperClasses}`}>
      <input
        {...props}
        id={htmlFor}
        type="search"
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-white dark:bg-primary-90 border border-color rounded-lg px-3 pl-[3.4rem] placeholder:text-primary-200 placeholder:text-md text-md py-space4 h-full w-full focus:outline-none peer ${className}`}
        autoComplete="off"
      />
      <label
        htmlFor={htmlFor}
        className="absolute text-sm text-primary-90 dark:text-primary-50 transform -translate-y-1/2 top-1/2 left-[1rem]"
      >
        <Icon icon="carbon:search" />
      </label>
    </div>
  );
};

export default Search;
