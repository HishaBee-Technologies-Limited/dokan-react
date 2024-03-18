'use client'
import React from 'react'
import CustomTab, { ITabOption } from "@/components/common/Tab";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { filteringOptions } from "@/config/orders";


const FilteringTabs = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { setQueryString, getQueryString } = useCreateQueryString()

    const handleTab = (tab: ITabOption) => {
        setQueryString('activeTab', tab.value)
        router.replace(`${pathname}?activeTab=${tab.value}`, { scroll: false})
    }

    return (
        <CustomTab data={filteringOptions} active={getQueryString('activeTab') ?? ''} handleChange={handleTab} />
    )
}

export default FilteringTabs