import React from 'react';
import Icon, { IconProps } from '../Icon';

export const ErrorIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="ic:round-error-outline"
      width={width}
      height={height}
      color={color}
    />
  );
};
