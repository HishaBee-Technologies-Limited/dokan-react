import { Text } from '@/components/common/text';
import React from 'react';
import TotalDueCalculationItemCardLink from '@/components/business-overview/TotalDueCalculationItemCardLink';

export default function TotalDueCalculation() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Text className="text-lg font-semibold my-5">
          Total Due Calculation
        </Text>
        <Text variant="error" className="text-lg font-semibold my-5">
          ৳ 90
        </Text>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <TotalDueCalculationItemCardLink
          label="Due To supplier"
          value={100}
          isSupplier
        />
        <TotalDueCalculationItemCardLink label="Due From customer" value={0} />
      </div>
    </div>
  );
}
