import { Label } from '@/components/ui/label';
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

  // Product
  {
    label: 'Product List',
    link: '/product',
  },
  // Stock
  {
    label: 'Stock Management',
    link: '/stock',
  },
  {
    label: 'Stock History',
    link: '/stock/history',
  },
  {
    label: 'Stock Update',
    link: '/stock/update',
  },
  // Printer
  {
    label: 'Printer',
    link: '/printer/guide',
  },
  {
    label: 'Configuration',
    link: '/printer/configuration',
  },

  // SMS Marketing
  {
    label: 'SMS Marketing',
    link: '/sms',
  },
  {
    label: 'Packages',
    link: '/sms/packages',
  },
  // Online Shop
  {
    label: 'Online-shop',
    link: '/online-shop',
  },
  {
    label: 'Online Message',
    link: '/online-shop/messages',
  },
  {
    label: 'Order List',
    link: '/online-shop/orders',
  },
  {
    label: 'Online Products',
    link: '/online-shop/product',
  },
  {
    label: 'Store Settings',
    link: '/online-shop/settings',
  },
  {
    label: 'Themes',
    link: '/online-shop/themes',
  },
] as const;

export default breadCrumbLinks;
