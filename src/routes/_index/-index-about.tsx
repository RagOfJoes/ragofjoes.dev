import { Windows } from "@/components/windows";

export function IndexAbout() {
	return (
		<Windows.Panel className="shrink-[0.3]" value="About">
			<Windows.Header>
				<Windows.Title />

				<Windows.Controls>
					<Windows.Reset />
					<Windows.Fullscreen />
					<Windows.Close />
				</Windows.Controls>
			</Windows.Header>

			<Windows.Content>
				<p>
					Victor is a software engineer with 7 years of experience building thoughtful digital
					products, from intuitive user interfaces to the systems that power them. He enjoys working
					across the stack, but has a particular appreciation for frontend engineering, design, and
					the small details that make software feel good to use.
				</p>
				<p>
					Originally from the Philippines and now based in the Bay Area, he approaches engineering
					with a product-minded perspective, valuing simplicity, craftsmanship, and close
					collaboration with designers and other engineers.
				</p>
				<p>
					Outside of engineering, he enjoys film, music, rock climbing, and finding new creative
					outlets. He also spends an unreasonable amount of time spoiling his cat,{" "}
					{/* TODO: open the Jiji gallery dialog */}
					<strong className="font-semibold">Jiji</strong>.
				</p>
			</Windows.Content>
		</Windows.Panel>
	);
}
