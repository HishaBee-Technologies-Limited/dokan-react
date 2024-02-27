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
  // Settings
  {
    label: 'Settings',
    link: '/settings',
  },
  {
    label: 'Language',
    link: '/settings/lang',
  },
  {
    label: 'Personal QR Code',
    link: '/settings/qr-code',
  },
  {
    label: 'Switch Shop',
    link: '/settings/shop',
  },
  {
    label: 'Add Shop',
    link: '/settings/shop/add',
  },
  {
    label: 'Edit Shop',
    link: '/settings/shop/edit',
  },
  {
    label: 'Contact Us',
    link: '/settings/contact-us',
  },
  {
    label: 'Feedback',
    link: '/settings/feedback',
  },
] as const;

export default breadCrumbLinks;
