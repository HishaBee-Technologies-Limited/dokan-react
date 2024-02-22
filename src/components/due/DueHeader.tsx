'use client'
import React from 'react'
import { PageTitle } from '../common/text'
import { Button } from '../ui/button'
import { AddIcon } from '../common/icons'

const DueHeader = () => {
    return (
        <div className="flex flex-wrap gap-space16 justify-between items-center">
            <PageTitle title="Contact List" />

            <Button
            // onClick={() => handleDrawerOpen({ open: true, header: ContactEnum.ADD_NEW_MEMBER })}
            >
                <AddIcon />
                <span>Add new member</span>
            </Button>
        </div>
    )
}

export default DueHeader