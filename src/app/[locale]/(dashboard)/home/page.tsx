import React from "react";
import { PageSubTitle, PageTitle, Text } from "@/components/common/text";
import { useShopId } from "@/stores/useShopId";
import { cookies } from "next/headers";

const HomePage = async () => {
  // const shopId = useShopId((state) => state.shopId);
  const cookie = cookies();
  console.log(cookie.get("shopId"));
  return (
    <div className="">
      <PageTitle title="Dashboard" />
    </div>
  );
};

export default HomePage;
