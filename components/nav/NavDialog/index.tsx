'use client';
import React from 'react';
import { DialogBase } from '@/components/Dialog';
import LeftNav from '../LeftNav';
import { palette } from '@/constants/theme';

export default function NavDialog() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const onClose = () => setOpen(false);

  return (
    <nav ref={rootRef}>
      <button onClick={() => setOpen(true)}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="8" fill={palette.primary.main} />
          <path
            d="M7 22V20H13V22H7ZM7 17V15H19V17H7ZM7 12V10H25V12H7Z"
            fill={palette.primary.contrastText}
          />
        </svg>
      </button>

      <DialogBase
        open={open}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        container={() => rootRef.current!}
        onClose={onClose}
        className="justify-end"
      >
        <div className="w-[225px]">
          <LeftNav onClose={onClose} />
        </div>
      </DialogBase>
    </nav>
  );
}
