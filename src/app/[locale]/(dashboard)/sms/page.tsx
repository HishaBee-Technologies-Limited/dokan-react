import React from 'react';
import { PageTitle } from '@/components/common/text';
import { LeftSection } from '@/components/sms/LeftSection';
import { RightSection } from '@/components/sms/RightSection';
import { cookies } from 'next/headers';
import { IUserResponse } from '@/types/contact/partyResponse';
import { getAllCustomer } from '@/actions/contacts/getAllCustomer';
import { getAllSupplier } from '@/actions/contacts/getAllSupplier';
import { getAllEmployee } from '@/actions/contacts/getAllEmployee';
import { ContactType } from '@/enum/contact';
import { getSingleCustomer } from '@/actions/contacts/getSingleCustomer';
import { getSingleSupplier } from '@/actions/contacts/getSingleSupplier';
import { getSingleEmployee } from '@/actions/contacts/getSingleEmployee';

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

const SMSMarketingPage = async ({
  params: { locale },
  searchParams,
}: IContactProps) => {
  const shopId = cookies().get('shopId')?.value;
  let customerDetails: IUserResponse | undefined;
  let supplierDetails: IUserResponse | undefined;
  let employeeDetails: IUserResponse | undefined;

  const tab = searchParams.tab?.split('-')[0];

  const customers = await getAllCustomer(Number(shopId));
  const suppliers = await getAllSupplier(Number(shopId));
  const employees = await getAllEmployee(Number(shopId));

  if (tab === ContactType.CUSTOMER && searchParams.active_user) {
    const res = await getSingleCustomer(Number(searchParams.active_user));
    customerDetails = res?.data;
  }

  if (tab === ContactType.SUPPLIER && searchParams.active_user) {
    const res = await getSingleSupplier(Number(searchParams.active_user));

    supplierDetails = res?.data;
  }

  if (tab === ContactType.EMPLOYEE && searchParams.active_user) {
    const res = await getSingleEmployee(Number(searchParams.active_user));
    employeeDetails = res?.data;
  }

  const userList =
    tab === ContactType.CUSTOMER
      ? customers?.data
      : tab === ContactType.SUPPLIER
        ? suppliers?.data
        : employees?.data;
  const userDetails =
    tab === ContactType.CUSTOMER
      ? customerDetails
      : tab === ContactType.SUPPLIER
        ? supplierDetails
        : employeeDetails;
  return (
    <div className="space-y-space16 h-full">
      <PageTitle title="Sms Marketing" />

      <div className="space-y-space16 lg:space-y-0 lg:flex items-center h-[calc(100%-4.4rem)]">
        <LeftSection userList={userList} />
        <RightSection />
      </div>
    </div>
  );
};

export default SMSMarketingPage;
