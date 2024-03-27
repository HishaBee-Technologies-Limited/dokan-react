import React from 'react';
import { Icon } from '@iconify/react';

const AppSearch = () => {
  return (
    <div className="w-3/4 h-[4.4rem] relative hidden sm:block">
      <input
        id={'AppSearch'}
        type="search"
        placeholder="search.."
        className={`bg-white dark:bg-primary-90 border border-primary-10 dark:border-primary-80 rounded-lg px-3 pl-[3.4rem] placeholder:text-primary-200 placeholder:text-md text-md py-space6 h-full w-full focus:outline-none peer`}
        autoComplete="off"
      />
      <label
        htmlFor={'AppSearch'}
        className="absolute text-sm text-primary-90 dark:text-primary-50 transform -translate-y-1/2 top-1/2 left-[1rem]"
      >
        <Icon icon="carbon:search" />
      </label>
    </div>
  );
};

export default AppSearch;
