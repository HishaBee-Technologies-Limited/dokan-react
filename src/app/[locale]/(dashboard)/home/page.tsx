"use client";
import React from "react";
import { PageSubTitle, PageTitle, Text } from "@/components/common/text";
import { useShopId } from "@/stores/useShopId";

const HomePage = () => {
  const shopId = useShopId((state) => state.shopId);
  return (
    <div className="">
      <PageTitle title="Dashboard" />
    </div>
  );
};

export default HomePage;