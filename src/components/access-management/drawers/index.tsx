import React from 'react';
import { Drawer } from '@/components/common/Drawer';
import { AccessManagementEnum } from '@/enum/accessManagement';
import NewRole from '@/components/access-management/drawers/NewRole';
import { useAccessManagementStore } from '@/stores/useAccessManagementStore';
import NewUserAccess from '@/components/access-management/drawers/NewUserAccess';

const AccessManagementDrawer = () => {
  const drawerState = useAccessManagementStore((state) => state.drawerState);
  const handleClose = useAccessManagementStore((state) => state.setDrawerState);

  const renderedDrawers = (activeDrawer: string | undefined) => {
    if (AccessManagementEnum.NEW_USER_ACCESS === activeDrawer) {
      return <NewUserAccess />;
    } else if (AccessManagementEnum.NEW_ROLE === activeDrawer) {
      return <NewRole />;
    }
  };

  return (
    <Drawer
      open={drawerState.open}
      header={drawerState.header}
      onClose={(open) => handleClose({ open })}
    >
      {renderedDrawers(drawerState.header)}
    </Drawer>
  );
};

export default AccessManagementDrawer;
