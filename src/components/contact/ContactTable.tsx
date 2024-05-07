import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DATE_FORMATS } from '@/lib/constants/common';
import { ICommonGetResponse } from '@/types/common';
import { IPurchaseProducts } from '@/types/purchase';
import { IProductSellPayload } from '@/types/sell';
import { format } from 'date-fns';

export const ContactTable = ({
  userTransaction,
}: {
  userTransaction: ICommonGetResponse<IProductSellPayload & IPurchaseProducts>;
}) => {
  console.log(userTransaction);
  return (
    <Table wrapperClass="min-w-[60rem]">
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
        {userTransaction?.data?.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>
              {format(invoice.created_at, DATE_FORMATS.dateWithOutTime)}
            </TableCell>
            <TableCell>{invoice.supplier_name}</TableCell>
            <TableCell>{invoice.total_item}</TableCell>
            <TableCell
              className={`${invoice.payment_status === 'UNPAID' ? 'text-error-100' : 'text-success-100'}`}
            >
              {invoice.payment_status}
            </TableCell>
            <TableCell
              className={`${invoice.payment_status === 'UNPAID' ? 'text-error-100' : 'text-success-100'} text-right`}
            >
              {invoice.total_price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
