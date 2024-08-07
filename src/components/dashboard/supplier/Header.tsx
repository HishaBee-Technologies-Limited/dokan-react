import { PageSubTitle } from '@/components/common/text';
import React from 'react';
import BODateRangePicker from '../DateRange';

export default function PageHeader() {
  return (
    <div className="flex items-cennter justify-between">
      <PageSubTitle title="Supplier Report" />
      <BODateRangePicker />
    </div>
  );
}
