/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@dodoex/widgets'],
  experimental: {
    serverComponentsExternalPackages: ['grammy'],
    swcPlugins: [
      [
        // https://github.com/lingui/swc-plugin?tab=readme-ov-file#compatibility
        '@lingui/swc-plugin',
        {
          // the same options as in .swcrc
        },
      ],
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (
    config,
    // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
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
};

export default nextConfig;
