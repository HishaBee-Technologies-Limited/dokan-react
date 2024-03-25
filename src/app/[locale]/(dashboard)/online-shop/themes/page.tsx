'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';
import { PageSubTitle } from '@/components/common/text';

const themes = [
  { img: '/images/theme1.svg', name: 'default' },
  { img: '/images/theme2.svg', name: 'light' },
];

const ThemesPage = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  return (
    <div className="h-full max-w-max flex flex-col gap-space16">
      <PageSubTitle title="Online shop theme style" />

      <div className="md:h-[80%] flex gap-space16">
        {themes.map((theme) => (
          <Image
            key={theme.name}
            alt=""
            width={300}
            height={500}
            sizes="100vw"
            src={theme.img}
            className="w-full h-full object-contain"
            onClick={() => setSelectedTheme(theme.name)}
            wrapperClasses={`p-space8 shadow rounded-sm h-max md:h-auto ${selectedTheme === theme.name ? 'border-2 border-primary-100' : 'border border-color'}`}
          />
        ))}
      </div>

      <div className="flex justify-end gap-space16 pb-space12">
        <Button variant={'secondary'}>Cancel</Button>
        <Button disabled={selectedTheme === 'default'}>Save Theme</Button>
      </div>
    </div>
  );
};

export default ThemesPage;
