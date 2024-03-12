import React from "react";
import Card from "@/components/common/Card";
import ContactDrawers from "@/components/contact/drawers";
import ContactHeader from "@/components/contact/ContactHeader";
import { LeftSection } from "@/components/contact/LeftSection";
import { RightSection } from "@/components/contact/RightSection";
import { getAllCustomer } from "@/actions/contacts/getAllCustomer";
import { getAllSupplier } from "@/actions/contacts/getAllSupplier";
import { getAllEmployee } from "@/actions/contacts/getAllEmployee";
import { useShopId } from "@/stores/useShopId";

type IContactProps = {
  params: { locale: string };
  searchParams: any;
};

const ContactPage = async ({
  params: { locale },
  searchParams,
}: IContactProps) => {

  // const shopId = searchParams.id?.split('-')[0];
  const shopId = useShopId((state) => state.shopId);


  const customers = await getAllCustomer(shopId as number);
  const suppliers = await getAllSupplier(shopId as number);
  const employees = await getAllEmployee(shopId as number);


  return (
    <>
      <div className="space-y-space16 h-full">
        <ContactHeader />

        <Card className="space-y-space16 lg:space-y-0 lg:flex h-[calc(100%-6.4rem)]">
          <LeftSection />
          <RightSection />
        </Card>
      </div>

      <ContactDrawers />
    </>
  );
};

export default ContactPage;
