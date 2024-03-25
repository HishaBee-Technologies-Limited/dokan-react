'use client';
import Slider from 'react-slick';
import { Image } from '@/components/common/Image';
import { onboardBanners } from '@/config/onboardBanners';
import { PageTitle, Text } from '@/components/common/text';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 700,
  appendDots: (
    dots:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | ReactPortal
      | null
      | undefined
  ) => (
    <div>
      <ul className="absolute w-full flex gap-6 -left-1"> {dots} </ul>
    </div>
  ),
  customPaging: (i: any) => (
    <div className="__active bg-primary-100 opacity-30 h-space6 w-space32 rounded-md cursor-pointer"></div>
  ),
};

const Carousel = () => {
  return (
    <Slider {...settings}>
      {onboardBanners.map((item) => (
        <div key={item.id} className="space-y-space40">
          <Image
            alt={''}
            src={item.image}
            width={374}
            height={374}
            wrapperClasses="w-full rounded-lg "
          />

          <article className="space-y-space32">
            <PageTitle title={item.title} />

            <div className="flex gap-space24 flex-wrap">
              {item.features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-space12 max-w-max"
                >
                  <Image alt={''} width={28} height={28} src={feature.image} />
                  <Text title={feature.title} />
                </div>
              ))}
            </div>
          </article>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
