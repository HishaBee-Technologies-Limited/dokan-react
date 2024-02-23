'use client'
import React from 'react'
import { Text } from '@/components/common/text'

const HistoryReport = () => {
    return (
        <div className='grid lg:grid-cols-2 gap-space16'>
            <div className="flex justify-between items-center gap-space12 bg-error-10 dark:bg-primary-90 border border-error-80 rounded-lg p-space12">
                <article className='space-y-space4'>
                    <Text title='দিয়েছি' variant='error' className='text-xs sm:text-sm' />
                    <Text title=' ৳ 5,6০,০০,০০০' variant='error' className='text-xs sm:text-sm' />
                </article>
                -
                <article className='space-y-space4'>
                    <Text title='নিয়েছি' variant='success' className='text-xs sm:text-sm' />
                    <Text title=' ৳ 5,6০,০০,০০০' variant='success' className='text-xs sm:text-md font-semibold' />
                </article>
                =
                <article className='space-y-space4'>
                    <Text title='কাস্টমার থেকে পাবো' variant='error' className='text-xs sm:text-md font-semibold' />
                    <Text title=' ৳ 5,6০,০০,০০০' variant='error' className='text-xs sm:text-md font-semibold' />
                </article>
            </div>

            <div className="flex justify-between items-center gap-space12 bg-success-10 dark:bg-primary-90 border border-success-80 rounded-lg p-space12">
                <article className='space-y-space4'>
                    <Text title='নিয়েছি' variant='success' className='text-xs sm:text-sm' />
                    <Text title=' ৳ 5,6০,০০,০০০' variant='success' className='text-xs sm:text-sm' />
                </article>
                -
                <article className='space-y-space4'>
                    <Text title='দিয়েছি' variant='error' className='text-xs sm:text-sm' />
                    <Text title=' ৳ 5,6০,০০,০০০' variant='error' className='text-xs sm:text-md font-semibold' />
                </article>
                =
                <article className='space-y-space4'>
                    <Text title='সাপ্লায়ারকে দিবো' variant='success' className='text-xs sm:text-md font-semibold' />
                    <Text title=' ৳ 5,6০,০০,০০০' variant='success' className='text-xs sm:text-md font-semibold' />
                </article>
            </div>
        </div>
    )
}

export default HistoryReport