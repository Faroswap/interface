import type { WidgetProps } from '@dodoex/widgets';

export const TITLE = 'FaroSwap';
export const DESCRIPTION = '';

export const SINGLE_CHAIN_ID = 688688;
export const SINGLE_CHAIN_NAME = 'Pharos';
export const MESSAGE_SOURCE = 'pharos';
export const ERC20_DOMAIN = 'faroswap.xyz';
export const LOGO_URL = `https://${ERC20_DOMAIN}favicon.svg`;
export const TWITTER_URL = 'https://x.com/FaroSwap';
export const COMMUNITY_URL = '';
export const DOCUMENT_URL = '';
export const SAFE_URL = '';
export const SHOW_AIRDROP = false;

export const WIDGET_CURRENT_CONFIG = {
  supportAMMV2: true,
  supportAMMV3: true,
} as Partial<WidgetProps>;
