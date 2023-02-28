// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        scrollDown: 'scrollDown 1s ease-in-out infinite',
        slideLeft: 'slideLeft 18s linear infinite',
      },
      borderColor: {
        DEFAULT: 'hsl(249deg 12% 47% / 0.2)',
      },
      colors: {
        'rsp-base': 'hsl(249deg 22% 12% / <alpha-value>)',
        'rsp-foam': 'hsl(189deg 43% 73% / <alpha-value>)',
        'rsp-gold': 'hsl(35deg 88% 72% / <alpha-value>)',
        'rsp-iris': 'hsl(267deg 57% 78% / <alpha-value>)',
        'rsp-love': 'hsl(343deg 76% 68% / <alpha-value>)',
        'rsp-muted': 'hsl(249deg 12% 47% / <alpha-value>)',
        'rsp-overlay': 'hsl(248deg 25% 18% / <alpha-value>)',
        'rsp-pine': 'hsl(197deg 49% 38% / <alpha-value>)',
        'rsp-rose': 'hsl(2deg 55% 83% / <alpha-value>)',
        'rsp-subtle': 'hsl(248deg 15% 61% / <alpha-value>)',
        'rsp-surface': 'hsl(247deg 23% 15% / <alpha-value>)',
        'rsp-text': 'hsl(245deg 50% 91% / <alpha-value>)',
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
  plugins: [],
};
