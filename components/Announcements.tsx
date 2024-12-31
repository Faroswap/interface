'use client';
import { useAnnouncementsAnimate } from '@/hooks/useAnnouncementsAnimate';
import {
  useGetAnnouncement,
  AnnouncementType,
} from '@/hooks/useGetAnnouncement';
import { generateProxyUrl } from '@/utils/imgProxy';
import { increaseArray } from '@/utils/utils';
import { useTheme } from '@dodoex/components';
import { ArrowBack, Error } from '@dodoex/icons';
import clsx from 'clsx';
import React from 'react';
import Tooltip from './Tooltip';
import { useGlobalStatus } from '@/utils/useGlobalStatus';

interface MessageItem {
  title: string;
  url: string;
  lastPublishTime: string;
  id: number;
  icon: string;
  background: string;
  type: AnnouncementType;
  buttonType?: 'icon' | 'text';
  theme: 'auto' | 'light' | 'dark';
}

export default function Announcements() {
  const { announcementReadTime, addAnnouncementReadTime } = useGlobalStatus();
  const lang = 'enUS';
  const lastPublishTime = announcementReadTime[lang];
  const { announcementList } = useGetAnnouncement({
    lang,
    lastPublishTime,
  });

  const currentLastPublishTime = announcementList.lastPublishTime;
  const messageListOrigin = announcementList.list;
  const messageList =
    typeof window === 'undefined' ||
    (lastPublishTime &&
      new Date(lastPublishTime).getTime() -
        new Date(currentLastPublishTime).getTime() >=
        0)
      ? []
      : messageListOrigin;
  const messageListLen = messageList.length;

  const handleClose = () => {
    addAnnouncementReadTime({
      lang,
      lastPublishTime: currentLastPublishTime,
    });
  };

  return (
    <div
      className={clsx(
        messageListLen ? 'h-10 md:h-12' : 'opacity-0 h-0',
        'transition-height delay-600',
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between overflow-hidden bg-paper',
          messageListLen ? 'h-full' : 'h-0',
        )}
      >
        <Scroll messageList={messageList} handleClose={handleClose}>
          {messageList.map((msg) => (
            <AnnouncementsItem
              key={msg.id}
              msg={msg}
              lang={lang}
              className="w-full"
            />
          ))}
        </Scroll>
      </div>
    </div>
  );
}

function Scroll({
  messageList,
  children,
  handleClose,
}: React.PropsWithChildren<{
  messageList: MessageItem[];
  handleClose: () => void;
}>) {
  const len = messageList.length;
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const activeIndex = useAnnouncementsAnimate(scrollRef, len);

  const activeMessage = messageList[activeIndex];
  let activeColorClass = 'text-primary';
  let secondaryColorClass = 'text-secondary';
  const isContrastTheme =
    activeMessage?.theme !== 'auto' &&
    activeMessage?.theme !== theme.palette.mode;
  if (isContrastTheme) {
    activeColorClass = 'text.contrastText';
    secondaryColorClass = 'text.contrastText/50';
  }

  return (
    <div className="overflow-hidden flex-1 h-10 md:h-12 relative">
      {len > 1 ? (
        <div
          className={clsx(
            'absolute left-7 z-10',
            len === 2 ? 'top-[14px] md:top-[17px]' : 'top-[10px] md:top-3',
          )}
        >
          {increaseArray(len).map((item, i) => {
            let bgClass = isContrastTheme ? 'bg-contrastText/30' : 'bg-text/30';
            if (i === activeIndex) {
              bgClass = isContrastTheme ? 'bg-contrastText' : 'bg-text';
            }
            return (
              <div
                key={item}
                className={clsx(
                  'w-1 h-1 rounded-full [&:not(:first-child)]:mt-1 md:[&:not(:first-child)]:mt-[6px]',
                  bgClass,
                )}
              />
            );
          })}
        </div>
      ) : (
        ''
      )}
      <div className="flex flex-col" ref={scrollRef}>
        {children}
        {children}
      </div>
      <Error
        onClick={handleClose}
        className={clsx(
          'absolute top-[13px] md:top-3 right-4 md:right-[46px] w-4 md:w-6 h-4 md:h-6 cursor-pointer',
          secondaryColorClass,
          'hover:' + activeColorClass,
        )}
      />
    </div>
  );
}

function AnnouncementsItem({
  msg,
  className,
  lang,
}: {
  msg: MessageItem;
  className?: string;
  lang: string;
}) {
  const theme = useTheme();
  const colorClass =
    msg.theme !== 'auto' && msg.theme !== theme.palette.mode
      ? 'text-contrastText'
      : 'text-primary';

  const iconUrl = msg.icon
    ? generateProxyUrl({
        url: msg.icon,
      })
    : '';

  return (
    <a
      href={msg.url || undefined}
      target={msg.url ? '_blank' : undefined}
      onClick={(evt) => {
        if (!msg.url) {
          evt.stopPropagation();
        }
        useGlobalStatus.getState().addAnnouncementReadTime({
          lastPublishTime: msg.lastPublishTime,
          lang,
        });
      }}
      className={clsx(
        'flex justify-start md:justify-center items-center pl-7 md:pl-[44px] pr-[46px] md:pr-[98px] h-10 md:h-12 font-semibold bg-no-repeat bg-cover text-xs md:text-base',
        colorClass,
        msg.type === AnnouncementType.Alert
          ? 'bg-error/10'
          : 'bg-paperDarkContrast',
        className,
      )}
      style={{
        backgroundImage: `url(${msg.background})`,
      }}
    >
      {iconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconUrl} className="mr-2 md:mr-7 max-h-full" alt="icon" />
      ) : (
        ''
      )}
      <AnnouncementsItemText msg={msg} />
      {!msg.url ? (
        ''
      ) : (
        <button
          className={clsx(
            'hidden md:flex items-center justify-center ml-7 px-3 h-[26px] text-sm bg-[#EB8D27] text-white rounded-[28px]',
          )}
        >
          <ArrowBack className="w-[18px] h-[18px] rotate-180" />
        </button>
      )}
    </a>
  );
}

function AnnouncementsItemText({ msg }: { msg: MessageItem }) {
  const lastPublishTime = msg.lastPublishTime ? `(${msg.lastPublishTime})` : '';

  return (
    <Tooltip title={`${msg.title}${lastPublishTime}`} arrow maxWidth={240}>
      <div className="max-w-full line-clamp-2">
        <span
          className="truncate [&>.link-text]:text-primary"
          dangerouslySetInnerHTML={{
            __html: msg.title,
          }}
        />
        {lastPublishTime}
        <span className="md:hidden">{' >'}</span>
      </div>
    </Tooltip>
  );
}
