const config = {
  locales: ['en'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'locales/{locale}',
      include: [
        'app',
        'components',
        'constants',
        'hooks',
        'submission',
        'providers',
        'utils',
      ],
    },
  ],
  format: 'po',
};

export default config;
