import SwapWidget from '@/components/SwapWidget';
import WidgetServer from '@/components/WidgetServer';
import { fetchTokenList } from '@/constants/apiServer';
import { TokenInfo } from '@dodoex/widgets';

export default async function Page({
  params,
}: {
  params?: {
    from: string;
    to: string;
  };
}) {
  const { from, to } = params || {};
  let defaultFromToken: TokenInfo | undefined;
  let defaultToToken: TokenInfo | undefined;
  const { tokenList } = await fetchTokenList();
  if (from && from !== 'default') {
    const paramsArray = from.split('-');
    const chainId = Number(paramsArray[0]);
    const symbol = paramsArray[1];
    if (chainId && symbol) {
      defaultFromToken = tokenList?.find(
        (item) => item.chainId === chainId && item.symbol === symbol,
      );
    }
  }
  if (to && to !== 'default') {
    const paramsArray = to.split('-');
    const chainId = Number(paramsArray[0]);
    const symbol = paramsArray[1];
    if (chainId && symbol) {
      defaultToToken = tokenList?.find(
        (item) => item.chainId === chainId && item.symbol === symbol,
      );
    }
  }

  return (
    <WidgetServer
      defaultFromToken={defaultFromToken}
      defaultToToken={defaultToToken}
    >
      <SwapWidget />
    </WidgetServer>
  );
}
