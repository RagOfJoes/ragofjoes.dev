import {
	Show,
	createEffect,
	createSignal,
	mergeProps,
	onCleanup,
	onMount,
	splitProps,
} from "solid-js";
import type { JSX } from "solid-js";

import { Color, Mesh, Renderer, Triangle } from "ogl";
import { Program } from "ogl";

import { cn } from "@/lib/cn";
import { hexToRgb } from "@/lib/hex-to-rgb";

import { fragmentShader, vertexShader } from "./shaders";

export type BackgroundProps = JSX.HTMLAttributes<HTMLDivElement> & {
	background?: string;
	dpr?: number;
	size?: number;
	speed?: number;
	tint?: string;
};

export function Background(props: BackgroundProps): JSX.Element {
	const merged = mergeProps(
		{
			background: "#121113",
			dpr: typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 2,
			size: 64,
			speed: 0.1,
			tint: "#888888",
		},
		props,
	);
	const [local, rest] = splitProps(merged, [
		"background",
		"class",
		"dpr",
		"size",
		"speed",
		"style",
		"tint",
	]);

	let ref: HTMLDivElement | undefined;

	const [isCanvasReady, toggleIsCanvasReady] = createSignal(false);
	const [isLoading, toggleIsLoading] = createSignal(true);
	const [progress, setProgress] = createSignal(0);

	onMount(() => {
		const container = ref;
		if (!container) {
			return;
		}

		const state = {
			rafId: 0,
		};

		const renderer = new Renderer({ dpr: local.dpr });
		const gl = renderer.gl;

		const background = hexToRgb(local.background);
		const tint = hexToRgb(local.tint);

		gl.clearColor(background[0], background[1], background[2], 1);

		const geometry = new Triangle(gl);

		const program = new Program(gl, {
			vertex: vertexShader,
			fragment: fragmentShader,
			uniforms: {
				iResolution: { value: [gl.canvas.width, gl.canvas.height] },
				iTime: { value: 0 },

				uBackgroundColor: { value: new Color(background[0], background[1], background[2]) },
				uGridSize: { value: local.size },
				uSpeed: { value: local.speed },
				uShapeColor: { value: new Color(tint[0], tint[1], tint[2]) },
			},
		});

		const mesh = new Mesh(gl, { geometry, program });

		const resize = () => {
			renderer.setSize(container.offsetWidth, container.offsetHeight);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height];
		};

		const resizeObserver = new ResizeObserver(() => resize());
		resizeObserver.observe(container);
		resize();

		const update = (t: number) => {
			state.rafId = requestAnimationFrame(update);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			program.uniforms.iTime.value = t * 0.001;

			renderer.render({ scene: mesh });

			if (isLoading()) {
				toggleIsLoading(false);
			}
		};

		state.rafId = requestAnimationFrame(update);
		container.appendChild(gl.canvas);

		onCleanup(() => {
			cancelAnimationFrame(state.rafId);

			resizeObserver.disconnect();

			if (gl.canvas.parentElement === container) {
				container.removeChild(gl.canvas);
			}

			gl.getExtension("WEBGL_lose_context")?.loseContext();
		});
	});

	// Animate progress bar when loading completes
	createEffect(() => {
		if (isLoading()) {
			return;
		}

		const state = {
			rafId: 0,
		};

		const duration = 2000;

		const start = Date.now();
		const animate = () => {
			const elapsed = Date.now() - start;
			const newProgress = Math.min((elapsed / duration) * 100, 100);

			setProgress(newProgress);

			if (newProgress >= 100) {
				state.rafId = requestAnimationFrame(() => {
					toggleIsCanvasReady(true);
				});

				return;
			}

			state.rafId = requestAnimationFrame(animate);
		};

		state.rafId = requestAnimationFrame(animate);

		onCleanup(() => {
			cancelAnimationFrame(state.rafId);
		});
	});

	return (
		<>
			<Show when={!isCanvasReady()}>
				<div class="absolute top-0 left-0 inline-flex h-full min-h-0 w-full items-center justify-center">
					<div class="bg-foreground/40 h-1 w-48 overflow-hidden">
						<div
							class="bg-foreground h-full w-[var(--progress)] transition-all duration-100 ease-linear"
							style={{ "--progress": `${progress()}%` }}
						/>
					</div>
				</div>
			</Show>

			<div
				{...rest}
				class={cn(
					"relative h-full w-full overflow-hidden transition-opacity duration-300",

					"data-[is-ready=false]:opacity-0",

					local.class,
				)}
				data-is-ready={isCanvasReady()}
				ref={ref}
			/>
		</>
	);
}
