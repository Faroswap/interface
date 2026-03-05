/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const nextConfig = {
  transpilePackages: ['@dodoex/widgets'],
  serverExternalPackages: ['grammy'],
  webpack: (
    config,
    { isServer },
  ) => {
    // Replace @lingui/macro with a runtime shim (SWC plugin not available for this Next.js version)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lingui/macro': path.resolve(__dirname, 'lib/lingui-macro-shim.tsx'),
    };
    // https://react-svgr.com/docs/next/#nextjs
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        loader: 'next-middleware-asset-loader',
        type: 'javascript/auto',
        layer: 'edge-asset',
        test: /\.pdf$/i,
        resourceQuery: /url/, // *.pdf?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              // https://github.com/svg/svgo#default-preset
              svgoConfig: {
                plugins: [
                  'removeTitle',
                  'removeXMLNS',
                  'mergePaths',
                  // {
                  //   name: 'preset-default',
                  //   params: {
                  //     overrides: {
                  //       // removeTitle: false,
                  //       // https://github.com/svg/svgo#svg-wont-scale-when-css-is-applied-on-it
                  //       removeViewBox: false,
                  //     },
                  //   },
                  // },
                ],
              },
            },
          },
        ],
      },
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader',
      },
    });

    config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work

    // Important: return the modified config
    return config;
  },
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=31536000,immutable', // Cache for 1 year
          },
        ],
      },
      {
        source: '/favicon-192x192.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=31536000,immutable', // Cache for 1 year
          },
        ],
      },
      {
        source: '/favicon-512x512.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=31536000,immutable', // Cache for 1 year
          },
        ],
      },
    ];
  },
};

export default nextConfig;
