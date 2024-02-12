import React from 'react';
import Icon, { IconProps } from '../Icon';

export const EditIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="material-symbols:edit"
      width={width}
      height={height}
      color={color}
    />
  );
};
