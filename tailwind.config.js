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
        contrastText: '#FFF',
        secondary: 'rgba(26, 26, 27, 0.5)',
        disabled: 'rgba(26, 26, 27, 0.3)',
        active: '#326AFD',
        error: '#EC5A7D',
        warning: '#B15600',
        success: '#2FBA90',
      },
      colors: {
        paper: '#FFF',
        border: 'rgba(69, 72, 81, 0.1)',
        'primary-contrastText': '#FFF',
        paperContrast: 'rgba(26, 26, 27, 0.06)',
        paperDarkContrast: 'rgba(26, 26, 27, 0.1)',
      },
      backgroundColor: {
        main: '#FFF',
        primary: '#326AFD',
        paper: '#F2F2F2',
        paperContrast: '#F6F6F6',
        paperDarkContrast: 'rgba(26, 26, 27, 0.1)',
        border: 'rgba(69, 72, 81, 0.1)',
        tag: 'rgba(26, 26, 27, 0.04)',
        hover: 'rgba(0, 0, 0, 0.06)',
        backdrop: 'rgba(0, 0, 0, 0.9)',
        skeleton: 'rgba(25, 26, 27, 0.11)',
        input: '#F0F0F0',
        error: '#EC5A7D',
        warning: '#B15600',
        success: '#2FBA90',
        text: '#1A1A1B',
        contrastText: '#FFF',
      },
      zIndex: {
        modal: '1300',
      },
      height: {
        17: '4.25rem',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
      },
      transitionDelay: {
        600: '600ms',
      },
    },
  },
  plugins: [],
};
