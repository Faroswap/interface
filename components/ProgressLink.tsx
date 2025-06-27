'use client';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';
import NProgress from 'nprogress';

const ProgressLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & LinkProps
>(function ProgressLink({ onClick, ...rest }: LinkProps, ref) {
  return (
    <Link
      {...rest}
      prefetch={rest.prefetch ?? false}
      onClick={(evt) => {
        if (
          rest.href &&
          rest.href.toString().replace(window.location.origin, '') !==
            window.location.href.replace(window.location.origin, '')
        ) {
          NProgress.start();
        }
        if (onClick) {
          onClick(evt);
        }
      }}
      ref={ref}
    />
  );
});

ProgressLink.displayName = 'Link';

export default ProgressLink;
