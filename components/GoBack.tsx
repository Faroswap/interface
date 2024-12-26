'use client';
import { ArrowBack } from '@dodoex/icons';
import { Trans } from '@lingui/macro';
import { useRouter } from 'next/navigation';

export default function GoBack({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
        router.back();
      }}
      className="inline-flex items-center gap-[6px] text-secondary font-semibold hover:opacity-50"
    >
      <div className="w-6 h-6 flex items-center justify-center border rounded-full bg-paper">
        <ArrowBack />
      </div>
      <Trans>Go back</Trans>
    </button>
  );
}
