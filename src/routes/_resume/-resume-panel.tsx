import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

import { ResumePanelBody } from "./-resume-panel-body";
import { ResumePanelHeader } from "./-resume-panel-header";

export type ResumePanelProps = HTMLMotionProps<"section">;

/**
 * The resume as a document in a window: a toolbar (copy email, print, download
 * the PDF) in the title bar over the scrolling resume. Printing the page
 * itself prints just the resume, black on white (see the `print:` styles).
 */
export function ResumePanel({ className, ...props }: ResumePanelProps) {
	return (
		<motion.section
			{...props}
			className={cn(
				"flex min-h-32 w-full min-w-0 flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground",

				"print:border-0 print:bg-none print:p-0",

				className,
			)}
			transition={PANEL_ANIMATIONS.transition}
			variants={PANEL_ANIMATIONS.variants}
		>
			<ResumePanelHeader />

			<ResumePanelBody />
		</motion.section>
	);
}
