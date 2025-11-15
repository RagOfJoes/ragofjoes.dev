import eslint from "@eslint/js";
import * as parser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import-x";
import solid from "eslint-plugin-solid/configs/typescript";
import unused from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
	astro.configs["flat/recommended"],

	{ ignores: ["node_modules", "out"] },

	{
		files: ["**/*.js", "**/*.ts", "**/*.tsx"],
		plugins: {
			import: importPlugin,
			"unused-imports": unused,
		},
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		rules: {
			...prettier.rules,

			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-explicit-any": ["off"],
			"@typescript-eslint/array-type": [
				"off",
				{
					default: "generic",
					readonly: "generic",
				},
			],
			"@typescript-eslint/consistent-type-definitions": ["off"],
			"@typescript-eslint/no-empty-object-type": ["off"],
			"@typescript-eslint/only-throw-error": ["off"],
			"@typescript-eslint/no-duplicate-type-constituents": ["off"],
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{ prefer: "type-imports", fixStyle: "separate-type-imports" },
			],
			"@typescript-eslint/no-unnecessary-condition": [
				"error",
				{
					allowConstantLoopConditions: true,
				},
			],
			"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
			"no-console": "error",
			"unused-imports/no-unused-imports": "error",
		},
	},

	{
		files: ["**/*.astro"],
		plugins: {
			import: importPlugin,
			"unused-imports": unused,
		},
		rules: {
			...prettier.rules,
		},
	},

	{
		files: ["**/*.ts", "**/*.tsx"],
		...solid,
		languageOptions: {
			parser,
		},
	},

	{
		languageOptions: { parserOptions: { projectService: true } },
		linterOptions: { reportUnusedDisableDirectives: true },
	},
);
