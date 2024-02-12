import React from 'react';
import Icon, { IconProps } from '../Icon';

export const CancelIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon icon="ic:round-cancel" width={width} height={height} color={color} />
  );
};
