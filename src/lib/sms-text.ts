export const PURCHASE_SMS = (data: {
  amount: string;
  payment?: string;
  due: string;
  shopName: string;
  shopNumber: string;
}) => {
  return `(Hishabee) বিক্রি করেছেন ৳${data.amount} মূল্যের পণ্য - ${data.shopName} (${data.shopNumber})`;
};

export const SELL_SMS = (data: {
  amount: string;
  payment: string;
  due: string;
  shopName: string;
  shopNumber: string;
}) => {
  return `(Hishabee) কিনেছেন ৳${data.amount} মূল্যের পণ্য, পরিশোধিত ৳${data.payment} বাকি ৳${data.due} - ${data.shopName} (${data.shopNumber})`;
};

export const QUICK_SELL_SMS = (data: {
  amount: string;
  payment: string;
  due: string;
  shopName: string;
  shopNumber: string;
}) => {
  return `(Hishabee) কিনেছেন ৳${data.amount} মূল্যের পণ্য - ${data.shopName} (${data.shopNumber})`;
};

export const DUE_RECEIVED = (data: {
  amount: string;
  totalDue: string;
  shopName: string;
  shopNumber: string;
}) => {
  return `(Hishabee) নিয়েছেন ৳${data.amount}। মোট বাকি আছে/দিবেন ৳${data.totalDue} - ${data.shopName} (${data.shopNumber})`;
};
