'use client'
import React from 'react'
import CustomTab, { ITabOption } from "@/components/common/Tab";
import { useOnlineShopStore } from '@/stores/useOnlineShopStore'
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

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
    const pathname = usePathname();
    const { setQueryString } = useCreateQueryString()

    const orderFilterTab = useOnlineShopStore(state => state.orderFilterTab)
    const setOrderFilterTab = useOnlineShopStore(state => state.setOrderFilterTab)

    const handleTab = (tab: ITabOption) => {
        setOrderFilterTab(tab.value)
        setQueryString('activeTab', tab.value)
        router.replace(`${pathname}?activeTab=${tab.value}`, { scroll: false})
    }

    return (
        <CustomTab data={filteringOption} active={orderFilterTab} handleChange={handleTab} />
    )
}

export default FilteringTabs