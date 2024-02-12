import React from 'react';
import Icon, { IconProps } from '../Icon';

export const DeleteIcon = ({
  height = '20',
  width = '20',
  color = '#DD3409',
}: IconProps) => {
  return (
    <Icon
      icon="ic:baseline-delete-forever"
      width={width}
      height={height}
      color={color}
    />
  );
};
