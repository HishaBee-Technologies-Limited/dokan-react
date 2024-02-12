import React from 'react';
import Icon, { IconProps } from '../Icon';

export const AddIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon icon="ic:round-add" width={width} height={height} color={color} />
  );
};
