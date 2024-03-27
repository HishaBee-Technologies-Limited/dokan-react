'use client';
import React from 'react';
import { PageTitle } from '@/components/common/text';
import DatePicker from '@/components/common/DatePicker';

const HistoryHeader = () => {
  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Stock History" />

      <DatePicker onChange={() => {}} />
    </div>
  );
};

export default HistoryHeader;
