import React from 'react';
import { Switch } from '@/components/ui/switch';
import CheckButton from '@/components/access-management/CheckButton';
import { AccessibleFeaturesForPartner } from '@/data/accessManagement';
import FeatureImageTitle from '@/components/access-management/FeatureImageTitle';

const CheckAccessibleFeatureRow = () => {
  const [activePermissions, setActivePermissions] = React.useState<string[]>(
    []
  );
  const [featurePermissions, setFeaturePermissions] = React.useState(
    AccessibleFeaturesForPartner
  );

  const featurePermissionHandle = (id: string) => {
    const newPermissions = featurePermissions.filter((item) => {
      if (item.id === id) {
        item.active = !item.active;
      }
      return item;
    });

    setFeaturePermissions(newPermissions);
  };

  const handlePermissions = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setActivePermissions([...activePermissions, e.target.value]);
    } else {
      setActivePermissions(
        activePermissions.filter((item) => item !== e.target.value)
      );
    }
  };

  const lastItem = AccessibleFeaturesForPartner.length - 1;

  return (
    <div>
      {featurePermissions.map((item, idx) => (
        <div
          key={item.id}
          className={`pb-space6 pt-space16 space-y-space8 ${
            idx === lastItem ? '' : 'border-b border-primary-20'
          }`}
        >
          <div className="flex items-center justify-between gap-space16">
            <FeatureImageTitle title={item.name} image={item.img} />

            <Switch
              id={item.id}
              checked={item.active}
              onCheckedChange={(checked) => featurePermissionHandle(item.id)}
            />
          </div>

          <div
            className={`grid ${
              item.active ? 'grid-rows-[1fr] pb-space10' : 'grid-rows-[0fr]'
            } duration-300 `}
          >
            <div className="w-full flex flex-wrap gap-space12 overflow-hidden">
              {item.permissions.map((permission, index) => (
                <CheckButton
                  id={permission}
                  label={permission}
                  key={permission + index}
                  onChange={(e) => handlePermissions(e)}
                  checked={activePermissions.includes(permission)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckAccessibleFeatureRow;
