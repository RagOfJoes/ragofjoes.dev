import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import { RESUME } from "@/lib/constants";

export type ResumePanelBodySkillsProps = ComponentProps<"section">;

/** Skills, by group. */
export function ResumePanelBodySkills({ className, ...props }: ResumePanelBodySkillsProps) {
	return (
		<section
			{...props}
			aria-labelledby="resume-skills"
			className={cn(
				"flex break-inside-avoid flex-col gap-3",

				className,
			)}
		>
			<h2
				className="border-b pb-1 font-mono text-xs leading-none font-semibold uppercase"
				id="resume-skills"
			>
				[Skills]
			</h2>

			<dl className="flex flex-col gap-1">
				{RESUME.skills.map((group) => (
					<div
						key={group.label}
						className={cn(
							"grid w-full grid-cols-[13rem_1fr] gap-2",

							"max-sm:grid-cols-1 max-sm:gap-0.5",
						)}
					>
						<dt className="font-mono text-xs uppercase">[{group.label}]</dt>
						<dd className="font-sans text-xs">{group.items.join(", ")}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
