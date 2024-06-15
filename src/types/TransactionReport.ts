import { PaymentStatusDef } from '@/types/purchase';
import { TRANSACTION_TYPE } from '@/lib/constants/common';

export type TransactionDef = {
  id: number;
  customer_name: string;
  transaction_barcode: string;
  total_price: number;
  created_at: string;
  total_item: number;
  transaction_type: TRANSACTION_TYPE;
  payment_status: PaymentStatusDef;
  total_profit: number;
};

export interface ITransactionReportsResponse {
  items: {
    [date: string]: TransactionDef[];
  };
  sum: {
    [date: string]: number[];
  };
}
