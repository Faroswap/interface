import { API_DOMAIN } from '@/constants/url';
import { init, getAppToken } from '@dodoex/auth-web-sdk';

export { encryptFiatPriceToken } from '@dodoex/auth-web-sdk';

export const getClientAuth = async ({
  account,
  notCache,
}: {
  account: string | undefined;
  notCache?: boolean;
}) => {
  if (!account) {
    return null;
  }
  const isDev = API_DOMAIN !== 'dodoex.io';
  const url = isDev ? `https://api.${API_DOMAIN}/frontend-auth` : undefined;
  try {
    const appId = 'appId1';
    const chainId = 1;
    if (notCache) {
      // Request interface override cache
      await init(chainId, account, [appId], {
        url,
      });
    }
    const token = await getAppToken(appId, chainId, account, {
      url,
    });
    return token;
  } catch (error) {
    console.error(error);
  }
  return null;
};
