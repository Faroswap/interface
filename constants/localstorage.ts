const TOKEN_FIAT_PRICE_LIST = 'DODO_WIDGET_TOKEN_FIAT_PRICE_LIST';
interface FiatPriceCacheList {
  [k: string]: number;
}
export function setTokenFiatPriceList(value: FiatPriceCacheList) {
  const oldList = getTokenFiatPriceList();
  const newList = {
    ...oldList,
    ...value,
  };
  localStorage.setItem(TOKEN_FIAT_PRICE_LIST, JSON.stringify(newList));
}
export function getTokenFiatPriceList(): FiatPriceCacheList {
  const storage = localStorage.getItem(TOKEN_FIAT_PRICE_LIST);
  try {
    if (!storage) return {};
    return JSON.parse(storage);
  } catch (e) {
    console.error(e);
    return {};
  }
}
