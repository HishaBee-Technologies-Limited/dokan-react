'use client'
import Card from '@/components/common/Card'
import { Input } from '@/components/ui/input'
import CustomTab from '@/components/common/Tab'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/common/text'
import React, { useEffect, useState } from "react";
import { ScrollArea } from '@/components/ui/scroll-area'
import { useContactStore } from '@/stores/useContactStore'
import FallBackImage from '@/components/common/FallBackImage'
import WrapperOddList from '@/components/common/WrapperOddList'
import CardWithSideIndicator from '@/components/common/CardWithSideIndicator'

import { useShopId } from "@/stores/useShopId";
import { usePathname, useRouter } from "next/navigation";
import { IPartyResponse } from "@/types/contact/partyResponse";
import { getAllCustomer } from "@/actions/contacts/getAllCustomer";
import { getAllSupplier } from "@/actions/contacts/getAllSupplier";
import { getAllEmployee } from "@/actions/contacts/getAllEmployee";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

const tabData = [
    {
        label: "Customer",
        value: "Customer"
    },
    {
        label: "Supplier",
        value: "Supplier"
    },
    {
        label: "Employee",
        value: "Employee"
    },
]

export const LeftSection = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { getQueryString, setQueryString, removeQueryParam } = useCreateQueryString()

    const activeTab = getQueryString('tab') ?? '';
    const activeParty = getQueryString('active_party') ?? '';

    const shopId = useShopId((state) => state.shopId);
    const [error, setError] = useState<string | null>(null);
    const [party, setParty] = useState<IPartyResponse[]>([]);
    const { setContactDrawerState } = useContactStore((state) => state);

    useEffect(() => {
        // removeQueryParam('active_party')

        router.push(`${pathname}?${setQueryString('tab', activeTab ? activeTab : 'Customer')}`)

        if (!shopId) return;

        const getParty = async () => {
            if (activeTab === 'Customer') {
                const customers = await getAllCustomer(shopId);
                if (customers?.success) {
                    setParty(customers?.data as IPartyResponse[]);
                } else {
                    setError(customers?.error as string);
                }
            } else if (activeTab === 'Supplier') {
                const suppliers = await getAllSupplier(shopId);
                if (suppliers?.success) {
                    setParty(suppliers?.data as IPartyResponse[]);
                } else {
                    setError(suppliers?.error as string);
                }
            } else if (activeTab === 'Employee') {
                const employees = await getAllEmployee(shopId);
                if (employees?.success) {
                    setParty(employees?.data as IPartyResponse[]);
                } else {
                    setError(employees?.error as string);
                }
            }
        };
        getParty();
    }, [shopId, activeTab]);


    return (
        <Card className='h-full lg:w-4/12 flex flex-col gap-space16'>
            <div className="space-y-space8 w-full">
                <CustomTab
                    data={tabData}
                    active={activeTab}
                    className='border-b w-full px-space16 pt-space8'
                    handleChange={(item) => {
                        router.push(`${pathname}?${setQueryString('tab', item.value)}`)
                    }}
                />
                <div className="px-space16">
                    <Input placeholder="Search contact" />
                </div>
            </div>

            <ScrollArea className="h-[calc(100%-20.6rem)] px-space16">
                <WrapperOddList>
                    {party.map((item, index) => (
                        <CardWithSideIndicator
                            key={item.id}
                            active={item.id.toString() === activeParty}
                            onClick={() => router.push(`${pathname}?${setQueryString('active_party', item.id)}`)}
                        >
                            <div className="flex items-center gap-space8">
                                <FallBackImage src={item.image_src ?? ''} fallback={item.name.charAt(0)} />
                                <article>
                                    <Text title={item.name} className='!text-md font-medium' />
                                    <Text title={item.mobile} variant='muted' />
                                </article>
                            </div>
                        </CardWithSideIndicator>
                    ))}
                </WrapperOddList>
            </ScrollArea>

            <div className="p-space16 border-t border-primary-20 dark:border-primary-80">
                <Button
                    className='w-full'
                    onClick={() => setContactDrawerState({ open: true, header: `Add ${activeTab}` })}
                >
                    Add {activeTab ? activeTab : 'Customer'}
                </Button>
            </div>
        </Card>
    )
}