import { useGetBannerBrandSite } from '@/hooks/useGetBannerBrandSite';
import { validUri } from '@/utils/url';
import clsx from 'clsx';

export function SwapBanner({ className }: { className?: string }) {
  const fetchBannerQuery = useGetBannerBrandSite({
    position: 'swap',
  });
  const [bannerData] = fetchBannerQuery.bannerList;
  const hasBanner = !!bannerData;
  const { url, title, describe, bannerImg } = bannerData || {};

  const isOuterLink = !!url && validUri(url);
  return (
    <a
      href={url}
      target={isOuterLink ? '_blank' : '_top'}
      rel={isOuterLink ? 'noopener noreferrer' : undefined}
      className={clsx(
        'relative flex flex-col justify-center pl-4 pr-[100px] py-[18px] bg-cover bg-right transition-all	text-[#1A1A1B] md:rounded-2xl leading-snug',
        hasBanner ? 'max-h-[200px] min-h-[70px]' : 'max-h-0',
        className,
      )}
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="text-sm font-bold max-md:max-w-[63vw]">{title}</div>
      <div className="flex items-center text-xs whitespace-pre-wrap">
        {describe}
      </div>
    </a>
  );
}
