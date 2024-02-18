'use client'

import React from 'react'
import { ExpenseEnum } from '@/enum/expense'
import { Drawer } from '@/components/common/Drawer'
import { useExpenseStore } from '@/stores/useExpenseStore'
import AddExpense from '@/components/expense/drawers/AddExpense'

const ExpenseDrawers = () => {
    const drawerState = useExpenseStore((state) => state.expenseDrawerState)
    const handleClose = useExpenseStore((state) => state.setExpenseDrawerState)

    const renderedDrawers = (activeDrawer: string | undefined) => {
        if (ExpenseEnum.ADD_EXPENSE === activeDrawer) {
            return <AddExpense />
        }
    }

    return (
        <Drawer
            open={drawerState.open}
            header={drawerState.header}
            onClose={(open) => handleClose({ open })}
        >
            {renderedDrawers(drawerState.header)}
        </Drawer>
    )
}

export default ExpenseDrawers