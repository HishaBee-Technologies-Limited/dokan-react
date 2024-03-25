import React from 'react';
import { printerLinks } from '@/config/printerLinks';
import CommonLayout from '@/components/layouts/common';

const PrinterLayouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommonLayout menuLinks={printerLinks} pageTitle="Printer Setup">
      {children}
    </CommonLayout>
  );
};

export default PrinterLayouts;
