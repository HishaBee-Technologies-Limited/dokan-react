'use client';
import React from 'react';
import Link from 'next/link';
import { DueEnum } from '@/enum/due';
import { Button } from '@/components/ui/button';
import { useDueStore } from '@/stores/useDueStore';
import { AddIcon } from '@/components/common/icons';
import { PageTitle } from '@/components/common/text';
import { HistoryIcon } from '@/components/common/icons/HistoryIcon';

const DueHeader = () => {
  const handleDialogOpen = useDueStore((state) => state.setDialogState);

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Due List" />

      <div className="flex gap-space12 grow-[1] sm:grow-0">
        <Link href="/due/history">
          <Button variant={'secondary'}>
            <HistoryIcon />
            <span>Due History</span>
          </Button>
        </Link>

        <Button
          className="grow"
          onClick={() =>
            handleDialogOpen({
              open: true,
              header: DueEnum.SELECT_THE_DUE_TYPE,
            })
          }
        >
          <AddIcon />
          <span>New Due</span>
        </Button>
      </div>
    </div>
  );
};

export default DueHeader;
