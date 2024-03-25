import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IProps {
  src: string;
  alt?: string;
  fallback: string;
  className?: string;
}

const FallBackImage = ({
  fallback,
  src,
  alt = 'photo',
  className = '',
}: IProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default FallBackImage;
