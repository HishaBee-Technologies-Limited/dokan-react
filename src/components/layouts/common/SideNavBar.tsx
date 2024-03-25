import React from 'react';
import Link from 'next/link';
import { CommonLayoutProps } from '.';
import { usePathname } from 'next/navigation';
import { Text } from '@/components/common/text';

interface MenuLinkProps {
  data: CommonLayoutProps['menuLinks'];
}

const SideNavBar = ({ data }: MenuLinkProps) => {
  const pathname = usePathname();

  return (
    <div className="h-full w-3/12 hidden md:block border-r border-color pr-space24">
      <ul className="space-y-space4 w-full">
        {data.map((link) => (
          <li
            key={link.title}
            className={`w-full rounded-md hover:bg-primary-10 dark:hover:bg-primary-90 ${pathname.includes(link.link) ? 'bg-primary-10 dark:bg-primary-90' : ''}`}
          >
            <Link
              href={link.link}
              className={'w-full block px-space16 lg:px-space24 py-space8 '}
            >
              <Text title={link.title} className="font-medium" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavBar;
