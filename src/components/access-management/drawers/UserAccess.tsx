import React, { useState } from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { AddIcon } from '@/components/common/icons';
import { AccessManagementEnum } from '@/enum/accessManagement';
import CheckButton from '@/components/access-management/CheckButton';
import { useAccessManagementStore } from '@/stores/useAccessManagementStore';
import AccessibleFeatureList from '@/components/access-management/AccessibleFeatureList';

const userRoles = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'User',
  },
  {
    id: 3,
    name: 'Guest',
  },
];

const UserAccess = () => {
  const [accessRole, setAccessRole] = useState<number>(1);
  const openDrawer = useAccessManagementStore((state) => state.setDrawerState);

  return (
    <div className="h-full flex flex-col gap-space6 ">
      <div className="space-y-space4">
        <Text>Role *</Text>
        <div className="flex gap-space8 flex-wrap">
          {userRoles.map((role) => (
            <CheckButton
              id={role.id}
              label={role.name}
              key={role.id + 'role'}
              checked={accessRole === role.id}
              onChange={(e) => setAccessRole(+e.target.value)}
            />
          ))}

          <Button
            variant={'outline'}
            className="!h-[4rem] !px-space12"
            onClick={() =>
              openDrawer({
                open: true,
                header: AccessManagementEnum.NEW_ROLE,
              })
            }
          >
            <AddIcon /> Add New Rule
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-space12">
        <Text title={'যেসব ফিচারে এক্সেস পাবে'} className="font-semibold" />
        <Button variant={'transparent'} className="!px-0">
          <Icon icon="bx:edit" />
          পদবী এডিট
        </Button>
      </div>

      <AccessibleFeatureList />
    </div>
  );
};

export default UserAccess;
