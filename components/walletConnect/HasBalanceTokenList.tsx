import { useHasBalanceTokenList } from '@/hooks/useHasBalanceTokenList';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import { increaseArray } from '@/utils/utils';
import { EmptyDataIcon } from '@dodoex/components';
import {
  formatReadableNumber,
  formatShortNumber,
  getEtherscanPage,
} from '@dodoex/widgets';
import { Trans } from '@lingui/macro';
import { useRouter } from 'next/navigation';
import LoadingSkeleton from '../Skeleton/LoadingSkeleton';
import Tooltip from '../Tooltip';
import { ArrowTopRightBorder, Copy } from '@dodoex/icons';
import copy from 'copy-to-clipboard';
import TokenLogo from '../TokenLogo';

export default function HasBalanceTokenList({
  balanceListData,
}: {
  balanceListData: ReturnType<typeof useHasBalanceTokenList>;
}) {
  const router = useRouter();
  return (
    <div>
      {balanceListData.tokenLoading &&
        increaseArray(3).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-skeleton rounded-[4px] h-10 mx-5 my-4"
          />
        ))}
      {!balanceListData.tokenLoading &&
        !balanceListData.hasBalanceList.length && (
          <div className="flex flex-col items-center gap-3 mt-14 text-secondary">
            <EmptyDataIcon />
            <Trans>No tokens</Trans>
          </div>
        )}
      {balanceListData.hasBalanceList.map((token) => {
        return (
          <div
            key={token.address}
            className="flex justify-between items-center gap-3 px-5 py-4 cursor-pointer overflow-hidden hover:bg-hover [&:hover_.token-operate]:flex"
            onClick={() => {
              useGlobalStatus.setState({ openConnectWallet: false });
              const tokenText = `${token.chainId}-${token.symbol}`;
              router.push(`/swap/default/${tokenText}`);
            }}
          >
            <div className="flex items-center gap-3">
              <TokenLogo
                address={token.address}
                chainId={token.chainId}
                width={40}
                height={40}
              />
              <div>
                <div className="flex items-center gap-1">
                  {token.name}
                  <div className="flex md:none items-center gap-1 token-operate">
                    <Tooltip
                      onlyClick
                      arrow={false}
                      autoClose
                      title={<Trans>Copied</Trans>}
                    >
                      <Copy
                        className="w-[14px] h-[14px] cursor-pointer text-secondary hover:text-primary"
                        onClick={() => {
                          copy(token.address);
                        }}
                      />
                    </Tooltip>
                    <a
                      href={getEtherscanPage(token.chainId, token.address)}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex w-[14px] h-[14px] text-secondary hover:text-primary"
                      onClick={(evt) => {
                        evt.stopPropagation();
                      }}
                    >
                      <ArrowTopRightBorder className="w-[14px] h-[14px]" />
                    </a>
                  </div>
                </div>
                <div className="text-sm text-secondary">
                  {`${formatReadableNumber({ input: token.balance })} ${
                    token.symbol
                  }`}
                </div>
              </div>
            </div>
            <LoadingSkeleton
              loading={balanceListData.fiatPriceQuery.isLoading}
              loadingClassName="w-[100px]"
              // errorRefetch={
              //   balanceListData.fiatPriceQuery.isError
              //     ? balanceListData.fiatPriceQuery.refetch
              //     : undefined
              // }
              title={
                token.fiatPriceBalance
                  ? `$${formatReadableNumber({
                      input: token.fiatPriceBalance,
                    })}`
                  : undefined
              }
              className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold"
            >
              $
              {token.fiatPriceBalance
                ? formatShortNumber(token.fiatPriceBalance)
                : '-'}
            </LoadingSkeleton>
          </div>
        );
      })}
    </div>
  );
}
