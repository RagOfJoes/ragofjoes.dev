const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        scrollDown: 'scrollDown 1s ease-in-out infinite',
        slideLeft: 'slideLeft 12s linear infinite',
      },
      keyframes: {
        scrollDown: {
          '0%': {
            opacity: 0,
          },
          '30%': {
            opacity: 1,
          },
          '60%': {
            opacity: 1,
          },
          '100%': {
            top: '90%',
            opacity: 0,
          },
        },
        slideLeft: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
    fontFamily: {
      sans: ['"Rubik"', ...defaultTheme.fontFamily.sans],
      'sans-serif': ['"Montserrat"', 'sans-serif'],
    },
  },
  plugins: [
    require('@catppuccin/tailwindcss')({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `false`, which means no prefix
      prefix: 'ctp',
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: 'mocha',
    }),
  ],
};
