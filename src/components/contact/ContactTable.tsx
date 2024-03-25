import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    invoice: '#123456',
    time: 'Aug 12, 2020 08:45 PM',
    details: 'Name or number',
    items: '2 items',
    transactType: 'QUICK SELL',
    amount: ' ৳ 2,000',
  },
  {
    invoice: '#123d56',
    time: 'Aug 12, 2020 08:45 PM',
    details: 'Name or number',
    items: '2 items',
    transactType: 'DUE',
    amount: ' ৳ 2,000',
  },
  {
    invoice: '#121456',
    time: 'Aug 12, 2020 08:45 PM',
    details: '',
    items: '2 items',
    transactType: 'PURCHASE',
    amount: ' ৳ 2,000',
  },
];

export const ContactTable = () => {
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell>{invoice.invoice}</TableCell>
            <TableCell>{invoice.time}</TableCell>
            <TableCell>{invoice.details}</TableCell>
            <TableCell>{invoice.items}</TableCell>
            <TableCell
              className={`${invoice.transactType === 'DUE' ? 'text-error-100' : ''}`}
            >
              {invoice.transactType}
            </TableCell>
            <TableCell
              className={`${invoice.transactType === 'DUE' ? 'text-error-100' : ''} text-right`}
            >
              {invoice.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
