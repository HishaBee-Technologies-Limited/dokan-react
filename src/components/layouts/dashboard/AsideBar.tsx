import Link from 'next/link';
import Image from 'next/image';
import { IMenuOpenProps } from '.';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import SidebarLinks, {
  SidebarLinksFree,
  SidebarLinksStandard,
} from '@/config/sidebarLinks';
import { IAsideBarMenuItem } from '@/types/SidebarLinks';
import { CancelIcon, ExpandMoreIcon } from '@/components/common/icons';
import { getCookie } from 'cookies-next';
import { SUBSCRIPTION_PACKAGES } from '@/lib/constants/common';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { logout } from '@/actions/logout';

const AsideBar = ({ menuOpen, setMenuOpen }: IMenuOpenProps) => {
  const pathname = usePathname();

  const [active, setActive] = useState<number | null>(null);
  const shop = getCookie('shop');
  const [link, setLink] = useState<IAsideBarMenuItem[]>([]);
  useEffect(() => {
    console.log(shop);
    if (shop) {
      if (
        JSON.parse(shop as string).subscription ===
        SUBSCRIPTION_PACKAGES.advanced
      ) {
        setLink(SidebarLinks);
      } else if (
        JSON.parse(shop as string).subscription ===
        SUBSCRIPTION_PACKAGES.standard
      ) {
        setLink(SidebarLinksStandard);
      } else {
        setLink(SidebarLinksFree);
      }
    }
    if (!shop) {
      console.log('shop not found');
      logout();
    }
  }, [shop]);
  // console.log(JSON.parse(shop as string).subscription);
  return (
    <aside
      className={`bg-white dark:bg-primary-90 h-screen fixed hd:relative ${menuOpen ? 'w-[30rem] xl:w-[34.4rem] left-0' : '-left-[30rem] xl:left-0 w-[30rem] xl:w-[8rem] hd:w-[34.4rem]'} duration-500 z-50`}
    >
      <div
        className={`h-[7.2rem] border-b border-primary-10 dark:border-primary-80 px-space16 flex items-center justify-between sticky top-0`}
      >
        <Link href="/home">
          <Image
            alt="logo"
            height={32}
            width={135}
            src={'/images/branding/hishabee.svg'}
            className={`${menuOpen ? '' : 'hidden hd:block'}`}
          />
          <Image
            alt="logo"
            height={32}
            width={36}
            src={'/images/branding/Bee.svg'}
            className={`${menuOpen ? 'hidden' : 'block hd:hidden'}`}
          />
        </Link>

        <Button
          onClick={() => setMenuOpen((prv) => !prv)}
          size={'icon'}
          className="xl:hidden"
        >
          <CancelIcon width={24} height={24} />
        </Button>
      </div>

      <nav
      // className={`h-[calc(100vh-7.2rem)] overflow-y-scroll scroll_hidden px-space12 pt-space24 `}
      >
        <ul className="space-y-space8">
          <ScrollArea
            className={`h-[calc(100vh-7.2rem)] overflow-y-auto scroll_hidden px-space12 pt-space24 `}
          >
            {link?.map((menu, i) => {
              const menuLinkItem = (
                menu: IAsideBarMenuItem,
                subMenu: boolean
              ) => (
                <>
                  {![9, 10, 11, 12, 13, 0].includes(i) && (
                    <Link
                      href={`${menu.link}`}
                      onClick={() => {
                        setMenuOpen(true);

                        setActive(
                          subMenu ? active : active === menu.id ? null : menu.id
                        );
                      }}
                      className={`flex items-center p-space8 w-full hover:bg-primary-10 dark:hover:bg-[#171717] duration-300 rounded-md relative after:absolute after:w-[.4rem] hover:after:h-full after:duration-300 after:rounded-[1rem] after:-left-3 after:top-1/2 after:transform after:-translate-y-1/2 after:bg-primary-100 dark:after:bg-primary-60 ${(pathname.includes(menu.link) && !pathname.includes('list')) || active === menu.id ? 'after:h-full bg-primary-10 dark:bg-[#171717]' : 'after:h-0'}`}
                    >
                      <Image src={menu.image} alt="" height={24} width={24} />
                      <span
                        className={`block text-text500 font-medium dark:text-text300 transition-all duration-700 ${menuOpen ? 'ml-space10' : 'w-0 overflow-hidden hd:h-auto hd:w-auto hd:ml-space10'}`}
                      >
                        {menu.title}
                      </span>
                      {!['ADVANCED', 'STANDARD', 'TRAIL'].includes(
                        JSON.parse(shop as string).subscription
                      ) && [8, 10, 9].includes(i) ? (
                        <div className={`absolute right-space12   `}>
                          <Image
                            src="/images/features/standard-new.svg"
                            alt=""
                            height={24}
                            width={24}
                          />
                        </div>
                      ) : null}
                      {!['ADVANCED', 'STANDARD', 'TRAIL'].includes(
                        JSON.parse(shop as string).subscription
                      ) && [11, 12, 13].includes(i) ? (
                        <div className={`absolute right-space12   `}>
                          <Image
                            src="/images/features/advance.svg"
                            alt=""
                            height={24}
                            width={24}
                          />
                        </div>
                      ) : null}
                      {/* {menu.children && (
                  <div
                    className={`absolute right-space12 top-1/2 transform -translate-y-1/2 ease-in ${active === menu.id ? 'rotate-180 duration-300' : 'duration-300'} ${menuOpen ? 'opacity-100 duration-1000' : 'xl:opacity-0 w-0 hd:opacity-100 hd:w-auto'}  `}
                  >
                    <ExpandMoreIcon width={24} height={24} />
                  </div>
                )} */}
                    </Link>
                  )}
                  {/* {i === 0 && (
                    <div className="w-[250px] border-t border-gray-300 dark:border-gray-800  m-8" />
                  )} */}
                  {i === 2 && (
                    <div className="w-[250px]  border-t border-gray-300 dark:border-gray-800  m-8" />
                  )}
                  {i === 7 && (
                    <div className="w-[250px]  border-t border-gray-300 dark:border-gray-800  m-8" />
                  )}
                  {i === 10 && (
                    <div className="w-[250px]  border-t border-gray-300 dark:border-gray-800  m-8" />
                  )}
                </>
              );

              return (
                <li key={menu.id}>
                  {menuLinkItem(menu, false)}

                  {menu.children && (
                    <div
                      className={` ${menuOpen ? 'grid' : 'grid xl:hidden hd:grid'} ${active === menu.id ? 'grid-rows-[1fr] py-space10' : 'grid-rows-[0fr]'} duration-300 `}
                    >
                      <div className="w-full overflow-hidden pl-space24">
                        {menu.children.map((subMenu) => (
                          <div key={'subMenu' + subMenu.title}>
                            {menuLinkItem(subMenu, true)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ScrollArea>
        </ul>
      </nav>
    </aside>
  );
};

export default AsideBar;
