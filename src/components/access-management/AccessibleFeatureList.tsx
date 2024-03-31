import React from 'react';
import AccessTitle from '@/components/access-management/AccessTitle';
import FeatureImageTitle from '@/components/access-management/FeatureImageTitle';

const AccessibleFeatureList = () => {
  return (
    <div>
      {Array()
        .fill(6)
        .map((item, idx) => (
          <div
            key={idx}
            className={`px-space16 py-space12 `}
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
