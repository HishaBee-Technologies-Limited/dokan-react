export type TransactionDef = {
  id: number;
  customer_name: string;
  transaction_barcode: string;
  total_price: number;
  created_at: string;
};

export interface ITransactionReportsResponse {
  items: {
    [date: string]: TransactionDef[];
  };
  sum: {
    [date: string]: number[];
  };
}
