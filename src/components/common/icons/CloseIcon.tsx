import React from 'react';
import Icon, { IconProps } from '../Icon';

export const CloseIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon icon="iconoir:cancel" width={width} height={height} color={color} />
  );
};
