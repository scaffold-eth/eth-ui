//@ts-check

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
        'theme-light-primary': '#5b86e5',
        'theme-dark-primary': '#36d1dc',
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
};

module.exports = config;
