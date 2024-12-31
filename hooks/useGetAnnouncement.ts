import { graphQLRequests } from '@/constants/api';
import { MESSAGE_SOURCE } from '@/constants/config';
import { graphql } from '@/gql';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';

const document = graphql(`
  query FetchBrandAnnouncementList($where: Brand_site_announcementqueryilter) {
    brand_site_announcement_list(where: $where) {
      list {
        id
        brand
        lastPublishTime
        sort
        title
        type
        url
        metadata {
          background
          buttonType
          icon
          theme
        }
      }
      lastPublishId
      lastPublishTime
    }
  }
`);

export enum AnnouncementType {
  Notification = 1,
  Alert,
}

interface AnnouncementList {
  lastPublishTime: string;
  list: {
    id: number;
    url: string;
    title: string;
    lastPublishTime: string;
    type: AnnouncementType;
    background: string;
    buttonType: 'icon' | 'text';
    theme: 'auto' | 'light' | 'dark';
    icon: string;
  }[];
}

const defaultResult: AnnouncementList = {
  list: [],
  lastPublishTime: '',
};

export function useGetAnnouncement({
  lang,
  lastPublishTime,
}: {
  lang: string;
  lastPublishTime?: string;
}) {
  // @ts-ignore
  const queryOptions = graphQLRequests.getQuery(document, {
    where: {
      brand: MESSAGE_SOURCE,
      lang,
      refreshNow: true,
    },
  });
  const fetchQuery = useQuery({
    ...queryOptions,
    enabled: !!lang && !!MESSAGE_SOURCE,
  });

  const announcementList = React.useMemo(() => {
    if (fetchQuery.data?.brand_site_announcement_list) {
      const { brand_site_announcement_list } = fetchQuery.data;
      if (lastPublishTime && brand_site_announcement_list.lastPublishTime) {
        if (
          new Date(lastPublishTime).getTime() -
            new Date(brand_site_announcement_list.lastPublishTime).getTime() >=
          0
        ) {
          return defaultResult;
        }
      }
      return {
        lastPublishTime: brand_site_announcement_list.lastPublishTime || '',
        list:
          brand_site_announcement_list.list?.map((item) => ({
            id: item?.id || 0,
            url: item?.url || '',
            title: item?.title || '',
            lastPublishTime: item?.lastPublishTime
              ? dayjs(item?.lastPublishTime).format('MM/DD')
              : '',
            type: item?.type as AnnouncementType,
            background: item?.metadata?.background || '',
            icon: item?.metadata?.icon || '',
            buttonType: (item?.metadata?.buttonType as 'icon') || 'icon',
            theme:
              (item?.metadata?.theme as 'auto' | 'light' | 'dark') || 'auto',
          })) || [],
      };
    }
    return defaultResult;
  }, [fetchQuery.data, lastPublishTime]);

  return {
    ...fetchQuery.data,
    announcementList,
  };
}
