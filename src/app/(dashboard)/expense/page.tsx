import React from 'react'
import ExpenseDrawers from '@/components/expense/drawers'
import ExpenseChart from '@/components/expense/ExpenseChart'
import ExpenseHeader from '@/components/expense/ExpenseHeader'
import ExpenseTable from '@/components/expense/ExpenseTable'
import ExpenseQueries from '@/components/expense/ExpenseQueries'

const ExpansePage = () => {

    return (
        <>
            <div className='space-y-space16 h-full w-full'>
                <ExpenseHeader />
                <ExpenseChart />
                <ExpenseQueries />
                <ExpenseTable />
            </div>

            <ExpenseDrawers />
        </>
    )
}

export default ExpansePage