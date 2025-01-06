import React from 'react';

const defaultParams = {
  waitTime: 4000,
  swipeTime: 250,
  direction: 'horizontal',
  isWrapperEqualWidth: false,
};

export function useSwiperAnimate(
  ref: React.RefObject<HTMLDivElement>,
  length: number,
  paramsProps?: {
    waitTime?: number;
    swipeTime?: number;
    direction?: 'horizontal' | 'vertical';
    isWrapperEqualWidth?: boolean;
  },
) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const params = React.useMemo(
    () => ({
      ...defaultParams,
      ...paramsProps,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(paramsProps ?? {})],
  );

  const slideTo = React.useCallback(
    (i: number) => {
      const { swipeTime, direction, isWrapperEqualWidth } = params;
      const isVertical = direction === 'vertical';
      let lastValue = '0%';
      if (activeIndex !== 0) {
        lastValue = isWrapperEqualWidth
          ? `-${activeIndex * 100}%`
          : `-${(activeIndex / (length * 2)) * 100}%`;
      }
      let value = isWrapperEqualWidth
        ? `-${i * 100}%`
        : `-${(i / (length * 2)) * 100}%`;
      if (i === 0) {
        value = isWrapperEqualWidth
          ? `-${length * 100}%`
          : `-${(length / (length * 2)) * 100}%`;
      }

      const frame = requestAnimationFrame(() => {
        ref.current?.animate(
          [
            {
              transform: `translate(${isVertical ? '0' : lastValue}, ${!isVertical ? '0' : lastValue})`,
            },
            {
              transform: `translate(${isVertical ? '0' : value}, ${!isVertical ? '0' : value})`,
            },
          ],
          {
            duration: swipeTime,
            iterations: 1,
            fill: 'forwards',
          },
        );
        setActiveIndex(i);
      });

      return () => cancelAnimationFrame(frame);
    },
    [params, ref, length, activeIndex],
  );

  React.useEffect(() => {
    let time = 0;
    const refCurrent = ref.current;
    if (refCurrent && length > 1) {
      const { waitTime } = params;
      time = window.setTimeout(() => {
        const newIndex = activeIndex + 1 < length ? activeIndex + 1 : 0;
        slideTo(newIndex);
      }, waitTime);
    }

    return () => clearTimeout(time);
  }, [ref, length, params, activeIndex, slideTo]);

  // React.useEffect(() => {
  //   const refCurrent = ref.current;

  //   if (refCurrent && length > 1) {
  //     const { waitTime, swipeTime, direction, isWrapperEqualWidth } = params;
  //     const isVertical = direction === 'vertical';
  //     const keyframes: Keyframe[] = [
  //       { transform: 'translate(0, 0)', offset: 0 },
  //     ];
  //     const time = length * waitTime + length * swipeTime;
  //     const split = length * 2;
  //     let addTime = 0;
  //     let addTranslateNum = 0;
  //     increaseArray(split).forEach((_, index) => {
  //       if (index && (index + 1) % 2 === 0) {
  //         addTime += swipeTime;
  //         addTranslateNum += 1;
  //       } else {
  //         addTime += waitTime;
  //       }
  //       const key = addTime / time;
  //       const value = isWrapperEqualWidth
  //         ? `-${addTranslateNum * 100}%`
  //         : `-${(addTranslateNum / (length * 2)) * 100}%`;
  //       keyframes.push({
  //         transform: `translate(${isVertical ? '0' : value}, ${!isVertical ? '0' : value})`,
  //         offset: key,
  //       });
  //     });
  //     animationRef.current = refCurrent?.animate(keyframes, {
  //       duration: time * 1000,
  //       iterations: Infinity,
  //     });
  //     const rect = refCurrent.getBoundingClientRect();
  //     initTop.current = rect.top;
  //     initLeft.current = rect.left;
  //   }
  // }, [ref, length, params]);

  return {
    activeIndex,
    slideTo,
  };
}
