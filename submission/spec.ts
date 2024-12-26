/**
 * Let's pretend that typescript has ADT
 */

import { BigNumber } from 'bignumber.js';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';

/**
 * All supported opcodes, as tagged union discriminants
 */
export enum OpCode {
  Approval = 'APPROVAL',
  TX = 'TX',
}

export type TokenData = {
  address: string;
};

export type ApprovalStep = {
  opcode: OpCode.Approval;

  /**
   * The address of the token
   */
  token: TokenData;

  /**
   * The approved contract address
   */
  contract: string;

  /**
   * The amount to set the allowance to, in Wei, in base-10. If omitted, a (very) big constants is used
   * TODO(meow): bigint shows a 87% support rate. Can we use it here?
   */
  amt?: BigNumber;
};

export type TXStep = {
  opcode: OpCode.TX;

  value: number | string;
  to: string;
  data: string;

  gasLimit?: EthersBigNumber;
  gasPrice?: number;
  ddlSecRel?: number;
};

export type Step = ApprovalStep | TXStep;
export type Steps = Step[];
