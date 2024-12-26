import { Modal, ModalProps } from '@mui/base/Modal';
import { Error } from '@dodoex/icons';
import clsx from 'clsx';
import React from 'react';

export function DialogTitle({
  children,
  center,
  onClose,
}: React.PropsWithChildren<{
  center?: boolean;
  onClose?: () => void;
}>) {
  return (
    <div
      className={clsx('relative flex items-center p-5', {
        'justify-center': center,
      })}
    >
      <h5 className="text-xl font-semibold">{children}</h5>
      {!!onClose && (
        <button
          className="absolute top-5 right-5 text-secondary hover:text-primary"
          onClick={() => onClose()}
        >
          <Error className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx(
        { 'MuiBackdrop-open': open },
        'fixed -z-[1] inset-0 bg-backdrop',
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});
Backdrop.displayName = 'Backdrop';

export function DialogBase({ className, slots, ...props }: ModalProps) {
  return (
    <Modal
      className={clsx('fixed z-modal inset-0 flex', className)}
      slots={{
        backdrop: Backdrop,
        ...slots,
      }}
      {...props}
    />
  );
}

export default function Dialog({
  children,
  className,
  bodyClassName,
  slots,
  ...props
}: Omit<ModalProps, 'children'> & {
  children: React.ReactNode;
  bodyClassName?: string;
}) {
  return (
    <Modal
      className={clsx(
        'fixed z-modal inset-0 flex items-end md:items-center md:justify-center',
        className,
      )}
      slots={{
        backdrop: Backdrop,
        ...slots,
      }}
      {...props}
    >
      <div
        className={clsx(
          'flex flex-col bg-paper max-md:w-screen md:min-w-[420px] max-h-[80vh] rounded-t-md md:rounded-xl border-t overflow-y-auto',
          bodyClassName,
        )}
      >
        {children}
      </div>
    </Modal>
  );
}
