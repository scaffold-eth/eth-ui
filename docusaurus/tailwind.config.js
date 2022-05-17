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
      colors: {
        'text-primary': '#C2D0EA',
      },
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
          accent: '#111827',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#84a5ec',
          success: '#0d9488',
          warning: '#e67919',
          error: '#b91c1c',
        },
      },
    ],
  },
};

module.exports = config;
