import type { WidgetProps } from '@dodoex/widgets';

export const TITLE = 'FaroSwap';
export const DESCRIPTION = '';

export const SINGLE_CHAIN_ID = 1672;
export const SINGLE_CHAIN_NAME = 'Pharos';
export const MESSAGE_SOURCE = 'pharos';
export const ERC20_DOMAIN = 'faroswap.xyz';
export const LOGO_URL = `https://${ERC20_DOMAIN}favicon.svg`;
export const TWITTER_NAME = 'FaroSwap';
export const TWITTER_URL = `https://x.com/${TWITTER_NAME}`;
export const COMMUNITY_URL = '';
export const TELEGRAM_URL = 'https://t.me/faroswapofficial';
export const DOCUMENT_URL = 'https://docs.faroswap.xyz';
export const PHAROS_TESTNET_URL = '';
export const DISCORD_URL = 'https://discord.gg/V3C2UYdKZd';
export const SAFE_URL = '';
export const SHOW_AIRDROP = false;

export const WIDGET_CURRENT_CONFIG = {
  supportAMMV2: true,
  supportAMMV3: true,
  disableConnectedProviderRead: true,
  lpFeeRewardActivity: {
    activity: 'pharos_amm_v3_lp_fee_reward',
    title: 'FBTC Liquidity Mining',
    description: 'Earn extra $PROS from Jul 01 to Jul 25.',
    rewardTokenSymbol: 'PROS',
    myRewardsTooltip: 'Rewards are distributed once a week on [X]. Any unclaimed rewards will be merged into the next distribution.',
    periodId: undefined,
  },
} as Partial<WidgetProps>;
