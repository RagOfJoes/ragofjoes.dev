import { type ComponentProps, type MouseEvent, type PointerEvent, useState } from "react";

import { Dialog, type DialogProps } from "@/components/dialog";
import { Image, type ImageProps } from "@/components/image";
import { cn } from "@/lib/cn";

export type ImageViewerProps = DialogProps;

/**
 * Opens an image large, zooming out of its thumbnail.
 *
 * @example
 * <ImageViewer>
 * 	<ImageViewer.Trigger style={{ aspectRatio: `${image.width} / ${image.height}` }}>
 * 		<Image {...image} className="h-full" />
 * 	</ImageViewer.Trigger>
 * 	<ImageViewer.Popup {...image} />
 * </ImageViewer>
 */
function ImageViewerRoot(props: ImageViewerProps) {
	return <Dialog {...props} />;
}

export type ImageViewerTriggerProps = ComponentProps<typeof Dialog.Trigger>;

/** The thumbnail. Hidden while its image is open, as if lifted out of the page. */
export function ImageViewerTrigger({ className, ...props }: ImageViewerTriggerProps) {
	return (
		<Dialog.Trigger
			{...props}
			className={cn(
				"block w-full cursor-zoom-in transition-[opacity,scale,translate] delay-200 duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",

				// As the popup's 300ms zoom back into it ends, fades in from a touch bigger
				// and a few pixels towards the popup, carrying on its motion
				"data-popup-open:translate-x-[calc(var(--dialog-x)*0.02)] data-popup-open:translate-y-[calc(var(--dialog-y)*0.02)] data-popup-open:scale-[1.02] data-popup-open:opacity-0 data-popup-open:transition-none",
				"focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground",
				"motion-reduce:transition-none",

				className,
			)}
		/>
	);
}

export type ImageViewerPopupProps = Pick<ImageProps, "alt" | "src"> & {
	height: number;
	width: number;
};

/**
 * The image as large as fits the window (never past its own size). Clicking it
 * zooms in towards that point, and moving the pointer pans while zoomed;
 * clicking again zooms back out.
 */
export function ImageViewerPopup({ alt, height, src, width }: ImageViewerPopupProps) {
	const [isZoomed, toggleIsZoomed] = useState(false);

	// Zooms towards the pointer: scaling around it keeps that spot under the
	// pointer, so moving it around pans
	const onZoomTowards = (e: MouseEvent<HTMLElement> | PointerEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		e.currentTarget.style.setProperty(
			"--zoom-x",
			`${((e.clientX - rect.left) / rect.width) * 100}%`,
		);
		e.currentTarget.style.setProperty(
			"--zoom-y",
			`${((e.clientY - rect.top) / rect.height) * 100}%`,
		);
	};

	return (
		<Dialog.Popup className="w-auto max-w-none">
			<Dialog.Header>
				<Dialog.Title>{alt}</Dialog.Title>

				<Dialog.Controls>
					<Dialog.Close />
				</Dialog.Controls>
			</Dialog.Header>

			<button
				aria-label={isZoomed ? "Zoom out" : "Zoom in"}
				aria-pressed={isZoomed}
				className={cn(
					"group/viewer block cursor-zoom-in overflow-hidden rounded-sm border bg-background [--zoom-x:50%] [--zoom-y:50%]",

					"data-[zoomed=true]:cursor-zoom-out data-[zoomed=true]:touch-none",
					"focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-foreground",
				)}
				data-zoomed={isZoomed}
				onClick={(e) => {
					// A keyboard press has no pointer position: zoom towards the middle
					if (e.detail > 0) {
						onZoomTowards(e);
					} else {
						e.currentTarget.style.removeProperty("--zoom-x");
						e.currentTarget.style.removeProperty("--zoom-y");
					}

					toggleIsZoomed(!isZoomed);
				}}
				onPointerMove={isZoomed ? onZoomTowards : undefined}
				// As large as fits: the window less the dialog's padding, frame, title bar
				// and borders (52px across, 68px down), at the image's aspect ratio
				style={{
					aspectRatio: `${width} / ${height}`,
					width: `min(${width}px, 100vw - 52px, (100dvh - 68px) * ${width} / ${height})`,
				}}
				type="button"
			>
				<Image
					alt={alt}
					className={cn(
						"h-full origin-[var(--zoom-x)_var(--zoom-y)] transition-[scale] duration-300 ease-out select-none",

						"group-data-[zoomed=true]/viewer:scale-150",
						"motion-reduce:transition-none",
					)}
					decoding="async"
					draggable={false}
					height={height}
					src={src}
					width={width}
				/>
			</button>
		</Dialog.Popup>
	);
}

export const ImageViewer = Object.assign(ImageViewerRoot, {
	Popup: ImageViewerPopup,
	Trigger: ImageViewerTrigger,
});
