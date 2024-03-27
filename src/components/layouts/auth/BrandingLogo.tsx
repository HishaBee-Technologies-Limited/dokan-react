'use client';
import React from 'react';
import Image from 'next/image';

const BrandingLogo = () => {
  return (
    <Image
      src={'/images/branding/hishabee.svg'}
      alt="brand"
      width={180}
      height={42}
    />
  );
};

export default BrandingLogo;
