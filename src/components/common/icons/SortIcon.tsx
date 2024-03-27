import React from 'react';
import Icon, { IconProps } from '../Icon';

export const SortIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="solar:sort-linear"
      width={width}
      height={height}
      color={color}
    />
  );
};
