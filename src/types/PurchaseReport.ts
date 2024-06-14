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
