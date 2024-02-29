import { IAsideBarMenuItem } from '@/types/SidebarLinks';

const SidebarLinks: IAsideBarMenuItem[] = [
  {
    id: 1,
    title: 'Home',
    bn_title: 'হোম',
    image: '/images/menu/home.svg',
    link: '/home',
  },
  {
    id: 2,
    title: 'Tally',
    bn_title: 'স্টক খাতা',
    image: '/images/menu/folder.svg',
    link: '#',
    children: [
      {
        id: 201,
        title: 'Expense',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/menu/home.svg',
        link: '/expense',
      },
      {
        id: 202,
        title: 'Sell',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/sell',
      },
      {
        id: 203,
        title: 'Sell History',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/sell/history',
      },
      {
        id: 204,
        title: 'Purchase',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/purchase',
      },
      {
        id: 205,
        title: 'Purchase History',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/purchase/history',
      },
      {
        id: 206,
        title: 'Due',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/due',
      },
    ],
  },
  {
    id: 3,
    title: 'Standard',
    bn_title: 'স্টক খাতা',
    image: '/images/menu/folder.svg',
    link: '#',
    children: [
      {
        id: 301,
        title: 'Product List',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/menu/home.svg',
        link: '/product',
      },
      {
        id: 302,
        title: 'Stock Management',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/stock',
      },
      {
        id: 303,
        title: 'Printer',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/printer/guide',
      },
    ],
  },
  {
    id: 4,
    title: 'Advanced',
    bn_title: 'স্টক খাতা',
    image: '/images/menu/folder.svg',
    link: '#',
    children: [
      {
        id: 401,
        title: 'Stock Dashboard',
        bn_title: 'স্টক ড্যাশবোর্ড',
        image: '/images/menu/home.svg',
        link: '/#',
      },
      {
        id: 402,
        title: 'Stock History',
        bn_title: 'স্টক ইতিহাস',
        image: '/images/menu/home.svg',
        link: '/#',
      },
    ],
  },
];

export default SidebarLinks;
