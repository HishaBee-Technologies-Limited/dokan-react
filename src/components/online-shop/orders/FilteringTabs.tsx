'use client';
import React from 'react';
import CustomTab from '@/components/common/Tab';
import { filteringOptions } from '@/config/orders';
import { useOrdersTable } from '@/hooks/useOrdersTable';
import { DeliveryStatusDef } from '@/types/orders';

const FilteringTabs = () => {
  const { updateQueryParams, queryParams } = useOrdersTable();

  return (
    <CustomTab
      data={filteringOptions}
      active={queryParams.activatedTab}
      handleChange={(item) => {
        updateQueryParams({
          ...queryParams,
          activatedTab: item.value as DeliveryStatusDef,
          page: 1,
        });
      }}
    />
  );
};

export default FilteringTabs;
