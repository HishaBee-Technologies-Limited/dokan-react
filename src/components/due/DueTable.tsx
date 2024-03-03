import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        entries: "Aug 09, 2020 08:45 PM",
        details: "Sell  of SomethingSell  of Something",
        got: " ৳ 1,000",
        give: '',
        balance: "  ৳ 1,000"
    },
    {
        entries: "Aug 09, 2021 08:45 PM",
        details: "Sell of Something",
        got: " ৳ 1,000",
        give: '',
        balance: "  ৳ 1,000"
    },
    {
        entries: "Aug 09, 2025 08:45 PM",
        details: "Sell of Something jhfg",
        got: "",
        give: '৳ 1,000',
        balance: "  ৳ 1,000"
    },
]

export const DueTable = () => {
    return (
        <Table wrapperClass="!min-w-[60rem]">
            <TableHeader>
                <TableRow>
                    <TableHead>Entries</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-error-100">you got</TableHead>
                    <TableHead className="text-success-100">You gave</TableHead>
                    <TableHead className="text-right">balance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((row, i) => (
                    <TableRow key={i}>
                        <TableCell>{row.entries}</TableCell>
                        <TableCell>{row.details}</TableCell>
                        <TableCell className={`text-success-100`}>{row.got}</TableCell>
                        <TableCell className={`text-error-100`}>{row.give}</TableCell>
                        <TableCell className={`text-success-100 text-right`}>{row.balance}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
