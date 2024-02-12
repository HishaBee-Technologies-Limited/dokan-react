import React from 'react';
import Icon, { IconProps } from '../Icon';

export const CalendarIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="material-symbols:date-range-outline"
      width={width}
      height={height}
      color={color}
    />
  );
};
