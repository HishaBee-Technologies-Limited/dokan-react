import React from 'react';
import Icon from '@/components/common/Icon';
import { Image } from '@/components/common/Image';

type IProps = {
  image: string;
  title: string;
  active?: boolean;
  showActivity?: boolean;
};

const FeatureImageTitle = ({ image, title, active, showActivity }: IProps) => {
  return (
    <div className="flex justify-between items-center gap-space16 flex-wrap">
      <div className="flex items-center gap-space6">
        <div className="h-[4rem] w-[4rem] rounded-xl">
          <Image src={image} alt="" height={36} width={36} />
        </div>

        <p className="text-md text-500 font-semibold">{title}</p>
      </div>

      {showActivity &&
        (active ? (
          <span
            className={`h-[1.4rem] w-[1.4rem] flex items-center justify-center rounded-full text-0 bg-success-100`}
          >
            <Icon icon="mingcute:check-fill" width={9} height={9} />
          </span>
        ) : (
          <p className="text-error-100 text-sm font-medium">{'no_access'}</p>
        ))}
    </div>
  );
};

export default FeatureImageTitle;
