import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        src={
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        }
      />
      {children}
    </>
  );
}
