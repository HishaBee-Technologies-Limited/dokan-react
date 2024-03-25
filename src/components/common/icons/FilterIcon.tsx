import React from 'react';
import Icon, { IconProps } from '../Icon';

export const FilterIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon icon="ri:filter-2-line" width={width} height={height} color={color} />
  );
};

export default FilterIcon;
