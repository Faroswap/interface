import Script from 'next/script';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src={
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        }
        async
        defer
      />
      {children}
    </>
  );
}
