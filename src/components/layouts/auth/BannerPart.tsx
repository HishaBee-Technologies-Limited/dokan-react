import React from 'react';
import Carousel from '@/components/layouts/auth/Carousel';

const BannerPart = () => {
  return (
    <section className="bg-primary-5 dark:bg-primary-80 h-full lg:w-1/2 hidden lg:flex items-center justify-center">
      <div className="w-full max-w-[38rem]">
        <Carousel />
      </div>
    </section>
  );
};

export default BannerPart;
