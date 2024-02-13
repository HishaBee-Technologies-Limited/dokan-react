import { IAsideBarMenuItem } from '@/types/SidebarLinks';

const SidebarLinks: IAsideBarMenuItem[] = [
  {
    id: 1,
    title: 'Home',
    bn_title: 'হোম',
    image: '/image/home.svg',
    link: '/home',
  },
  {
    id: 31,
    title: 'Product list',
    bn_title: 'প্রোডাক্ট লিস্ট',
    image: '/image/product_list.svg',
    link: '/#',
  },
  {
    id: 2,
    title: 'Stock Khata',
    bn_title: 'স্টক খাতা',
    image: '/image/stock.svg',
    link: '/home/##',
    children: [
      {
        id: 222,
        title: 'Stock Dashboard',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/image/stock.svg',
        link: '/#',
      },
      {
        id: 233,
        title: 'Stock History',
        bn_title: 'স্টক ইতিহাস',
        image: '/image/stock.svg',
        link: '/#',
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
    link: '/####',
  },
  {
    id: 6,
    title: 'Business Report',
    bn_title: 'ব্যবসার রিপোর্ট',
    image: '/image/business.svg',
    link: '/#####',
  },
];

export default SidebarLinks;
