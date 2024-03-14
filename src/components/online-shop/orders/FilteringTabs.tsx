'use client'
import React from 'react'
import CustomTab, { ITabOption } from "@/components/common/Tab";
import { useOnlineShopStore } from '@/stores/useOnlineShopStore'
import { useRouter, useSearchParams } from "next/navigation";

const filteringOption = [
    {
        label: 'All History',
        value: 'all'
    },
    {
        label: 'New orders',
        value: 'new'
    },
    {
        label: 'Active orders',
        value: 'pending'
    },
    {
        label: 'Delivered',
        value: 'complete'
    },
    {
        label: 'Cancelled',
        value: 'cancelled'
    }
]

const FilteringTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const orderFilterTab = useOnlineShopStore(state => state.orderFilterTab)
    const setOrderFilterTab = useOnlineShopStore(state => state.setOrderFilterTab)

    const handleTab = (tab: ITabOption) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('activeTab', tab.value);
        router.replace(`?${currentParams.toString()}`, { scroll: false });
        setOrderFilterTab(tab.value)
    }

    return (
        <CustomTab data={filteringOption} active={orderFilterTab} handleChange={handleTab} />
    )
}

export default FilteringTabs