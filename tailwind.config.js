/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
    './submission/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
  theme: {
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.border', 'currentColor'),
    }),
    extend: {
      textColor: {
        primary: '#1A1A1B',
        secondary: 'rgba(26, 26, 27, 0.5)',
        disabled: 'rgba(26, 26, 27, 0.3)',
        active: '#ED5AD5',
        error: '#EC5A7D',
        warning: '#B15600',
        success: '#2FBA90',
      },
      colors: {
        paper: '#FFF',
        border: 'rgba(69, 72, 81, 0.1)',
        'primary-contrastText': '#FFF',
        paperContrast: '#F6F6F6',
        paperDarkContrast: 'rgba(26, 26, 27, 0.1)',
      },
      backgroundColor: {
        main: '#F4F5F6',
        primary: '#ED5AD5',
        paper: '#FFF',
        paperContrast: '#F6F6F6',
        paperDarkContrast: 'rgba(26, 26, 27, 0.1)',
        border: 'rgba(69, 72, 81, 0.1)',
        tag: 'rgba(26, 26, 27, 0.04)',
        hover: 'rgba(26, 26, 27, 0.1)',
        backdrop: 'rgba(0, 0, 0, 0.9)',
        skeleton: 'rgba(25, 26, 27, 0.11)',
        input: '#F0F0F0',
      },
      zIndex: {
        modal: '1300',
      },
      height: {
        17: '4.25rem',
      },
    },
  },
  plugins: [],
};
