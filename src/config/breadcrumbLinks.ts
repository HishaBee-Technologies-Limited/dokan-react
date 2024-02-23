const breadCrumbLinks = [
  // Dashboard
  {
    label: 'Home',
    link: '/home',
  },
  // Expense
  {
    label: 'Expense Khata',
    link: '/expense',
  },
  // Sell
  {
    label: 'Sell',
    link: '/sell',
  },
  {
    label: 'Sell History',
    link: '/sell/history',
  },
  // Purchase
  {
    label: 'Purchase',
    link: '/purchase',
  },
  {
    label: 'Purchase History',
    link: '/purchase/history',
  },
  // Due
  {
    label: 'Due',
    link: '/due',
  },
  {
    label: 'Due History',
    link: '/due/history',
  },
] as const;

export default breadCrumbLinks;
