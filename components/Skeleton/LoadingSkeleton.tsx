import clsx from 'clsx';
import { forwardRef, PropsWithChildren, Ref } from 'react';

// eslint-disable-next-line react/display-name
const LoadingSkeleton = forwardRef(
  (
    {
      loading,
      loadingClassName,
      children,
      ...attrs
    }: PropsWithChildren<
      {
        loading?: boolean;
        loadingClassName?: string;
      } & React.HTMLAttributes<HTMLDivElement>
    >,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} {...attrs}>
        {loading ? (
          <div
            className={clsx(
              'animate-pulse bg-skeleton rounded-[4px] h-fit',
              loadingClassName,
            )}
          >
            <div className="invisible">1</div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  },
);

export default LoadingSkeleton;
