//@ts-check
const prismDark = require('prism-react-renderer/themes/nightOwl');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  important: false,
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      /**
       *  added the default spacing values to max width
       * @param theme
       */
      maxWidth: (theme) => ({
        // @ts-ignore
        ...theme('spacing'),
      }),
      minWidth: (theme) => ({
        // @ts-ignore
        ...theme('spacing'),
      }),
      // @ts-ignore
      backgroundColor: ['group-focus'],
      borderWidth: {
        1: '1px',
      },
    },
  },
  variants: {
    extend: {
      // ...
      borderWidth: ['hover', 'focus'],
    },
  },
  // @ts-ignore
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        darkDocs: {
          primary: '#36d1dc',
          secondary: '#5b86e5',
          accent: '#ffffff',
          neutral: '#DCE1EB',
          'base-100': '#1E1E1F',
          info: '#84a5ec',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};

module.exports = config;
