import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalStatusState {
  errorMessage: {
    title?: string;
    message: string;
  } | null;
  openConnectWallet: boolean;
  announcementReadTime: {
    [lastPublishTime: string]: string;
  };

  setErrorMessage: (errorMessage: GlobalStatusState['errorMessage']) => void;
  addAnnouncementReadTime: (params: {
    lastPublishTime: string;
    lang: string;
  }) => void;
}

export const useGlobalStatus = create<GlobalStatusState>()(
  persist(
    (set) => ({
      errorMessage: null,
      openConnectWallet: false,
      announcementReadTime: {},
      setErrorMessage: (errorMessage) => {
        set({ errorMessage });
      },
      addAnnouncementReadTime: ({ lang, lastPublishTime }) => {
        set((state) => {
          return {
            announcementReadTime: {
              ...state.addAnnouncementReadTime,
              [lang]: lastPublishTime,
            },
          };
        });
      },
    }),
    {
      name: 'global-status-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        announcementReadTime: state.announcementReadTime,
      }),
    },
  ),
);
