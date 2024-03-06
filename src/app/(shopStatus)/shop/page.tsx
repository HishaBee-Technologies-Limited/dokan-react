"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Card from "@/components/common/Card";
import Icon from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/common/Image";
import { PageSubTitle, Text } from "@/components/common/text";
import { useRouter } from "next/navigation";
import { getAllShops } from "@/actions/getAllShops";

const shopData = [
  {
    id: 1,
    active: true,
    name: "আমিরা স্টোর",
    img: "/images/shop_view.svg",
    address: "মোহাম্মদপুর, ঢাকা - ১২০০",
  },
  {
    id: 2,
    active: false,
    name: "আমিরা স্টোর",
    img: "/images/shop_view.svg",
    address: "মোহাম্মদপুর, ঢাকা - ১২০০",
  },
  {
    id: 3,
    active: false,
    name: "আমিরা স্টোর",
    img: "/images/shop_view.svg",
    address: "মোহাম্মদপুর, ঢাকা - ১২০০",
  },
];

const SwitchShopPage = () => {
  const router = useRouter();
  const [selectShop, setSelectShop] = useState<number | null>(null);

  const handleEditClick = (shop: any) => {};

  const handleContinue = () => {
    router.push("/contact");
  };

  useEffect(() => {
    const getShops = async () => {
      await getAllShops();
    };
    getShops();
  }, []);

  return (
    <div className="space-y-space16">
      <PageSubTitle title="Switch your Shop" />

      <div className="gap-space16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {shopData.map((shop) => (
          <Card
            key={shop.id + "shop"}
            onClick={() =>
              setSelectShop((prv) => (shop.active ? prv : shop.id))
            }
            className={`p-space16 border-color relative flex w-full flex-col items-center shadow-sm
                        ${shop.active ? "!bg-primary-5 border-[.2rem] dark:!bg-transparent" : "cursor-pointer"}
                        ${selectShop === shop.id ? "border-[.3rem]" : "border"}
                        `}
          >
            {shop.active && (
              <article className="gap-space8 top-space16 left-space24 absolute flex items-center">
                <div className="h-space10 w-space10 bg-success-100 rounded-full"></div>
                <Text title="Active shop" className="text-xs font-semibold" />
              </article>
            )}

            <div className="mt-space32 gap-space12 flex flex-col items-center">
              <Image src={shop.img} alt="" height={84} width={84} />

              <Text title={shop.name} className="font-semibold" />
              <Text
                title={shop.address}
                variant="secondary"
                className="text-sm"
              />

              <Link href={"/shop/edit"}>
                <Button
                  size={"sm"}
                  variant="secondary"
                  className="sm:px-space32"
                  onClick={() => handleEditClick(shop)}
                >
                  <Icon icon="mdi:store-edit-outline" height={24} width={24} />
                  <Text title="Edit Shop" className="text-sm font-semibold" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        <Card
          className={`p-space16 py-space40 border-color border-color gap-space32 flex w-full flex-col items-center border shadow-sm`}
        >
          <Image src={"/images/add_shop.svg"} alt="" height={84} width={84} />

          <Link href={"/shop/add"}>
            <Button variant="secondary" className="sm:px-space32">
              <Icon
                icon="fontisto:shopping-basket-add"
                height={24}
                width={24}
              />
              <Text title="Add New Shop" className="text-sm font-semibold" />
            </Button>
          </Link>
        </Card>
      </div>

      <div className="gap-space12 mt-space16 flex justify-end">
        <Button disabled={!selectShop} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SwitchShopPage;
