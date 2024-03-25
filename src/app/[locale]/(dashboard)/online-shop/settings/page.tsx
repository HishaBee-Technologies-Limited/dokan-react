'use client';
import React from 'react';
import Banner from '@/components/online-shop/setting/Banner';
import ShopLink from '@/components/online-shop/setting/ShopLink';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Publication from '@/components/online-shop/setting/Publication';
import Information from '@/components/online-shop/setting/Information';
import SocialLinks from '@/components/online-shop/setting/SocialLinks';

const storeSettingOptions = [
  { value: 'publication', label: 'Shop Publication' },
  { value: 'information', label: 'Shop information' },
  { value: 'banner', label: 'Shop banner' },
  { value: 'link', label: 'Shop link' },
  { value: 'social_link', label: 'Social media link' },
];

const SettingPage = () => {
  const [activeTab, setActiveTab] = React.useState('publication');

  const activePage = (route: string) => {
    switch (route) {
      case 'publication':
        return <Publication />;
      case 'information':
        return <Information />;
      case 'banner':
        return <Banner />;
      case 'link':
        return <ShopLink />;
      case 'social_link':
        return <SocialLinks />;
      default:
        return <Publication />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-space16 ">
      <Tabs
        defaultValue={storeSettingOptions[0].value}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="flex gap-space8 flex-wrap justify-between">
          {storeSettingOptions.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ScrollArea className="h-full pr-space8 pb-space8">
        {activePage(activeTab)}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default SettingPage;
