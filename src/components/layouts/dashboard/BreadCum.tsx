import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import breadCrumbLinks from '@/config/breadcrumbLinks';

type IBreadCrumb = {
  title: string;
  link: string;
};

const BreadCum = () => {
  const pathName = usePathname();
  const [breadCrumbs, setBreadCrumbs] = useState<IBreadCrumb[]>([]);

  useEffect(() => {
    const pathArray = pathName.split('/').filter((path) => path !== '');

    const breadCrumbsArr: IBreadCrumb[] = [];

    pathArray.forEach((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      const breadCrumbItem = breadCrumbLinks.find(
        (breadCrumb) => breadCrumb.link === href
      );
      if (breadCrumbItem !== undefined) {
        breadCrumbsArr.push({
          title: breadCrumbItem.label,
          link: breadCrumbItem.link,
        });
      }
    });

    setBreadCrumbs(breadCrumbsArr);
  }, [pathName]);

  return (
    <div className="bg-white dark:bg-primary-90 px-space16 h-[2.8rem] py-1 hidden lg:block">
      <ol className="flex items-center space-x-1">
        {breadCrumbs.map((page, index) => (
          <li
            key={page.title}
            className="text-primary-90 dark:text-primary-40 dark:hover:text-action-100 hover:text-action-100 text-sm"
          >
            <div className="flex items-center">
              <Link href={page.link} className="mr-1">
                {page.title}
              </Link>
              {index !== breadCrumbs.length - 1 && (
                <svg
                  className="flex-shrink-0 w-5 h-5 text-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BreadCum;
