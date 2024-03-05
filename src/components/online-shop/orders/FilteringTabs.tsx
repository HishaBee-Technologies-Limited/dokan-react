'use client'
import React from 'react'
import CustomTab from '@/components/common/Tab'
import { useOnlineShopStore } from '@/stores/useOnlineShopStore'

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
    const orderFilterTab = useOnlineShopStore(state => state.orderFilterTab)
    const setOrderFilterTab = useOnlineShopStore(state => state.setOrderFilterTab)

    return (
        <CustomTab data={filteringOption} active={orderFilterTab} handleChange={(tab) => setOrderFilterTab(tab.value)} />
    )
}

export default FilteringTabs