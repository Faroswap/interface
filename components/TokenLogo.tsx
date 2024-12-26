/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import Identicon from 'identicon.js';
import { Box, BoxProps } from '@dodoex/components';
import { TokenInfo } from '@dodoex/widgets';
import { getTokenLogoUrl } from './Widget';

export interface TokenLogoProps {
  address?: string;
  token?: TokenInfo;
  width?: number;
  height?: number;
  marginRight?: number;
  url?: string;
  zIndex?: number;
  sx?: BoxProps['sx'];
  chainId?: number;
  noShowChain?: boolean;
  noBorder?: boolean;
  chainSize?: number;
  logoOffset?: number;
}

export default function TokenLogo({
  width = 24,
  height = 24,
  marginRight = 8,
  zIndex,
  address,
  sx,
  chainId,
  noBorder,
  chainSize = 12,
  logoOffset: logoOffsetProps,
}: TokenLogoProps): React.ReactElement {
  const [loaded, setLoaded] = useState(false);
  const [defaultUrl, setDefaultUrl] = useState('');
  const [error, setError] = useState(false);
  const onLoad = useCallback(() => setLoaded(true), []);
  const symbol = '';
  const initial = symbol?.charAt(0).toUpperCase();

  const logoUrl = getTokenLogoUrl({
    chainId,
    address,
    width,
    height,
  });

  let logoOffset = logoOffsetProps;
  if (!logoOffset) {
    logoOffset = chainSize / 2 < 8 ? chainSize / 2 : chainSize - 8;
  }

  useEffect(() => {
    setError(false);
  }, [address, logoUrl]);

  useEffect(() => {
    try {
      let addr = address;
      if (addr && addr.length < 15) {
        addr = addr.padEnd(15, '0');
      }
      if (addr) {
        const data = new Identicon(addr, {
          size: width,
          format: 'svg',
          margin: 0.2,
          background: [255, 234, 4, 255],
        }).toString();
        setDefaultUrl(`data:image/svg+xml;base64,${data}`);
      }
    } catch (err) {
      // address is empty
      console.error('generate Identicon error: ', err);
    }
  }, [address, width]);

  const showChain = false;

  const logo = (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        borderRadius: '50%',
        ...(noBorder
          ? {}
          : {
              border: 'solid 1px',
              borderColor: 'border.main',
            }),
        flexShrink: 0,
        ...(showChain
          ? {}
          : {
              marginRight,
              zIndex,
              ...sx,
            }),
      }}
    >
      {!loaded && (
        <Box
          sx={{
            typography: 'ht',
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            border: 'transparent 2px solid',
            borderColor: 'text.primary',
            color: 'text.primary',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {initial}
        </Box>
      )}
      <Box
        component="img"
        src={!logoUrl || error ? defaultUrl : logoUrl}
        onLoad={onLoad}
        onError={(e: any) => {
          const target = e.target as HTMLImageElement;
          if (address && defaultUrl) {
            setError(true);
          }
          target.onerror = null;
        }}
        sx={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          borderRadius: '50%',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );

  return logo;
}
