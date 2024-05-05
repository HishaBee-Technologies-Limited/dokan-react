type SubStringDef = 'PURCHASE' | 'SELL' | 'DUE' | 'EXPENSE';
export const useMessage = (subString: SubStringDef, amount: string) => {
  if (subString === 'PURCHASE') {
    return `Your purchased amount ৳${amount}`;
  }
  if (subString === 'SELL') {
    return `Your transaction amount ৳${amount}`;
  }
  if (subString === 'EXPENSE') {
    return `Your Expense amount ৳${amount}`;
  }
  if (subString === 'DUE') {
    return `Your due amount ৳${amount}`;
  }
};
