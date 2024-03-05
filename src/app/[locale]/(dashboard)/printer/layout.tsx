import React from 'react'
import PrinterLayout from '../../../../components/layouts/printer'

const PrinterLayouts = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrinterLayout>{children}</PrinterLayout>
    )
}

export default PrinterLayouts