import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import { RESUME, SITE } from "@/lib/constants";

export type ResumePanelBodyLeadProps = ComponentProps<"header">;

/** The top of the resume: name, title and contact details. */
export function ResumePanelBodyLead({ className, ...props }: ResumePanelBodyLeadProps) {
	return (
		<header
			{...props}
			className={cn(
				"flex flex-col gap-3",

				className,
			)}
		>
			<div className="flex flex-col gap-1">
				<h1 className="font-sans text-xl leading-none font-semibold">{SITE.name}</h1>
				<p className="font-sans text-sm leading-none font-medium text-muted-foreground">
					{SITE.jobTitle}
				</p>
			</div>

			<dl className="flex flex-col gap-1">
				<div
					className={cn(
						"grid w-full grid-cols-[13rem_1fr] gap-2",

						"max-sm:grid-cols-1 max-sm:gap-0.5",
					)}
				>
					<dt className="font-mono text-xs uppercase">[Email]</dt>
					<dd className="font-mono text-xs wrap-break-word">
						<a
							className={cn(
								"underline",

								"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
								"hover:bg-foreground hover:text-background hover:no-underline",
							)}
							href={`mailto:${RESUME.contact.email}`}
						>
							{RESUME.contact.email}
						</a>
					</dd>
				</div>

				{RESUME.contact.links.map((link) => (
					<div
						key={link.href}
						className={cn(
							"grid w-full grid-cols-[13rem_1fr] gap-2",

							"max-sm:grid-cols-1 max-sm:gap-0.5",
						)}
					>
						<dt className="font-mono text-xs uppercase">[{link.label}]</dt>
						<dd className="font-mono text-xs wrap-break-word">
							<a
								className={cn(
									"underline",

									"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
									"hover:bg-foreground hover:text-background hover:no-underline",
								)}
								href={link.href}
								rel="noopener noreferrer"
								target="_blank"
							>
								{link.href.replace("https://", "")}
							</a>
						</dd>
					</div>
				))}

				<div
					className={cn(
						"grid w-full grid-cols-[13rem_1fr] gap-2",

						"max-sm:grid-cols-1 max-sm:gap-0.5",
					)}
				>
					<dt className="font-mono text-xs uppercase">[Location]</dt>
					<dd className="font-mono text-xs wrap-break-word">{RESUME.contact.location}</dd>
				</div>
			</dl>
		</header>
	);
}
