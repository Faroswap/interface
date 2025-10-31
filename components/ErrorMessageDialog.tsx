'use client';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import Dialog from './Dialog';
import { Error } from '@dodoex/icons';
import { Trans } from '@lingui/macro';

export default function ErrorMessageDialog() {
  const { errorMessage, setErrorMessage } = useGlobalStatus();
  return (
    <Dialog
      open={!!errorMessage}
      onClose={() => setErrorMessage(null)}
      bodyClassName="md:w-[340px] md:min-w-[340px]"
    >
      <div className="flex flex-col items-center justify-center pt-7 pb-5 px-5 text-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full text-error border-[3px] border-current">
          <Error className="w-6 h-6" />
        </div>
        <div className="mt-5 font-semibold">{errorMessage?.title}</div>
        <div className="mt-2 text-sm text-secondary">
          {errorMessage?.message}
        </div>
        <button
          onClick={() => setErrorMessage(null)}
          className="mt-6 h-12 flex items-center justify-center w-full text-active border border-current rounded-lg font-semibold gap-1 disabled:text-disabled"
        >
          <Trans>Close</Trans>
        </button>
      </div>
    </Dialog>
  );
}
