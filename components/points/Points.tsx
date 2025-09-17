import { EmptyDataIcon, useMediaDevices } from '@dodoex/components';
import { Trans } from '@lingui/macro';
import Dialog from '../Dialog';
import Image from 'next/image';
import swapPointsImage from '@/assets/points/swap-points.png';
import clsx from 'clsx';
import React from 'react';

export function Point({ title }: { title: React.ReactNode }) {
  const { isMobile } = useMediaDevices();
  const [collapseList, setCollapseList] = React.useState(!isMobile);

  return (
    <>
      <div className="md:hidden h-[96px]" />
      <div className="md:hidden flex md:flex-row flex-col fixed bottom-0 left-0 right-0 w-full">
        <div className="flex flex-1 items-center justify-between bg-paper rounded-t-3xl p-5 relative z-10">
          <div className="flex">
            <div className="flex flex-col">
              <div className="text-xs font-semibold mb-2">{title}</div>
              <div className="text-2xl font-semibold">-</div>
            </div>
          </div>
          <button
            onClick={() => setCollapseList(true)}
            className="text-secondary"
          >
            <svg
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="1"
                width="39"
                height="39"
                rx="7.5"
                stroke="#454851"
                strokeOpacity="0.1"
              />
              <path
                d="M23 11.5L25.3 13.8L22.41 16.67L23.83 18.09L26.7 15.2L29 17.5V11.5H23ZM11 17.5L13.3 15.2L16.17 18.09L17.59 16.67L14.7 13.8L17 11.5H11V17.5ZM17 29.5L14.7 27.2L17.59 24.33L16.17 22.91L13.3 25.8L11 23.5V29.5H17ZM29 23.5L26.7 25.8L23.83 22.91L22.41 24.33L25.3 27.2L23 29.5H29V23.5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        {isMobile && (
          <PointListDialog
            open={collapseList}
            onClose={() => setCollapseList(false)}
            title={title}
          />
        )}
      </div>
      <div className="w-[375px] ml-3 md:flex flex-col hidden">
        <div className="flex bg-paper rounded-3xl p-5 mb-3">
          <div className="flex items-center mr-5">
            <Image
              src={swapPointsImage}
              alt="icon"
              width={swapPointsImage.width / 3}
              height={swapPointsImage.height / 3}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold mb-2">{title}</div>
            <div className="text-2xl font-semibold">-</div>
          </div>
        </div>
        <div className="flex bg-paper rounded-3xl flex-col">
          <div className="flex justify-between flex-1 p-5">
            <div className="text-lg font-semibold">History</div>
            <button
              className="text-secondary hover:text-primary"
              onClick={() => setCollapseList((prev) => !prev)}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(
                  'transition-all',
                  collapseList ? 'rotate-180' : '',
                )}
              >
                <path
                  d="M19 14.855L17.355 16.5L12 11.1567L6.645 16.5L5 14.855L12 7.855L19 14.855Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div
            className={clsx(
              'transition-all overflow-hidden',
              collapseList ? 'max-h-[9999px]' : 'max-h-0',
            )}
          >
            <PointList />
          </div>
        </div>
      </div>
    </>
  );
}

function PointListDialog({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
}) {
  return (
    <Dialog open={open}>
      <div className="bg-main">
        <div className="flex flex-1 items-center justify-between rounded-t-3xl p-5 relative z-10">
          <div className="flex">
            <div className="flex items-center mr-5">
              <Image
                src={swapPointsImage}
                alt="icon"
                width={swapPointsImage.width / 3}
                height={swapPointsImage.height / 3}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-xs font-semibold mb-2">{title}</div>
              <div className="text-2xl font-semibold">-</div>
            </div>
          </div>
          <button onClick={onClose} className="text-secondary">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39"
                height="39"
                rx="7.5"
                stroke="#454851"
                strokeOpacity="0.1"
              />
              <path
                d="M22.41 28.41L24.71 26.11L27.58 29L29 27.58L26.11 24.71L28.41 22.41L22.41 22.41L22.41 28.41Z"
                fill="currentColor"
              />
              <path
                d="M11.59 22.41L13.89 24.71L11 27.58L12.42 29L15.29 26.11L17.59 28.41L17.59 22.41L11.59 22.41Z"
                fill="currentColor"
              />
              <path
                d="M17.59 11.59L15.29 13.89L12.42 11L11 12.42L13.89 15.29L11.59 17.59H17.59V11.59Z"
                fill="currentColor"
              />
              <path
                d="M22.41 11.59L24.71 13.89L27.58 11L29 12.42L26.11 15.29L28.41 17.59H22.41V11.59Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="p-5 bg-paper text-lg font-semibold leading-[25px]">
          <Trans>History</Trans>
        </div>
        <PointList />
      </div>
    </Dialog>
  );
}

function PointList() {
  return (
    <>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px] bg-paperDarkContrast text-secondary">
        <div>Points</div>
        <div>Receive date</div>
      </div>
      <div className="flex justify-center items-center flex-col h-[320px] gap-3">
        <EmptyDataIcon
          sx={{
            width: 60,
            height: 60,
            borderRadius: 8,
          }}
        />
        <div className="text-secondary">
          <Trans>Coming Soon</Trans>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px] bg-paperDarkContrast text-secondary">
        <div>Points</div>
        <div>Receive date</div>
      </div>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
        <div>+50</div>
        <div>2022/07/01 17:19:39</div>
      </div>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
        <div>+50</div>
        <div>2022/07/01 17:19:39</div>
      </div>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
        <div>+50</div>
        <div>2022/07/01 17:19:39</div>
      </div>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
        <div>+50</div>
        <div>2022/07/01 17:19:39</div>
      </div>
      <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
        <div>+50</div>
        <div>2022/07/01 17:19:39</div>
      </div>
      <div className="border-t py-5 flex items-center justify-center text-secondary cursor-pointer hover:text-primary">
        <div className="mr-1">Load more</div>
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4248 6.04565L10.5082 5.12903L7.30001 8.3372L4.09185 5.12903L3.17523 6.04565L7.30002 10.1704L11.4248 6.04565Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </>
  );
}
