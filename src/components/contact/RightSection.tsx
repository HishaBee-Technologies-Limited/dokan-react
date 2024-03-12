'use client'
import Card from '@/components/common/Card'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/common/text'
import React, { useEffect, useState } from 'react'
import { useContactStore } from '@/stores/useContactStore'
import FallBackImage from '@/components/common/FallBackImage'
import { IPartyResponse } from '@/types/contact/partyResponse'
import { ContactTable } from '@/components/contact/ContactTable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { getSingleCustomer } from '@/actions/contacts/getSingleCustomer'
import { getSingleSupplier } from '@/actions/contacts/getSingleSupplier'
import { getSingleEmployee } from '@/actions/contacts/getSingleEmployee'

export const RightSection = () => {
    const { getQueryString } = useCreateQueryString()

    const activeTab = getQueryString('tab') ?? '';
    const partyID = getQueryString('active_party') ?? '';
    const [error, setError] = useState<string | null>(null);

    const { setContactDrawerState, setParty, party } = useContactStore((state) => state)


    useEffect(() => {

        if (!partyID) return;

        const getParty = async () => {
            if (activeTab === 'Customer') {
                const customers = await getSingleCustomer(Number(partyID));
                if (customers?.success) {
                    setParty(customers?.data as IPartyResponse);
                } else {
                    setError(customers?.error as string);
                }
            } else if (activeTab === 'Supplier') {
                const suppliers = await getSingleSupplier(Number(partyID));
                if (suppliers?.success) {
                    setParty(suppliers?.data as IPartyResponse);
                } else {
                    setError(suppliers?.error as string);
                }
            } else if (activeTab === 'Employee') {
                const employees = await getSingleEmployee(Number(partyID));
                if (employees?.success) {
                    setParty(employees?.data as IPartyResponse);
                } else {
                    setError(employees?.error as string);
                }
            }
        };
        getParty();
    }, [partyID]);

    return (
        <Card className='h-full lg:w-8/12'>
            <div className="px-space16 my-space8 border-b border-primary-20 dark:border-primary-80">
                <div className="flex gap-space16 items-center justify-between py-space8">
                    <div className="flex items-center gap-space8">
                        <FallBackImage src={party?.image_src ?? ''} fallback={party?.name.charAt(0) ?? ''} />
                        <article>
                            <Text title={party?.name} className='!text-lg font-medium' />
                            <Text variant='muted'>
                                {activeTab} | {party?.mobile} {party?.email && `| ${party.email}`}
                            </Text>
                        </article>
                    </div>

                    <Button
                        size={'sm'}
                        variant={'outline'}
                        onClick={() => setContactDrawerState({ open: true, header: `Edit ${activeTab}` })}
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <ScrollArea className="h-[calc(100%-9rem)] pb-space16 px-space16">
                <ContactTable />

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Card>
    )
}