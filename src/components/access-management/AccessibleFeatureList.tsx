import React from 'react';
import AccessTitle from '@/components/access-management/AccessTitle';
import FeatureImageTitle from '@/components/access-management/FeatureImageTitle';

const AccessibleFeatureList = () => {
  return (
    <div>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className={`px-space8 py-space12 `}
            // ${idx === lastItem ? '' : 'border-b border-primary-20'}
          >
            <FeatureImageTitle
              image={''}
              title={'item.name'}
              active={true}
              showActivity={true}
            />
            <div className="pl-[4.8rem] flex gap-space12 flex-wrap">
              <AccessTitle active={true} title={'jjjjj'} />
            </div>
            kkkkk
          </div>
        ))}
      <FeatureImageTitle
        image={''}
        title={'item.name'}
        active={false}
        showActivity={true}
      />
      <AccessTitle active={true} title={'jjjjj'} />
    </div>
  );
};

export default AccessibleFeatureList;
