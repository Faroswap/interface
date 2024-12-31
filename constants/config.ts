import type { WidgetProps } from '@dodoex/widgets';

export const TITLE = '';
export const DESCRIPTION = '';

export const SINGLE_CHAIN_ID = 11155111;
export const SINGLE_CHAIN_NAME = '';
export const MESSAGE_SOURCE = '';
export const ERC20_DOMAIN = '';
export const LOGO_URL = `https://${ERC20_DOMAIN}favicon.svg`;
export const TWITTER_URL = '';
export const SAFE_URL = '';
export const SHOW_AIRDROP = false;

export const WIDGET_CURRENT_CONFIG = {
  supportAMMV2: true,
  supportAMMV3: true,
} as Partial<WidgetProps>;
