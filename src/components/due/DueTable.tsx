import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IDueItemsResponse } from '@/types/due/dueResponse';

export const DueTable = ({ dueItems }: { dueItems: IDueItemsResponse[] }) => {
  let totalBalance = 0;

  console.log(dueItems);

  const calculateBalance = (amount: number, index: number) => {
    if (index === 1) {
      totalBalance =
        amount > 0
          ? amount + dueItems[0]?.amount
          : dueItems[0]?.amount + amount;

      return totalBalance;
    } else {
      console.log(amount);
      totalBalance = amount > 0 ? amount - totalBalance : totalBalance + amount;

      return totalBalance;
    }
  };

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
        {dueItems.map((row, i) => {
          console.log(row);
          if (i === 0) {
            return (
              <TableRow key={i}>
                <TableCell>{row.created_at}</TableCell>
                <TableCell className="">
                  {row?.note ? row.note : '---'}
                </TableCell>
                <TableCell className={`text-success-100`}>
                  {row.amount < 0 ? Math.abs(row.amount) : ''}
                </TableCell>
                <TableCell className={`text-error-100`}>
                  {row.amount > 0 ? row.amount : ''}
                </TableCell>
                <TableCell
                  className={`${
                    row.amount < 0 ? 'text-success-100' : 'text-error-100'
                  } text-right`}
                >
                  {Math.abs(row.amount)}
                </TableCell>
              </TableRow>
            );
          } else {
            return (
              <TableRow key={i}>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row?.note ? row.note : '---'}</TableCell>
                <TableCell className={`text-success-100`}>
                  {row.amount < 0 ? Math.abs(row.amount) : ''}
                </TableCell>
                <TableCell className={`text-error-100`}>
                  {row.amount > 0 ? row.amount : ''}
                </TableCell>
                <TableCell
                  className={`${
                    row.pos_balance + row.neg_balance > 0
                      ? 'text-error-100'
                      : 'text-success-100'
                  } text-right`}
                >
                  {Math.abs(row.pos_balance + row.neg_balance)}
                </TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  );
};
