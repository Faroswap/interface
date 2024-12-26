import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SubmitTxTracking } from './types';

interface SubmitTxState {
  submitTxList: SubmitTxTracking[];
  addSubmitTx: (data: Omit<SubmitTxTracking, 'failedTime'>) => void;
  addSubmitTxFailed: (data: Omit<SubmitTxTracking, 'failedTime'>) => void;
  deleteSubmitTx: (data: Omit<SubmitTxTracking, 'failedTime'>) => void;
}

export const useSubmitTxStore = create<SubmitTxState>()(
  persist(
    (set) => ({
      submitTxList: [],
      addSubmitTx: (data) => {
        set((state) => {
          const index = state.submitTxList.findIndex(
            (item) => item.hash === data.hash && item.chainId === data.chainId,
          );
          if (index !== -1) return {};
          return {
            submitTxList: [
              ...state.submitTxList,
              {
                ...data,
                failedTime: 0,
              },
            ],
          };
        });
      },
      addSubmitTxFailed: (data) => {
        set((state) => {
          const newList = [...state.submitTxList];
          const index = newList.findIndex(
            (item) => item.hash === data.hash && item.chainId === data.chainId,
          );
          if (index === -1) return {};
          newList.splice(index, 1, {
            ...data,
            failedTime: new Date().getTime(),
          });
          return {
            submitTxList: newList,
          };
        });
      },
      deleteSubmitTx: (data) => {
        set((state) => {
          const newList = [...state.submitTxList];
          const index = newList.findIndex(
            (item) => item.hash === data.hash && item.chainId === data.chainId,
          );
          if (index === -1) return {};
          newList.splice(index, 1);
          return {
            submitTxList: newList,
          };
        });
      },
    }),
    {
      name: 'submit-tx-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        submitTxList: state.submitTxList,
      }),
    },
  ),
);
