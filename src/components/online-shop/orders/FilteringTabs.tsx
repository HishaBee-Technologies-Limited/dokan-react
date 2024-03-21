'use client'
import React from 'react'
import CustomTab from "@/components/common/Tab";
import { filteringOptions } from "@/config/orders";
import { useOrdersStore } from "@/stores/useOrdersStore";
import { useOrdersTable } from "@/hooks/useOrdersTable";
import { DeliveryStatusDef } from "@/types/orders";


const FilteringTabs = () => {
    const {queryParams, setQueryParams } = useOrdersStore()
    const { updateQueryParams } = useOrdersTable()

    return (
        <CustomTab data={filteringOptions} active={queryParams.activatedTab} handleChange={(item)=> {
            updateQueryParams({ ...queryParams, activatedTab: item.value as DeliveryStatusDef, page: 1})
        }} />
    )
}

export default FilteringTabs