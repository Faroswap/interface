/* eslint-disable @next/next/no-img-element */
import { useGetBannerBrandSite } from '@/hooks/useGetBannerBrandSite';
import { useSwiperAnimate } from '@/hooks/useSwiperAnimate';
import { validUri } from '@/utils/url';
import { increaseArray } from '@/utils/utils';
import { Article } from '@dodoex/icons';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';

export default function PoolBanner() {
  const fetchBannerQuery = useGetBannerBrandSite({
    position: 'pool',
  });
  // const bannerDataList = [
  //   {
  //     title: 'Tittle Tittle Tittle Tittle Tittle Tittle 2',
  //     describe:
  //       'Description Description Description Description Description Description Description Description Description Description2',
  //     bannerImg:
  //       'https://images.dodoex.io/vsyYicP0GKRtqu7tRvMWgKBYqxdv199K67n7d-aNzeo/g:no/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2RvZG8tbWVkaWEtc3RhZ2luZy9kZXYvdXBsb2FkX2ltZ181MjE5OTM0XzIwMjQxMjMwMDM0NDE4NjE4LnN2Zw.svg',
  //     url: 'https://google.com',
  //   },
  //   {
  //     title: 'Tittle T',
  //     describe:
  //       'Description Description Description Description Description Description Description Description Description Description',
  //     bannerImg:
  //       'https://images.dodoex.io/vsyYicP0GKRtqu7tRvMWgKBYqxdv199K67n7d-aNzeo/g:no/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2RvZG8tbWVkaWEtc3RhZ2luZy9kZXYvdXBsb2FkX2ltZ181MjE5OTM0XzIwMjQxMjMwMDM0NDE4NjE4LnN2Zw.svg',
  //     url: 'https://google.com',
  //   },
  //   {
  //     title: '333',
  //     describe:
  //       'Description Description Description Description Description Description Description Description Description Description',
  //     bannerImg:
  //       'https://images.dodoex.io/vsyYicP0GKRtqu7tRvMWgKBYqxdv199K67n7d-aNzeo/g:no/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2RvZG8tbWVkaWEtc3RhZ2luZy9kZXYvdXBsb2FkX2ltZ181MjE5OTM0XzIwMjQxMjMwMDM0NDE4NjE4LnN2Zw.svg',
  //     url: 'https://google.com',
  //   },
  // ];
  const bannerDataList = fetchBannerQuery.bannerList;
  const length = bannerDataList.length;
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { activeIndex, slideTo } = useSwiperAnimate(scrollRef, length, {
    isWrapperEqualWidth: true,
  });

  return (
    <div className="relative overflow-hidden max-md:pb-4 max-md:border-b">
      <Scroll ref={scrollRef}>
        {bannerDataList.map((item) => {
          const isOuterLink = !!item.url && validUri(item.url);
          return (
            <div
              key={item.title}
              className="flex-shrink-0 px-5 md:px-10 w-full leading-tight overflow-hidden"
            >
              <div className="flex justify-between max-md:flex-col-reverse max-md:items-center gap-4 md:gap-11 pt-5 pb-4 md:py-7 md:border-b">
                <div
                  className={clsx(
                    'flex flex-col gap-2 max-md:items-center',
                    item.url ? 'justify-between' : 'justify-center',
                  )}
                >
                  <div className="flex flex-col gap-2 max-md:text-center">
                    <h5 className="text-[28px] md:text-[40px] font-semibold">
                      {item.title}
                    </h5>
                    <div className="max-md:text-sm font-semibold whitespace-pre-wrap">
                      {item.describe}
                    </div>
                  </div>
                  {!!item.url && (
                    <a
                      className="flex items-center gap-2 relative text-xs font-semibold w-max hover:opacity-50"
                      href={item.url}
                      target={isOuterLink ? '_blank' : '_top'}
                      rel={isOuterLink ? 'noopener noreferrer' : undefined}
                    >
                      <Article />
                      <Trans>View More Details</Trans>
                      <svg
                        width="22"
                        height="2"
                        viewBox="0 0 22 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-[32px]"
                      >
                        <rect
                          opacity="0.5"
                          y="0.5"
                          width="22"
                          height="1.5"
                          rx="0.75"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  )}
                </div>
                <img
                  src={item.bannerImg}
                  alt="image"
                  className="h-12 md:h-[200px]"
                />
              </div>
            </div>
          );
        })}
      </Scroll>
      <SwiperPagination
        length={length}
        activeIndex={activeIndex}
        className="md:absolute md:bottom-7 md:right-10 md:-translate-y-full max-md:mx-auto w-max"
        slideTo={slideTo}
      />
    </div>
  );
}

const Scroll = React.forwardRef(function Scroll(
  { children }: React.PropsWithChildren,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className="flex">
      {children}
      {children}
    </div>
  );
});

function SwiperPagination({
  length,
  activeIndex,
  className,
  slideTo,
}: {
  length: number;
  activeIndex: number;
  className?: string;
  slideTo: (i: number) => void;
}) {
  if (length <= 1) return null;
  return (
    <>
      <div className={clsx('flex gap-2 items-center', className)}>
        {increaseArray(length).map((_, i) => {
          let width = '0%';
          if (activeIndex >= i) {
            width = '100%';
          }
          return (
            <div
              key={i}
              className="relative rounded-sm w-8 h-1 flex-shrink-0 bg-text/30 overflow-hidden cursor-pointer"
              onClick={() => slideTo(i)}
            >
              {i === 0 ? (
                <PaginationProgress
                  className="absolute inset-0 bg-text transition-width"
                  width={width}
                  full={activeIndex > 0}
                />
              ) : (
                <div
                  className={clsx('absolute inset-0 bg-text transition-width', {
                    'duration-[4000ms]': activeIndex === i,
                  })}
                  style={{
                    width,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function PaginationProgress({
  className,
  width: widthProps,
  full,
}: {
  className?: string;
  width?: string;
  full?: boolean;
}) {
  const [width, setWidth] = React.useState('0%');

  React.useEffect(() => {
    if (full) {
      setWidth('0%');
    } else if (widthProps) {
      setTimeout(() => {
        setWidth(widthProps);
      }, 100);
    }
  }, [full, widthProps]);
  return (
    <>
      <div
        className={clsx(className, { hidden: !full })}
        style={{
          width: '100%',
        }}
      />
      <div
        className={clsx(className, 'duration-[4000ms]', { hidden: full })}
        style={{
          width,
        }}
      />
    </>
  );
}
