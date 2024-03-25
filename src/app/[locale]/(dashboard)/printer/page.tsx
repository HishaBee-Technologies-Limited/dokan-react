import React from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import { PageSubTitle, Text } from '@/components/common/text';

const GuidePage = () => {
  return (
    <div className="space-y-space24 max-w-[53rem]">
      <PageSubTitle title="Printer Setup Process" />

      <Card className="p-space16 space-y-space8">
        <Text
          title="1. Install and Setup the printer driver"
          className="font-semibold"
        />

        <Text
          title="Download and install the driver from the download link below. During time to install, Select operating system, printer size, port. then complete the setup."
          className="font-medium text-sm"
        />

        <div className="flex gap-space16 items-center">
          <Text title="Download link:" className="font-semibold" />
          <Link href={`/#`} className="font-semibold text-blue-700 underline">
            Click here
          </Link>
        </div>
      </Card>
      <Card className="p-space16 space-y-space8">
        <Text
          title="2. Switch  on the  printer  and connect to the computer"
          className="font-semibold"
        />

        <Text
          title="First switch on the printer by pressing the power button. Then the printer with the USB cable connect to computer."
          className="font-medium text-sm"
        />
      </Card>
      <Card className="p-space16 space-y-space8">
        <Text title="3. Printer setting" className="font-semibold" />

        <Text
          title="Click on the Configuration button. Printer language, Printer size, Printer font size, Print Online store QR, select the latest text"
          className="font-medium text-sm"
        />
      </Card>
    </div>
  );
};

export default GuidePage;
