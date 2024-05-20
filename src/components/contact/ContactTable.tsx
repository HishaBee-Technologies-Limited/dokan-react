import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { DATE_FORMATS } from '@/lib/constants/common';
import { ICommonGetResponse } from '@/types/common';
import { IPurchaseProducts } from '@/types/purchase';
import { IProductSellPayload } from '@/types/sell';
import { format } from 'date-fns';

export const ContactTable = ({ userTransaction }: { userTransaction: any }) => {
  console.log('transss', userTransaction);
  const { getQueryString } = useCreateQueryString();

  const activeTab = getQueryString('tab') ?? '';
  console.log(activeTab);

  return (
    <Table wrapperClass="min-w-[60rem]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Transaction</TableHead>
          <TableHead>TIME</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Items</TableHead>
          {activeTab !== 'Supplier' && <TableHead>Transact type</TableHead>}
          {activeTab !== 'Supplier' ? (
            <TableHead className="text-right">Buy Amount</TableHead>
          ) : (
            <TableHead className="text-right">Amount</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userTransaction?.map((invoice: IProductSellPayload) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>
              {format(invoice.created_at, DATE_FORMATS.dateWithOutTime)}
            </TableCell>
            <TableCell>{invoice.customer_name}</TableCell>
            <TableCell>{invoice.total_item}</TableCell>
            {activeTab !== 'Supplier' && (
              <TableCell
                className={`${invoice.payment_status === 'UNPAID' ? 'text-error-100' : 'text-success-100'}`}
              >
                {invoice.payment_status}
              </TableCell>
            )}
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
