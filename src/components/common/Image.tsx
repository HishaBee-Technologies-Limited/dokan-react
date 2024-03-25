'use client';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { default as NextImage, ImageProps } from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type IProps = Omit<ImageProps, 'src'> & {
  src: string | StaticImport | null | undefined;
  fallback?: string;
  debug?: string;
  icon?: string;
  wrapperClasses?: string;
};

const Image = ({
  src,
  alt,
  icon = 'mdi:image-outline',
  wrapperClasses = '',
  ...props
}: IProps): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined);

  const handleOnError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    if (e?.currentTarget?.src !== props.fallback) setOnErrorSrc(props.fallback);
  };

  return (
    <div className={`relative ${wrapperClasses}`}>
      {src && loading && (props.height || props.width) && (
        <Skeleton className={`h-[${props.height}px] w-[${props.width}px`} />
      )}
      {src ? (
        <NextImage
          {...props}
          src={onErrorSrc || src}
          alt={'Image' || alt}
          onLoad={() => !props.debug && setLoading(false)}
          onError={handleOnError}
        />
      ) : (
        <Icon
          icon={icon}
          width={props.width}
          height={props.height}
          color="#616161"
        />
      )}
    </div>
  );
};

export { Image };
