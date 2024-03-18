import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IDueItemsResponse } from "@/types/due/dueResponse"

export const DueTable = ({ dueItems }: { dueItems: IDueItemsResponse[] }) => {
    return (
        <Table wrapperClass="!min-w-[60rem]">
            <TableHeader>
                <TableRow>
                    <TableHead>Entries</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-success-100">you got</TableHead>
                    <TableHead className="text-error-100">You gave</TableHead>
                    <TableHead className="text-right">balance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dueItems.map((row, i) => (
                    <TableRow key={i}>
                        <TableCell>{row.created_at}</TableCell>
                        <TableCell>{row?.note ? row.note : '---'}</TableCell>
                        <TableCell className={`text-success-100`}>{row.due_left}</TableCell>
                        <TableCell className={`text-error-100`}>{row.pos_balance}</TableCell>
                        <TableCell className={`text-success-100 text-right`}>{row.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
