import React from 'react'
import ExpenseDrawers from '@/components/expense/drawers'
import ExpenseChart from '@/components/expense/ExpenseChart'
import ExpenseHeader from '@/components/expense/ExpenseHeader'

const ExpansePage = () => {

    return (
        <>
            <div className='space-y-space16 h-full'>
                <ExpenseHeader />
                <ExpenseChart />

            </div>

            <ExpenseDrawers />
        </>
    )
}

export default ExpansePage