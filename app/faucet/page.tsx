'use client';
import FaucetIcon from '@/assets/nav/faucet.svg';
import WalletIcon from '@/assets/icons/wallet.svg';
import { Trans } from '@lingui/macro';
import { isAddress, useWalletStore } from '@dodoex/wallet-web3';
import React from 'react';
import { Button } from '@dodoex/components';
import LogoAndText from '@/assets/logo/logo-and-text.svg';
import clsx from 'clsx';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { useMutation } from '@tanstack/react-query';
import { ArrowTopRightBorderButton, Done } from '@dodoex/icons';
import { getEtherscanPage } from '@dodoex/widgets';
import { SINGLE_CHAIN_ID, TWITTER_NAME } from '@/constants/config';

export default function page() {
  const { account } = useWalletStore();
  const [address, setAddress] = React.useState(account);
  const changed = React.useRef(false);
  React.useEffect(() => {
    if (!changed.current && account && !address) {
      setAddress(account);
    }
  }, [account]);

  const isError = !!address && !isAddress(address);

  const { recaptchaContainer, renderRecaptcha, resetRecaptchElement } =
    useRecaptcha();
  const claimMutation = useMutation({
    mutationFn: async () => {
      window.open(`https://x.com/intent/user?screen_name=${TWITTER_NAME}`, '_blank', 'menubar=no,toolbar=no')
      resetRecaptchElement();
      const recaptcha = await renderRecaptcha();
      const response = await fetch(
        `https://api-staging.dxd.ink/gas-faucet-server/faucet/claim`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chainId: SINGLE_CHAIN_ID,
            address,
            recaptchaToken: recaptcha,
          }),
        },
      );

      const result = await response.json();

      if (result.code === 0) {
        return result.data as {
          txHash: string;
          amount: string;
          currency: string;
        };
      } else {
        throw new Error(result.msg);
      }
    },
  });

  return (
    <div className="pt-9 pb-5 md:w-[600px] md:mx-auto flex flex-col items-center">
      <h1 className="flex items-center gap-5 text-[40px] font-bold">
        <FaucetIcon className="relative top-[6px] w-10 h-10" />
        <div
          className="bg-clip-text leading-[55px]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #1A1A1B 51.44%, #326AFD 79.33%, #FEE94F 100%)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <Trans>{'$PHRS'} Faucet</Trans>
        </div>
      </h1>
      <div
        className="mt-7 p-1 rounded-3xl w-full"
        style={{
          backgroundImage: 'linear-gradient(90deg, #0f6BD1 -30%, #FEE94F)',
        }}
      >
        <div className="p-7 rounded-3xl bg-paper">
          <h5 className="text-lg font-bold">
            <Trans>Claim Pharos New Testnet Tokens:</Trans>
          </h5>
          <div
            className={clsx(
              'relative flex justify-between items-center border mt-3 px-4 py-2 rounded-lg bg-main',
              { 'border-[#FF6187]': isError },
            )}
          >
            <div className="flex items-center gap-2">
              <WalletIcon className="relative z-[1]" />
              <input
                className="absolute inset-0 px-12 rounded-lg"
                value={address}
                onChange={(evt) => {
                  changed.current = true;
                  const { value } = evt.target;
                  setAddress(value);
                }}
              />
            </div>
            <button
              className="relative z-[1] flex items-center justify-center p-1 rounded-full bg-paperDarkContrast text-secondary hover:text-primary"
              onClick={() => setAddress('')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8896 4.36345L9.25302 8L12.8896 11.6365L11.6774 12.8487L8.04084 9.21218L4.40429 12.8487L3.19211 11.6365L6.82866 8L3.19211 4.36345L4.40429 3.15127L8.04084 6.78782L11.6774 3.15127L12.8896 4.36345Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          {isError && (
            <div className="mt-2 text-sm text-[#ff6187]">
              <Trans>Invalid address. Please enter again.</Trans>
            </div>
          )}
          {claimMutation.isSuccess && (
            <div className="flex items-center gap-5 mt-2 px-5 py-3 rounded-lg bg-success/10 text-success text-sm">
              <Done />
              <div className="w-[1px] h-[46px] bg-border" />
              <div>
                <div className="font-semibold">
                  <Trans>Claim successful! 🎉 Tnx Hash:</Trans>
                </div>
                <a
                  className="mt-2 flex items-center gap-1"
                  href={getEtherscanPage(
                    SINGLE_CHAIN_ID,
                    claimMutation.data.txHash,
                    'tx',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="underline">{claimMutation.data.txHash}</span>
                  <ArrowTopRightBorderButton />
                </a>
              </div>
            </div>
          )}
          {claimMutation.isError && (
            <div className="mt-2 text-[#ff6187] text-sm">
              {claimMutation.error.message}
            </div>
          )}
          <div className="mt-2 text-sm text-secondary">
            <Trans>
              Maximum <span className="text-active">0.01 PHRS</span> every 12
              hours
            </Trans>
          </div>
          <div ref={recaptchaContainer} className="mt-3" />
          <Button
            size={Button.Size.big}
            fullWidth
            sx={{ mt: 20 }}
            isLoading={claimMutation.isPending}
            disabled={
              claimMutation.isError ||
              claimMutation.isError ||
              !address ||
              isError
            }
            onClick={() => {
              claimMutation.mutate();
            }}
          >
            {claimMutation.isPending ? (
              <Trans>Processing...</Trans>
            ) : claimMutation.isSuccess ? (
              <Trans>Claimed, try later</Trans>
            ) : claimMutation.isError ? (
              <Trans>Reached limit, try later</Trans>
            ) : (
              <Trans>
                Follow<b className="mx-1">FaroSwap</b>to claim
              </Trans>
            )}
          </Button>
          <a
            href=""
            rel="noopener"
            target="_blank"
            className="flex items-center w-max mt-6 mx-auto gap-1 text-sm text-active hover:opacity-70"
          >
            <Trans>Need more tokens</Trans>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1312 9L8.7 5.55L9.75 4.5L14.25 9L9.75 13.5L8.7 12.45L12.1312 9Z"
                fill="#326AFD"
                fillOpacity="0.5"
              />
              <path
                d="M7.18125 9L3.75 5.55L4.8 4.5L9.3 9L4.8 13.5L3.75 12.45L7.18125 9Z"
                fill="#326AFD"
              />
            </svg>
          </a>
        </div>
      </div>
      <footer className="flex items-center gap-2 mt-4 text-xs">
        <Trans>Powered By</Trans>
        <LogoAndText className="h-4 w-[92px]" />
      </footer>
    </div>
  );
}
