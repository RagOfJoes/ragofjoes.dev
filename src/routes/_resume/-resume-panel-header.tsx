import { type ComponentProps, useEffect, useRef, useState } from "react";

import { CheckIcon, CopyIcon, DownloadIcon, PrinterIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { RESUME } from "@/lib/constants";

export type ResumePanelHeaderProps = ComponentProps<"div">;

/** The title bar: the PDF's name, and a toolbar to copy the email, print or download. */
export function ResumePanelHeader({ className, ...props }: ResumePanelHeaderProps) {
	const [isCopied, setIsCopied] = useState(false);
	// The PDF, loaded into a hidden frame on the first print and reused after
	const print = useRef<HTMLIFrameElement | null>(null);

	// "Copied" shows for a couple of seconds
	useEffect(() => {
		if (!isCopied) {
			return;
		}

		const timeout = setTimeout(() => setIsCopied(false), 2000);
		return () => clearTimeout(timeout);
	}, [isCopied]);

	useEffect(() => () => print.current?.remove(), []);

	return (
		<div
			{...props}
			className={cn(
				"inline-flex h-6 w-full shrink-0 items-center justify-between gap-2",

				"print:hidden",

				className,
			)}
		>
			<h2 className="truncate font-mono text-xs leading-none font-semibold">Resume</h2>

			{/* Labels only from `sm`; icons alone below */}
			<div className="inline-flex h-full items-center gap-1">
				<button
					aria-live="polite"
					className={cn(
						"group/copy inline-flex h-4 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-foreground/50 bg-background px-1.5 font-mono text-[10px] leading-none font-medium text-foreground uppercase transition-colors",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
						"hover:bg-foreground hover:text-background",
					)}
					onClick={() => {
						// Ignores a refusal (e.g. no clipboard permission): the address is on
						// the page anyway
						navigator.clipboard.writeText(RESUME.contact.email).then(
							() => setIsCopied(true),
							() => {},
						);
					}}
					data-copied={isCopied}
					type="button"
				>
					{/* Both icons stacked: copy shrinks away as the check draws itself in */}
					<span className="grid size-2.5 *:col-start-1 *:row-start-1">
						<CopyIcon
							className={cn(
								"size-2.5 transition-[opacity,scale] duration-200 ease-out",

								"group-data-[copied=true]/copy:scale-50 group-data-[copied=true]/copy:opacity-0",
								"motion-reduce:transition-none",
							)}
						/>

						{/* The check's stroke is about 23 units long: dashed at 24 and offset by
						    as much it's hidden, and drawn in by easing the offset to 0 */}
						<CheckIcon
							className={cn(
								"size-2.5 scale-50 opacity-0 transition-[opacity,scale,stroke-dashoffset] duration-300 ease-out [stroke-dasharray:24] [stroke-dashoffset:24]",

								"group-data-[copied=true]/copy:scale-100 group-data-[copied=true]/copy:opacity-100 group-data-[copied=true]/copy:[stroke-dashoffset:0]",
								"motion-reduce:transition-none",
							)}
						/>
					</span>
					<span className="sr-only">{isCopied ? "Copied" : "Copy email"}</span>
				</button>

				{/* Prints the PDF rather than the page: the browser's PDF viewer prints it
				    from a hidden frame */}
				<button
					className={cn(
						"inline-flex h-4 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-foreground/50 bg-background px-1.5 font-mono text-[10px] leading-none font-medium text-foreground uppercase transition-colors",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
						"hover:bg-foreground hover:text-background",
					)}
					onClick={() => {
						if (print.current) {
							print.current.contentWindow?.print();
							return;
						}

						const frame = document.createElement("iframe");
						frame.className = "pointer-events-none fixed size-0 opacity-0";
						frame.src = RESUME.pdf;
						frame.title = "Resume PDF";
						frame.addEventListener("load", () => frame.contentWindow?.print(), { once: true });
						document.body.append(frame);
						print.current = frame;
					}}
					type="button"
				>
					<PrinterIcon className="size-2.5" />
					<span className="sr-only">Print</span>
				</button>

				<a
					className={cn(
						"inline-flex h-4 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-foreground/50 bg-background px-1.5 font-mono text-[10px] leading-none font-medium text-foreground uppercase transition-colors",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
						"hover:bg-foreground hover:text-background",
					)}
					download
					href={RESUME.pdf}
				>
					<DownloadIcon className="size-2.5" />
					<span className="sr-only">Download</span>
				</a>
			</div>
		</div>
	);
}
