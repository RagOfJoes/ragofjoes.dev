import { Dialog } from "@/components/dialog";
import { Image } from "@/components/image";
import { ImageViewer, type ImageViewerPopupProps } from "@/components/image-viewer";
import { cn } from "@/lib/cn";

const PHOTOS: ImageViewerPopupProps[] = [
	{
		alt: "Film critic Jiji",
		src: "/jiji/jiji-17.jpg",
		height: 3840,
		width: 2160,
	},
	{
		alt: "Flatbread Jiji",
		src: "/jiji/jiji-18.jpg",
		height: 2160,
		width: 2160,
	},
	{
		alt: "Baby Jiji",
		src: "/jiji/jiji-1.jpg",
		height: 1008,
		width: 1344,
	},
	{
		alt: "Sitting Jiji",
		src: "/jiji/jiji-2.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Oblivious Jiji",
		src: "/jiji/jiji-5.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Why she look like that?",
		src: "/jiji/jiji-6.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Window Jiji",
		src: "/jiji/jiji-7.jpg",
		height: 2016,
		width: 1512,
	},
	{
		alt: "Bookworm Jiji",
		src: "/jiji/jiji-8.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Hunter Jiji",
		src: "/jiji/jiji-9.jpg",
		height: 1344,
		width: 756,
	},
	{
		alt: "Hotdog Jiji",
		src: "/jiji/jiji-10.jpg",
		height: 1344,
		width: 756,
	},
	{
		alt: "Bed Monster Jiji",
		src: "/jiji/jiji-12.jpg",
		height: 1512,
		width: 1512,
	},
	{
		alt: "Puppy Eyes Jiji",
		src: "/jiji/jiji-13.jpg",
		height: 1344,
		width: 756,
	},
	{
		alt: "Eepy Jiji",
		src: "/jiji/jiji-14.jpg",
		height: 1512,
		width: 1512,
	},
	{
		alt: "Angry Jiji",
		src: "/jiji/jiji-16.jpg",
		height: 1512,
		width: 1512,
	},
];

/** "Jiji" in the About panel, opening his gallery: a masonry grid of photos. */
export function IndexAboutJiji() {
	return (
		<Dialog>
			<Dialog.Trigger
				className={cn(
					"cursor-pointer font-semibold underline",

					"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
					"hover:bg-foreground hover:text-background hover:no-underline",
				)}
			>
				Jiji
			</Dialog.Trigger>

			<Dialog.Popup className="max-w-2xl">
				<Dialog.Header>
					<Dialog.Title>Jiji</Dialog.Title>

					<Dialog.Controls>
						<Dialog.Close />
					</Dialog.Controls>
				</Dialog.Header>

				<Dialog.Content>
					{/* Masonry: columns fill top to bottom, each photo at its own aspect ratio */}
					<ul
						className={cn(
							"columns-2 gap-1",

							"sm:columns-3",
						)}
					>
						{PHOTOS.map((photo, index) => (
							<li
								key={photo.src}
								className={cn(
									"mb-1 flex w-full break-inside-avoid flex-col overflow-hidden rounded-sm border bg-striped",

									"focus-within:ring-1 focus-within:ring-foreground",
								)}
							>
								<ImageViewer>
									<ImageViewer.Trigger
										// The card shows focus (`focus-within`); an outline here would be clipped
										className="focus-visible:outline-hidden"
										style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
									>
										<Image
											{...photo}
											className="h-full select-none"
											decoding="async"
											loading={index < 6 ? "eager" : "lazy"}
											// A column of the gallery: 3 from `sm`, else 2
											sizes="(min-width: 640px) 220px, 50vw"
										/>
									</ImageViewer.Trigger>

									<ImageViewer.Popup {...photo} />
								</ImageViewer>

								<p className="px-1 py-2 font-mono text-xs leading-none font-medium">{photo.alt}</p>
							</li>
						))}
					</ul>
				</Dialog.Content>
			</Dialog.Popup>
		</Dialog>
	);
}
