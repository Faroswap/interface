import 'server-only';

import linguiConfig from '../../lingui.config';
import { I18n, Messages, setupI18n } from '@lingui/core';

const { locales } = linguiConfig;
type SupportedLocales = string;

async function loadCatalog(locale: SupportedLocales): Promise<{
  [k: string]: Messages;
}> {
  const { messages } = await import(`../../locales/${locale}.po`);
  return {
    [locale]: messages,
  };
}

type AllI18nInstances = { [K in SupportedLocales]: I18n };

export const getI18nInstance = async (
  locale: SupportedLocales,
): Promise<I18n> => {
  const catalogs = await Promise.all(locales.map(loadCatalog));

  // transform array of catalogs into a single object
  const allMessages = catalogs.reduce((acc, oneCatalog) => {
    return { ...acc, ...oneCatalog };
  }, {});
  const allI18nInstances: AllI18nInstances = locales.reduce((acc, locale) => {
    const messages = allMessages[locale] ?? {};
    const i18n = setupI18n({
      locale,
      messages: { [locale]: messages },
    });
    return { ...acc, [locale]: i18n };
  }, {});
  if (!allI18nInstances[locale]) {
    console.warn(`No i18n instance found for locale "${locale}"`);
  }
  return allI18nInstances[locale]! || allI18nInstances['en']!;
};
