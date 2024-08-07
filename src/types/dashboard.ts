import { TRANSACTION_TYPE } from '@/lib/constants/common';
import { PaymentStatusDef } from './orders';

export interface ICustomerReportsResponse {
  customer: string;
  transaction_count: number;
  transaction_amount: number;
}

export interface IEmployeeReportsResponse {
  employee: string;
  transaction_count: number;
  transaction_amount: number;
}

export interface IExpenseReportsResponse {
  expense: string;
  expense_count: number;
  expense_amount: number;
}

export type PurchaseItemDef = {
  id: number;
  created_at: string;
  total_price: number;
  total_item: number;
  purchase_barcode: string;
  payment_status: 'PAID' | 'DUE';
};

export interface IPurchaseReportResponse {
  items: {
    [date: string]: PurchaseItemDef[];
  };
  sum: {
    [date: string]: number[];
  };
}

export interface IIncomeReportsResponse {
  income: string;
  income_count: number;
  income_amount: number;
}

export interface IProductReportsResponse {
  product_name: string;
  sell_count: string;
  sell_amount: number;
}

export interface IStockReportsResponse {
  product_name: string;
  stock_in_count: string;
  stock_in_amount: number;
  stock_out_count: number;
  stock_out_amount: number;
}

export interface ISupplierReportsResponse {
  supplier: string;
  purchase_count: string;
  purchase_amount: number;
}

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
