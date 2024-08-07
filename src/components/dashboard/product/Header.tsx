import { PageSubTitle } from '@/components/common/text';
import React from 'react';
import BODateRangePicker from '../DateRange';

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <PageSubTitle title="Product Report" />
      <BODateRangePicker />
    </div>
  );
}
