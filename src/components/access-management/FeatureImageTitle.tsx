import React from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
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

        <Text title={title} className="font-semibold" />
      </div>

      {showActivity &&
        (active ? (
          <span
            className={`h-[1.6rem] w-[1.6rem] flex items-center justify-center rounded-sm text-white bg-success-100`}
          >
            <Icon icon="mingcute:check-fill" width={12} height={12} />
          </span>
        ) : (
          <Text
            variant="error"
            title={'no access'}
            className="font-medium text-sm"
          />
        ))}
    </div>
  );
};

export default FeatureImageTitle;
