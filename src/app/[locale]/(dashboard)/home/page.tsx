import React from 'react';
import { cookies } from 'next/headers';
import HomeHeader from '@/components/HomeHeader';

const HomePage = async () => {
  const cookie = cookies();

  return (
    <div className="">
      <HomeHeader />
    </div>
  );
};

export default HomePage;
