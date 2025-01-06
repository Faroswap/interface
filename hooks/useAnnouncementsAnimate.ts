import { increaseArray } from '@/utils/utils';
import React from 'react';

export function useAnnouncementsAnimate(
  ref: React.RefObject<HTMLDivElement>,
  length: number,
) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const animationRef = React.useRef<Animation>();

  React.useEffect(() => {
    const refCurrent = ref.current;

    if (refCurrent && length > 1) {
      const waitTime = 4;
      const sliderTime = 0.25;
      const keyframes: Keyframe[] = [
        { transform: 'translate(0, 0)', offset: 0 },
      ];
      const time = length * waitTime + length * sliderTime;
      const split = length * 2;
      let addTime = 0;
      let addTranslateNum = 0;
      increaseArray(split).forEach((_, index) => {
        if (index && (index + 1) % 2 === 0) {
          addTime += sliderTime;
          addTranslateNum += 1;
        } else {
          addTime += waitTime;
        }
        const key = addTime / time;
        const value = `-${(addTranslateNum / (length * 2)) * 100}%`;
        keyframes.push({ transform: `translate(0, ${value})`, offset: key });
      });
      animationRef.current = refCurrent?.animate(keyframes, {
        duration: time * 1000,
        iterations: Infinity,
      });
    }
  }, [ref, length]);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver(() => {
      const children = ref.current?.children;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.getBoundingClientRect().top === 0) {
            setActiveIndex(Number((child as HTMLElement).dataset.index));
          }
        }
      }
    });

    if (ref.current?.hasChildNodes() && length > 1) {
      const maxIndex = length - 1;
      const children = ref.current.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const index = i > maxIndex ? i - maxIndex - 1 : i;
        (child as HTMLElement).dataset.index = String(index);
        intersectionObserver.observe(child);
      }
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [ref, length]);

  return activeIndex;
}
