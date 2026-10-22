import { ScrollArea } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/cn";

import { ResumePanelBodyExperience } from "./-resume-panel-body-experience";
import { ResumePanelBodyLead } from "./-resume-panel-body-lead";
import { ResumePanelBodySkills } from "./-resume-panel-body-skills";

export type ResumePanelBodyProps = ScrollArea.Root.Props;

/** The resume itself, scrolling inside the window. Prints in full. */
export function ResumePanelBody({ className, ...props }: ResumePanelBodyProps) {
	return (
		<ScrollArea.Root
			{...props}
			className={cn(
				"relative flex min-h-0 w-full flex-1 rounded-sm border bg-background",

				"print:block print:border-0",

				className,
			)}
		>
			<ScrollArea.Viewport
				className={cn(
					"min-h-0 w-full overscroll-none rounded-sm",

					"focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-foreground",
					"print:overflow-visible",
				)}
			>
				<ScrollArea.Content
					className={cn(
						"mx-auto flex w-full max-w-3xl flex-col gap-6 px-3 py-4 font-sans text-xs font-medium",

						// Room for the scrollbar track, only when there's one
						"data-has-overflow-y:pr-4",
						"print:max-w-none print:p-0",
					)}
				>
					<ResumePanelBodyLead />
					<ResumePanelBodyExperience />
					<ResumePanelBodySkills />
				</ScrollArea.Content>
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar
				className={cn(
					"m-0.5 flex w-1 justify-center rounded-full bg-foreground/10",

					"print:hidden",
				)}
			>
				<ScrollArea.Thumb className="w-full rounded-full bg-foreground/60" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	);
}
