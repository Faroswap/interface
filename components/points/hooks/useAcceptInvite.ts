/* eslint-disable @typescript-eslint/no-explicit-any */
import { graphQLRequests } from '@/constants/api';
import { ERC20_DOMAIN, SINGLE_CHAIN_ID } from '@/constants/config';
import { graphql } from '@/gql';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import { personalSign } from '@dodoex/wallet-web3';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';

const document = graphql(`
  query AcceptInvite($data: Points_activityinviteAcceptFilter!) {
    points_activity_inviteAccept(data: $data) {
      success
      inviterAddress
    }
  }
`);

export function useAcceptInvite() {
  const acceptInviteMutation = useMutation({
    mutationFn: async ({
      account,
      inviteCode,
    }: {
      account: string;
      inviteCode: string;
    }) => {
      const timestamp = Math.floor(new Date().getTime() / 1000);
      const message = `domain:${ERC20_DOMAIN}\nchainId:${SINGLE_CHAIN_ID}\ninviteCode:${inviteCode}\ntimestamp:${timestamp}`;
      let signature = '';
      try {
        // signature maybe cancel or fail
        signature = await personalSign(message, account);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error({ e });
        if (e.message) {
          if (e.code === 4001 || e.message.indexOf('user rejected') > -1) {
            throw new Error('User denied transaction signature.');
          } else {
            throw new Error(`Signature error: ${e.message}`);
          }
        }
      }
      try {
        const result = await graphQLRequests.getData<any>(document.toString(), {
          data: {
            user: account,
            domain: ERC20_DOMAIN,
            chainId: SINGLE_CHAIN_ID,
            inviteCode,
            message,
            signature,
            timestamp,
          },
        });
        return result;
      } catch (error: any) {
        const errorMessage =
          error.response?.errors?.[0]?.message ?? error.message;
        if (errorMessage) {
          useGlobalStatus.getState().setErrorMessage({
            title: t`Failed to accept invitation`,
            message: errorMessage,
          });
          return null;
        }
        throw error;
      }
    },
  });
  return acceptInviteMutation;
}
