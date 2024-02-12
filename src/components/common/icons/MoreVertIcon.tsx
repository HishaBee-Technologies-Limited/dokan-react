import React from 'react';
import Icon, { IconProps } from '../Icon';

export const MoreVertIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="ph:dots-three-outline-vertical-fill"
      width={width}
      height={height}
      color={color}
    />
  );
};
