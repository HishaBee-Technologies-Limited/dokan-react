'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageTitle } from '@/components/common/text'

const PurchaseHeader = () => {

    return (
        <div className="flex flex-wrap gap-space16 justify-between items-center">
            <PageTitle title="Select Products to Purchase" />

            <Link href="/purchase/history" >
                <Button variant={'secondary'}>
                    History
                </Button>
            </Link>
        </div>
    )
}

export default PurchaseHeader