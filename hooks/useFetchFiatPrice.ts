import { tokenApi } from '@/constants/api';
import { setTokenFiatPriceList } from '@/constants/localstorage';
import { encryptFiatPriceToken } from '@/utils/auth';
import { TokenInfo } from '@dodoex/widgets';
import { useQuery } from '@tanstack/react-query';

export function useFetchFiatPrice(tokens: TokenInfo[]) {
  return useQuery({
    enabled: !!tokens.length,
    queryKey: ['fetch', 'fetchFiatPrice', tokens],
    queryFn: async () => {
      const token = encryptFiatPriceToken();
      const { result } = await tokenApi.getFiatPriceBatch(tokens, token);
      const resultMap = new Map<string, number>();
      if (result.data) {
        result.data.forEach((item: { price: string; address: string }) => {
          const tokenUSD = Number(item.price);
          if (!Number.isNaN(tokenUSD) && tokenUSD > 0) {
            resultMap.set(item.address, tokenUSD);
          }
        });
        setTokenFiatPriceList(Object.fromEntries(resultMap.entries()));
      }
      return resultMap;
    },
  });
}
