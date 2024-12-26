'use client';
import { useNProgress } from '@/hooks/useNProgress';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/constants/api';
import { useInitMessageClient } from '@/hooks/messageClient/useInitMessageClient';
import { createTheme, CssBaseline, ThemeProvider } from '@dodoex/components';
import { palette } from '@/constants/theme';
import { manropeFont } from '@/utils/fonts';
import { useSubscribeGraphql } from '@/hooks/messageClient/useSubscribeGraphql';
import { useSubmitUserTxTrackingRetry } from '@/submission/submitTx/useSubmitUserTxTrackingRetry';
import { useInitContractRequest } from '@/hooks/useInitContractRequest';

function QueryClientAfterProvider({ children }: React.PropsWithChildren) {
  useSubscribeGraphql();

  return children;
}

export default function ClientProvider({ children }: React.PropsWithChildren) {
  useNProgress();
  useInitMessageClient();
  useSubmitUserTxTrackingRetry();
  useInitContractRequest();
  const theme = createTheme({
    mode: 'light',
    lang: 'en',
    theme: {
      palette,
      typography: {
        fontFamily: manropeFont.style.fontFamily,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <QueryClientAfterProvider>{children}</QueryClientAfterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
