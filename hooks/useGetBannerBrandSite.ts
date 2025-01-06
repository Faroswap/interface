import { graphQLRequests } from '@/constants/api';
import { MESSAGE_SOURCE } from '@/constants/config';
import { graphql } from '@/gql';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const document = graphql(`
  query FetchBrandSiteBannerList($where: Brand_site_bannerqueryilter) {
    brand_site_banner_list(where: $where) {
      id
      title
      describe
      bannerImg
      url
    }
  }
`);

export function useGetBannerBrandSite({
  position,
}: {
  position: 'swap' | 'pool';
}) {
  // @ts-ignore
  const queryOptions = graphQLRequests.getQuery(document, {
    where: {
      brand: MESSAGE_SOURCE,
      position,
      refreshNow: true,
    },
  });
  const fetchQuery = useQuery({
    ...queryOptions,
    enabled: !!MESSAGE_SOURCE,
  });

  const bannerList = React.useMemo(() => {
    return (
      fetchQuery.data?.brand_site_banner_list?.map((item) => ({
        id: item?.id as number,
        title: item?.title ?? '',
        describe: item?.describe ?? '',
        bannerImg: item?.bannerImg ?? '',
        url: item?.url ?? '',
      })) ?? []
    );
  }, [fetchQuery.data]);

  return {
    ...fetchQuery.data,
    bannerList,
  };
}
