import React from 'react';
import Icon, { IconProps } from '../Icon';

export const ExpandMoreIcon = ({
  height = '20',
  width = '20',
  color = '',
  rotate,
}: IconProps) => {
  return (
    <Icon
      icon="iconamoon:arrow-down-2"
      width={width}
      height={height}
      color={color}
      rotate={rotate}
    />
  );
};
