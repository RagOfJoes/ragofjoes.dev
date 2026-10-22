import { Link } from "@tanstack/react-router";

import { Image, type ImageProps } from "@/components/image";
import { Windows } from "@/components/windows";
import { cn } from "@/lib/cn";

type Slide = {
	slug: string;
	title: string;
	image: Pick<ImageProps, "height" | "src" | "width">;
};

const SLIDES: Slide[] = [
	{
		slug: "puzzlely",
		title: "Puzzlely Cover",
		image: {
			src: "/puzzlely-cover.png",
			height: 630,
			width: 1200,
		},
	},
	{
		slug: "puzzlely",
		title: "Puzzlely Home Page",
		image: {
			src: "/puzzlely-home-page.png",
			height: 2160,
			width: 3840,
		},
	},
	{
		slug: "puzzlely",
		title: "Puzzlely User Page",
		image: {
			src: "/puzzlely-user-page.png",
			height: 2160,
			width: 3840,
		},
	},
];

/** Copies of the slide strip, so the marquee never runs out on wide screens. */
const COPIES = 8;
/** The one copy that's focusable and exposed to assistive tech. */
const PRIMARY_COPY = 2;

export function IndexProjects() {
	return (
		<Windows.Panel value="Projects">
			<Windows.Header>
				<Windows.Title />

				<Windows.Controls>
					<Windows.Reset />
					<Windows.Close />
				</Windows.Controls>
			</Windows.Header>

			<Windows.Content>
				<div className="inline-grid h-full w-full flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_10%,black_calc(100%-200px),transparent_100%)] contain-inline-size">
					<div className="group/carousel inline-flex h-full w-full items-center">
						{Array.from({ length: COPIES }, (_, copy) => (
							<ul
								key={copy}
								aria-hidden={copy !== PRIMARY_COPY || undefined}
								className={cn(
									"flex shrink-0 animate-slide-left items-center gap-1 will-change-transform",

									"group-focus-visible/carousel:paused",
									"group-focus-within/carousel:paused",
									"group-hover/carousel:paused",
								)}
							>
								{SLIDES.map((slide) => (
									<li
										key={slide.image.src}
										className={cn(
											"select-none",

											"first:ml-1",
										)}
									>
										<Link
											className={cn(
												"flex h-full items-center gap-1 opacity-60",

												"focus-visible:opacity-100 focus-visible:outline-hidden",
												"hover:opacity-100",
											)}
											params={{ slug: slide.slug }}
											to="/projects/$slug"
											tabIndex={copy === PRIMARY_COPY ? 0 : -1}
										>
											<Image
												{...slide.image}
												alt={slide.title}
												className="h-20 w-auto"
												decoding="async"
												fetchPriority="low"
												loading="lazy"
												// 80px tall (`h-20`)
												sizes="160px"
											/>
										</Link>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			</Windows.Content>
		</Windows.Panel>
	);
}
