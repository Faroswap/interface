'use client';
import PoolBanner from '@/components/banner/PoolBanner';
import Widget from '@/components/Widget';
import { PoolList } from '@dodoex/widgets';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function PoolPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? undefined;
  const poolAddress = searchParams.get('address') ?? undefined;

  const handlePoolAddressChange = React.useCallback(
    (address?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (address) {
        params.set('address', address);
      } else {
        params.delete('address');
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const scrollRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="pb-10 overflow-y-auto h-full flex flex-col [&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:p-0 md:[&_.widget-module-container]:px-5 max-md:[&_.widget-module-container]:h-max  [&_.widget-module-container]:overflow-visible md:[&_.widget-module-container]:max-h-full"
      ref={scrollRef}
    >
      <PoolBanner />
      <Widget>
        <PoolList
          scrollRef={scrollRef}
          params={
            tab
              ? {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tab: tab as any,
                }
              : undefined
          }
          poolAddress={poolAddress}
          onPoolAddressChange={handlePoolAddressChange}
        />
      </Widget>
    </div>
  );
}
