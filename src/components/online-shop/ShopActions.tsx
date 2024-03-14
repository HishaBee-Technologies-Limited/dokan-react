'use client'

import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import React from "react";
import { Link } from "@/navigation";

type IShopActionsProps = {
  slug: string;
  name: string;
}

const ShopActions = ({slug, name}: IShopActionsProps) => {
  const handleClipboard = () => {
    navigator.clipboard.writeText(slug)
  }
  return (
    <div className="flex justify-center sm:justify-end gap-space16">
      <Button variant={'transparent'} className='bg-primary-10 dark:bg-primary-80' onClick={handleClipboard}>
        Copy shop Link
        <Icon icon="ic:baseline-content-copy" />
      </Button>
      <Link href={`https://www.hishabee.market/shop/${name}`} target="_blank">
        <Button variant={'transparent'} className='bg-primary-10 dark:bg-primary-80'>
          Visit online shop
          <Icon icon="ci:external-link" />
        </Button>
      </Link>

    </div>
  )
}

export default ShopActions