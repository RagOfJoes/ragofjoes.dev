import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

// Single package, so this file is both the Vite app config and the Vite+ config
// (tasks, formatter, linter, test runner, git hooks).
// https://viteplus.dev/config/
export default defineConfig({
	// Git hooks for staged files - https://viteplus.dev/guide/commit-hooks
	staged: {
		"*": "vp fmt --no-error-on-unmatched-pattern",
	},

	// Vite Task
	// https://viteplus.dev/config/run
	// https://viteplus.dev/guide/run
	// https://viteplus.dev/guide/cache
	run: {
		cache: {
			tasks: true,
		},
		tasks: {
			// Named `build:app` rather than `build` because in a single-package repo a task
			// may not share a name with a package.json script. `pnpm build` runs this task,
			// so the build still goes through the Vite+ cache.
			"build:app": {
				command: "cross-env NODE_ENV=production vp build",
				cache: {
					input: [
						{ auto: true },
						"!**/.output/**",
						"!**/.vercel/**",
						"!**/.netlify/**",
						"!**/build/**",
						"!**/.wrangler/**",
						"!**/dist/**",
						"!**/*.tsbuildinfo",
						"!**/node_modules/.vite/**",
						"!**/node_modules/.vite-temp/**",
						"!**/node_modules/.nitro/**",
					],
				},
			},
		},
	},

	// Vitest (via Vite+) - https://viteplus.dev/guide/test
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
		passWithNoTests: true,
	},

	// Vite resolves tsconfig `paths` natively, so `vite-tsconfig-paths` is not needed.
	resolve: {
		tsconfigPaths: true,
	},

	server: {
		port: 3000,
	},
	plugins: [
		devtools({
			// https://tanstack.com/devtools/latest/docs/vite-plugin#console-piping
			consolePiping: { enabled: false },
		}),
		tanstackStart(),
		// https://tanstack.com/start/latest/docs/framework/react/guide/hosting
		nitro({
			// fixes SSR issues with Vite 8:
			// https://discord.com/channels/719702312431386674/1490005967067414608/1490634230458224751
			traceDeps: ["react", "react-dom"],
			/**
			 * TODO(security): Review production security headers before deployment.
			 *
			 * App-level policies such as CSP, Permissions-Policy, X-Frame-Options /
			 * frame-ancestors, COOP, Referrer-Policy, and X-Content-Type-Options are
			 * intentionally not configured here because safe values depend on the app's
			 * embedding requirements, browser APIs, integrations, and content.
			 */
		}),
		viteReact(),
		// https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#react-compiler
		babel({
			presets: [reactCompilerPreset()],
		}),
		tailwindcss(),
	],

	// Oxfmt - https://oxc.rs/docs/guide/usage/formatter/config.html
	fmt: {
		tabWidth: 2,
		semi: true,
		printWidth: 100,
		singleQuote: false,
		endOfLine: "lf",
		trailingComma: "all",
		sortImports: {
			// customGroups beat the predefined ones and are matched in order.
			// internalPattern did not pick up "@/**", so aliased imports get a custom group too.
			// (`internal` is a predefined group name, so the custom group can't reuse it.)
			customGroups: [
				{ groupName: "react", elementNamePattern: ["react", "react-**", "react/**"] },
				{ groupName: "alias", elementNamePattern: ["@/**"] },
			],
			// react -> external -> alias -> relative
			groups: [
				"react",
				["type-import", "value-builtin", "value-external"],
				"alias",
				["type-parent", "type-sibling", "type-index"],
				["value-parent", "value-sibling", "value-index"],
				"unknown",
			],
		},
		sortTailwindcss: {
			stylesheet: "./src/styles/base.css",
			attributes: ["class", "className"],
			functions: ["clsx", "cn", "cva", "tw"],
		},
		sortPackageJson: true,
		ignorePatterns: [
			"pnpm-lock.yaml",
			"package-lock.json",
			"yarn.lock",
			"bun.lock",
			"routeTree.gen.ts",
			".tanstack-start/",
			".tanstack/",
			".cache",
			"worker-configuration.d.ts",
			".vercel",
			".output",
			".wrangler",
			".netlify",
			"dist",
			"src/fonts/",
		],
	},

	// Oxlint - https://oxc.rs/docs/guide/usage/linter/config
	lint: {
		plugins: ["typescript", "react", "react-perf", "jsx-a11y"],
		env: {
			builtin: true,
			node: true,
			browser: true,
		},
		options: {
			typeAware: true,
			typeCheck: true,
		},
		jsPlugins: [
			// Plugins with "/" in name have to be aliased for now
			// Issue: https://github.com/oxc-project/oxc/issues/14557
			{
				name: "eslint-tanstack-router",
				specifier: "@tanstack/eslint-plugin-router",
			},
			{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
		],
		rules: {
			"vite-plus/prefer-vite-plus-imports": "warn",

			"no-deprecated": "warn",
			"typescript/no-floating-promises": "off",
			"typescript/no-misused-spread": "off",

			"jsx-a11y/prefer-tag-over-role": "off",

			"eslint-tanstack-router/create-route-property-order": "warn",
		},
		ignorePatterns: [
			"dist",
			".wrangler",
			".vercel",
			".netlify",
			".output",
			"build/",
			"worker-configuration.d.ts",
			"scripts/",
		],
	},
});
