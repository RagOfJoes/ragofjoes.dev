import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import { RESUME } from "@/lib/constants";

export type ResumePanelBodyExperienceProps = ComponentProps<"section">;

/** Each company with its roles, leaving out those hidden on the resume. */
export function ResumePanelBodyExperience({ className, ...props }: ResumePanelBodyExperienceProps) {
	return (
		<section
			{...props}
			aria-labelledby="resume-experience"
			className={cn(
				"flex flex-col gap-3",

				className,
			)}
		>
			<h2
				className="border-b pb-1 font-mono text-xs leading-none font-semibold uppercase"
				id="resume-experience"
			>
				[Experience]
			</h2>

			{RESUME.experience
				.filter((company) => !company.isHiddenOnResume)
				.map((company) => (
					<article key={company.name} className="flex break-inside-avoid flex-col gap-2">
						<div className="flex flex-col gap-1">
							<div className="flex items-baseline justify-between gap-2">
								<h3 className="font-sans text-sm leading-none font-semibold">{company.name}</h3>
								<span className="shrink-0 font-mono text-xs leading-none text-muted-foreground">
									{company.location}
								</span>
							</div>

							{company.description && (
								<p className="text-muted-foreground italic">{company.description}</p>
							)}
						</div>

						{company.roles.map((role) => (
							<div key={role.title} className="flex flex-col gap-1">
								<div className="flex items-baseline justify-between gap-2">
									<h4 className="font-sans text-xs leading-none font-semibold">{role.title}</h4>
									<span
										className={cn(
											"shrink-0 bg-foreground p-0.5 font-mono text-[10px] leading-none font-bold text-background",

											"print:bg-transparent print:p-0 print:text-foreground",
										)}
									>
										{role.dates}
									</span>
								</div>

								<ul className="flex list-disc flex-col gap-1 pl-4">
									{role.highlights.map((highlight) => (
										<li key={highlight}>{highlight}</li>
									))}
								</ul>
							</div>
						))}
					</article>
				))}
		</section>
	);
}
