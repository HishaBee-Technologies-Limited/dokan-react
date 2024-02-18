
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        invoice: "#123456",
        time: "Aug 12, 2020 08:45 PM",
        details: "Name or number",
        items: "2 items",
        transactType: 'QUICK SELL',
        amount: " ৳ 2,000"
    },
    {
        invoice: "#123d56",
        time: "Aug 12, 2020 08:45 PM",
        details: "Name or number",
        items: "2 items",
        transactType: 'DUE',
        amount: " ৳ 2,000"
    },
    {
        invoice: "#121456",
        time: "Aug 12, 2020 08:45 PM",
        details: "",
        items: "2 items",
        transactType: 'PURCHASE',
        amount: " ৳ 2,000"
    },
    {
        invoice: "#123455",
        time: "Aug 12, 2020 08:45 PM",
        details: "Name or number",
        items: "2 items",
        transactType: 'QUICK SELL',
        amount: " ৳ 2,000"
    },
    {
        invoice: "#123p56",
        time: "Aug 12, 2020 08:45 PM",
        details: "Name or number",
        items: "2 items",
        transactType: 'DUE',
        amount: " ৳ 2,000"
    },
    {
        invoice: "#12m456",
        time: "Aug 12, 2020 08:45 PM",
        details: "",
        items: "2 items",
        transactType: 'PURCHASE',
        amount: " ৳ 2,000"
    },
]

const ExpenseTable = () => {

    return (
        <div className="pb-space16 w-full relative overflow-x-scroll">
            <div className="rounded-md border border_color min-w-[80rem]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Transaction</TableHead>
                            <TableHead>TIME</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Transact type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell>{invoice.invoice}</TableCell>
                                <TableCell>{invoice.time}</TableCell>
                                <TableCell>{invoice.details}</TableCell>
                                <TableCell>{invoice.items}</TableCell>
                                <TableCell className={`${invoice.transactType === 'DUE' ? 'text-error-100' : ''}`}>{invoice.transactType}</TableCell>
                                <TableCell className={`${invoice.transactType === 'DUE' ? 'text-error-100' : ''} text-right`}>{invoice.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>Total</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}

export default ExpenseTable