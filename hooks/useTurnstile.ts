import { useRef } from 'react';

const turnstileElementId = 'turnstile-widget';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
      ready: (cb: () => void) => void;
    };
  }
}

export const useTurnstile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderTurnstile = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
      if (!turnstileSiteKey) {
        reject(new Error('Cloudflare Turnstile Site Key is not set'));
        return;
      }

      const ensureMountPoint = () => {
        const existing = document.getElementById(turnstileElementId);
        if (!existing && containerRef.current) {
          const mountPoint = document.createElement('div');
          mountPoint.setAttribute('id', turnstileElementId);
          containerRef.current.appendChild(mountPoint);
        }
      };

      const renderWidget = () => {
        ensureMountPoint();

        if (!window.turnstile) {
          reject(new Error('Cloudflare Turnstile is not initialized'));
          return;
        }

        const widgetId = window.turnstile.render(`#${turnstileElementId}`, {
          sitekey: turnstileSiteKey,
          callback(token: string) {
            widgetIdRef.current = widgetId;
            resolve(token);
          },
          'error-callback': (errorCode: string) => {
            reject(new Error(`Cloudflare Turnstile error: ${errorCode}`));
          },
        });

        widgetIdRef.current = widgetId;
      };

      const renderOrReject = () => {
        if (window.turnstile) {
          renderWidget();
        } else {
          reject(new Error('Cloudflare Turnstile script is not loaded'));
        }
      };

      if (window.turnstile) {
        renderOrReject();
      } else {
        const handleLoad = () => {
          window.removeEventListener('load', handleLoad);
          renderOrReject();
        };
        window.addEventListener('load', handleLoad);
      }
    });
  };

  const resetTurnstileElement = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    const oldElement = document.getElementById(turnstileElementId);
    oldElement?.remove();

    if (containerRef.current) {
      const mountPoint = document.createElement('div');
      mountPoint.setAttribute('id', turnstileElementId);
      containerRef.current.appendChild(mountPoint);
    }
  };

  return {
    containerRef,
    renderTurnstile,
    resetTurnstileElement,
  };
};
