export interface SubmitTxTracking {
  key?: string;
  hash: string;
  chainId: number;
  from: string;
  to?: string;
  nonce?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: any;
  failedTime: number;
}
