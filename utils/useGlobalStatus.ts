import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalStatusState {
  openConnectWallet: boolean;
  showFollowX: boolean;
  announcementReadTime: {
    [lastPublishTime: string]: string;
  };

  addAnnouncementReadTime: (params: {
    lastPublishTime: string;
    lang: string;
  }) => void;
}

export const useGlobalStatus = create<GlobalStatusState>()(
  persist(
    (set) => ({
      openConnectWallet: false,
      announcementReadTime: {},
      showFollowX: true,
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
