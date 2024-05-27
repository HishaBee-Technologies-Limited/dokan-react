export const PURCHASE_SMS = (data: {
  amount: string;
  payment: string;
  due: string;
  shopName: string;
  shopNumber: string;
}) => {
  return `(Hishabee) কিনেছেন ৳${data.amount}মূল্যের পণ্য, পরিশোধিত ${data.payment}৳ বাকি ${data.due}৳ -${data.shopName} (${data.shopNumber})`;
};
