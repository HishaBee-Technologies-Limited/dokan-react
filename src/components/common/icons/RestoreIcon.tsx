import React from 'react';
import Icon, { IconProps } from '../Icon';

export const RestoreIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="ic:round-settings-backup-restore"
      width={width}
      height={height}
      color={color}
    />
  );
};
