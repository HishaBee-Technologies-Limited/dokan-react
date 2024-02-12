import { IAsideBarMenuItem } from '@/types/SidebarLinks';

const SidebarLinks: IAsideBarMenuItem[] = [
  {
    id: 1,
    title: 'Home',
    bn_title: 'হোম',
    image: '/image/home.svg',
    link: '/dashboard',
  },
  {
    id: 31,
    title: 'Product list',
    bn_title: 'প্রোডাক্ট লিস্ট',
    image: '/image/product_list.svg',
    link: '/product',
  },
  {
    id: 2,
    title: 'Stock Khata',
    bn_title: 'স্টক খাতা',
    image: '/image/stock.svg',
    link: '/stock',
    children: [
      {
        id: 201,
        title: 'Stock Dashboard',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/image/stock.svg',
        link: '/stock',
      },
      {
        id: 202,
        title: 'Stock History',
        bn_title: 'স্টক ইতিহাস',
        image: '/image/stock.svg',
        link: '/stock/history',
      },
    ],
  },
  {
    id: 5,
    title: 'Expense Khata',
    bn_title: 'খরচের খাতা',
    image: '/image/expense.svg',
    link: '/expense',
  },
  {
    id: 4,
    title: 'Accounts',
    bn_title: 'অ্যাকাউন্টস',
    image: '/image/account.svg',
    link: '/account',
  },
  {
    id: 6,
    title: 'Business Report',
    bn_title: 'ব্যবসার রিপোর্ট',
    image: '/image/business.svg',
    link: '/business-overview',
  },
];

export default SidebarLinks;
