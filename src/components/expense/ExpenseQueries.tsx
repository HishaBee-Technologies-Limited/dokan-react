'use client';
import React, { useState } from 'react';
import DatePicker from '@/components/common/DatePicker';
import { Select } from '@/components/common/forms/Select';
import { PageSubTitle, Text } from '@/components/common/text';
import { FilterIcon, SortIcon } from '@/components/common/icons';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const ExpenseQueries = () => {
  const [value, setValue] = useState<string>('');
  return (
    <div className="flex justify-between items-center flex-wrap gap-space16">
      <PageSubTitle title="খরচের তালিকা" />

      <div className="flex flex-wrap gap-space8 sm:gap-space12">
        <Select
          data={frameworks}
          triggerIcon={<SortIcon />}
          onChange={(value) => setValue(value)}
          placeholder={<Text title="Sort By" />}
        />
        <Select
          data={frameworks}
          triggerIcon={<FilterIcon />}
          onChange={(value) => setValue(value)}
          placeholder={<Text title="Select" />}
        />
        <DatePicker onChange={(date) => console.log(date)} />
      </div>
    </div>
  );
};

export default ExpenseQueries;
