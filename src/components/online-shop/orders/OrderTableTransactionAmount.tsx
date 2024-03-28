'use client';

export type OrderTableTransactionAmountPropsDef = {
  to: number;
  total: number;
};

const OrderTableTransactionAmount = ({
  total,
  to,
}: OrderTableTransactionAmountPropsDef) => (
  <div>
    Showing {to} of {total} Transactions
  </div>
);

export default OrderTableTransactionAmount;
