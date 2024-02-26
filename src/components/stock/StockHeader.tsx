
'use client'
import React from 'react'
import Link from 'next/link'
import Icon from '@/components/common/Icon'
import { Button } from '@/components/ui/button'
import { AddIcon } from '@/components/common/icons'
import { PageTitle } from '@/components/common/text'
import { HistoryIcon } from '@/components/common/icons/HistoryIcon'

export const StockHeader = () => {
    return (
        <div className="flex flex-wrap gap-space16 justify-between items-center">
            <PageTitle title="Product List" />

            <div className="flex gap-space12 grow-[1] sm:grow-0">
                <Link href="/stock/history">
                    <Button variant={'secondary'}>
                        <HistoryIcon />
                        <span>Stock History</span>
                    </Button>
                </Link>
                <Link href="/stock/update">
                    <Button variant={'secondary'}>
                        <Icon icon="material-symbols:work-update-outline" />
                        <span>Update stock quantity</span>
                    </Button>
                </Link>

                <Button
                    className='grow'
                >
                    <AddIcon />
                    <span>Add new product</span>
                </Button>
            </div>
        </div>
    )
}