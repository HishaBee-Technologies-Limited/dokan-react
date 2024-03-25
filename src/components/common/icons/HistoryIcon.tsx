import React from 'react';
import Icon, { IconProps } from '../Icon';

export const HistoryIcon = ({
  height = '20',
  width = '20',
  color = '',
}: IconProps) => {
  return (
    <Icon
      icon="ic:baseline-history"
      width={width}
      height={height}
      color={color}
    />
  );
};
