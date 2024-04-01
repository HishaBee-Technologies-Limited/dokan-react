import React, { useState } from 'react';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { AddIcon } from '@/components/common/icons';
import CheckButton from '@/components/access-management/CheckButton';

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

  return (
    <div>
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

          <Button variant={'outline'} className="!h-[4rem] !px-space12">
            <AddIcon />
            Add New Rule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserAccess;
