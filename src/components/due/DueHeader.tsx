'use client';
import React from 'react';
import Link from 'next/link';
import { DueEnum } from '@/enum/due';
import { Button } from '@/components/ui/button';
import { useDueStore } from '@/stores/useDueStore';
import { AddIcon } from '@/components/common/icons';
import { PageTitle } from '@/components/common/text';
import { HistoryIcon } from '@/components/common/icons/HistoryIcon';
import { hasPermission } from '@/lib/utils';
import { useRoleStore } from '@/stores/useRoleStore';

const DueHeader = () => {
  const handleDialogOpen = useDueStore((state) => state.setDialogState);
  const userRoles = useRoleStore((state) => state.roles);

  return (
    <div className="flex flex-wrap gap-space16 justify-between items-center">
      <PageTitle title="Due List" />

      <div className="flex gap-space12 grow-[1] sm:grow-0">
        {hasPermission(userRoles, 'DUE_HISTORY') && (
          <Link href="/due/history">
            <Button variant={'secondary'} className="grow h-14">
              <HistoryIcon />
              <span>Due History</span>
            </Button>
          </Link>
        )}

        {hasPermission(userRoles, 'DUE_ADD') && (
          <Button
            className="grow h-14"
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
        )}
      </div>
    </div>
  );
};

export default DueHeader;
