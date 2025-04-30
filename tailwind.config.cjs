const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			animation: {
				"scroll-down": "scroll-down 1s ease-in-out infinite",
				"slide-left": "slide-left 18s linear infinite",
			},
			borderColor: {
				DEFAULT: "hsl(60deg 5.49% 17.84% / <alpha-value>)",
			},
			colors: {
				background: "hsl(60deg 6.67% 5.88% / <alpha-value>)",
				border: "hsl(60deg 5.49% 17.84% / <alpha-value>)",
				foreground: "hsl(60deg 100% 94.51% / <alpha-value>)",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",

				muted: {
					foreground: "hsl(60deg 6.08% 35.49% / <alpha-value>)",
				},
				primary: {
					DEFAULT: "hsl(48.65deg 100% 85.49% / <alpha-value>)",
					foreground: "hsl(60deg 6.67% 5.88% / <alpha-value>)",
				},
			},
			keyframes: {
				"scroll-down": {
					"0%": {
						opacity: 0,
					},
					"30%": {
						opacity: 1,
					},
					"60%": {
						opacity: 1,
					},
					"100%": {
						top: "90%",
						opacity: 0,
					},
				},
				"slide-left": {
					"0%": {
						transform: "translateX(0%)",
					},
					"100%": {
						transform: "translateX(-100%)",
					},
				},
			},
		},
		fontFamily: {
			sans: ['"General Sans"', "sans-serif"],
		},
	},
	plugins: [animate],
};
