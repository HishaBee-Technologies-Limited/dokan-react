import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

export default function PrintShareInvoice() {
  return (
    <div className="flex flex-col min-h-screen">
      <img
        src="https://hishabee.fra1.digitaloceanspaces.com/business-manager/9/logo/TrYbbs28mA6z6b9XHrndLi0acL9wZTcRM921SluT.jpg"
        alt="Company Logo"
        width={40}
        height={40}
        // className="h-10 w-10"
      />
      <div className="bg-gray-100 p-6 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://hishabee.fra1.digitaloceanspaces.com/business-manager/9/logo/TrYbbs28mA6z6b9XHrndLi0acL9wZTcRM921SluT.jpg"
              alt="Company Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div>
              <h2 className="text-[12px] font-bold">Acme Inc.</h2>
              <p className="text-[9px] text-gray-500 dark:text-gray-400">
                123 Main St, Anytown USA 12345
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-[12px] font-bold">Sophia Anderson</h2>
              <p className="text-[9px] text-gray-500 dark:text-gray-400">
                Invoice #12345
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 p-6">
        <div className="container mx-auto grid gap-6">
          <div className="grid grid-cols-2 items-end gap-4">
            <div>
              <h2 className="text-2xl font-bold">Invoice #12345</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Issued on June 12, 2024
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">$1,234.56</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due in 30 days
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Acme Widgets</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>$99.99</TableCell>
                  <TableCell>$999.90</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Acme Gizmos</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>$49.99</TableCell>
                  <TableCell>$249.95</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Acme Doohickeys</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$24.99</TableCell>
                  <TableCell>$49.98</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold">Payment Terms</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Net 30 days. Late payments are subject to a 2% monthly fee.
              </p>
            </div>
            <div className="text-right">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">$1,299.83</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount:</span>
                  <span className="font-bold">-$50.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Charge:</span>
                  <span className="font-bold">$50.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-xl font-bold">$1,299.83</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold">Contact Us</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Acme Inc.
                <br />
                123 Main St, Anytown USA 12345
                <br />
                Phone: (555) 555-5555
                <br />
                Email: info@acme.com
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
