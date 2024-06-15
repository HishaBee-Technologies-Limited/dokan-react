import { PaymentStatusDef } from '@/types/purchase';

export type TransactionDef = {
  id: number;
  customer_name: string;
  transaction_barcode: string;
  total_price: number;
  created_at: string;
  total_item: number;
  transaction_type: 'QUICK_SELL';
  payment_status: PaymentStatusDef;
};

export interface ITransactionReportsResponse {
  items: {
    [date: string]: TransactionDef[];
  };
  sum: {
    [date: string]: number[];
  };
}
