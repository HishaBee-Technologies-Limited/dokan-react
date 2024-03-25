import React from 'react';
import Icon, { IconProps } from '../Icon';

export const SaveIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon icon="lucide:save" width={width} height={height} color={color} />
  );
};
