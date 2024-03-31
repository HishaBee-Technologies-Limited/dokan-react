import { IAsideBarMenuItem } from '@/types/SidebarLinks';

const SidebarLinks: IAsideBarMenuItem[] = [
  {
    id: 1,
    title: 'Home',
    bn_title: 'হোম',
    image: '/images/features/home.svg',
    link: '/home',
  },
  {
    id: 2,
    title: 'Tally',
    bn_title: 'স্টক খাতা',
    image: '/images/features/tally.svg',
    link: '#',
    children: [
      {
        id: 200,
        title: 'Purchase',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/purchase.svg',
        link: '/purchase',
      },
      {
        id: 201,
        title: 'Purchase list',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/purchase_list.svg',
        link: '/transaction-history',
      },
      {
        id: 202,
        title: 'Sell',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/sell.svg',
        link: '/sell',
      },
      {
        id: 203,
        title: 'Transaction',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/transaction.svg',
        link: '/order-history',
      },
      {
        id: 204,
        title: 'Due List',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/due.svg',
        link: '/due',
      },
      {
        id: 205,
        title: 'Expense',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/features/expense.svg',
        link: '/expense',
      },
      {
        id: 206,
        title: 'Contact',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/features/contact.svg',
        link: '/contact',
      },
    ],
  },
  {
    id: 3,
    title: 'Standard',
    bn_title: 'স্টক খাতা',
    image: '/images/features/standard.svg',
    link: '#',
    children: [
      {
        id: 301,
        title: 'Product List',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/features/product_list.svg',
        link: '/product',
      },
      {
        id: 302,
        title: 'Stock Management',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/stock_management.svg',
        link: '/stock',
      },
      {
        id: 303,
        title: 'Access Management',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/stock_management.svg',
        link: '/access-management',
      },
      {
        id: 304,
        title: 'Printer',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/printer.svg',
        link: '/printer',
      },
    ],
  },
  {
    id: 4,
    title: 'Advanced',
    bn_title: 'স্টক খাতা',
    image: '/images/features/advanced.svg',
    link: '#',
    children: [
      {
        id: 401,
        title: 'Online Shop',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/features/online_shop.svg',
        link: '/online-shop',
      },
      {
        id: 402,
        title: 'Sms Marketing',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/features/sms_marketing.svg',
        link: '/sms',
      },
    ],
  },
];

export default SidebarLinks;
