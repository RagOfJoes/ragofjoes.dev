/** BUG: https://github.com/withastro/adapters/issues/445 */
import type { AstroIntegration } from "astro";
import { cp, readdir } from "node:fs/promises";
import * as path from "node:path";

export function sitemapCopier(): AstroIntegration {
	return {
		name: "sitemap-copier",
		hooks: {
			"astro:build:done": async ({ logger }) => {
				const buildLogger = logger.fork("sitemap-copier");
				buildLogger.info("Copying xml files from dist to vercel out");
				try {
					const files = await readdir("./dist");
					const xmlFiles = files.filter(
						(file) =>
							path.extname(file).toLowerCase() === ".xml" &&
							path.basename(file).toLowerCase().startsWith("sitemap"),
					);
					buildLogger.info(xmlFiles.join(", "));

					for (const file of xmlFiles) {
						const sourcePath = path.join("./dist", file);
						const destPath = path.join("./.vercel/output/static", file);

						await cp(sourcePath, destPath);
					}
					buildLogger.info("All XML files copied successfully");
				} catch (error) {
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					buildLogger.error(`Error copying files: ${error}`);
				}
			},
		},
	};
}
