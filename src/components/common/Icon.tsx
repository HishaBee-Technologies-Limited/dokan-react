import React from 'react';
import { Icon as Iconify, IconifyIcon } from '@iconify/react';

export type IconProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  rotate?: number;
};
type IIconProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  icon: string | IconifyIcon;
  rotate?: number;
};

const Icon = ({ height, width, color, icon, rotate }: IIconProps) => {
  return (
    <Iconify
      icon={icon}
      width={width}
      height={height}
      color={color}
      rotate={rotate}
    />
  );
};

export default Icon;
