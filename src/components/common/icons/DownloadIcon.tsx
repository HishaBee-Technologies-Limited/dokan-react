import React from 'react';
import Icon, { IconProps } from '../Icon';

export const DownloadIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="material-symbols:download"
      width={width}
      height={height}
      color={color}
    />
  );
};
