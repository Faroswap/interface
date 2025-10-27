/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export function init(
  chainId: number,
  distinctId: string,
  apps: string[],
  options: any,
) {
  Promise.resolve();
}

export function getAppToken(
  appId: string,
  chainId: number,
  distinctId: string,
  options: any,
) {
  return Promise.resolve('');
}

export function getRpcUrl() {
  return '';
}

export function encryptFiatPriceToken() {
  return '';
}

export function generateProxyUrl(params: any) {
  return params.url;
}
