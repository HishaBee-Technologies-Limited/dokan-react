import React from 'react';
import Icon, { IconProps } from '../Icon';

export const ArrowForwardIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="fluent:arrow-right-12-regular"
      width={width}
      height={height}
      color={color}
    />
  );
};
