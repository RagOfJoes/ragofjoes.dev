import { Windows } from "@/components/windows";
import { cn } from "@/lib/cn";

const SOCIALS = [
	{ href: "https://github.com/ragofjoes", title: "GitHub" },
	{ href: "https://linkedin.com/in/ragofjoes", title: "LinkedIn" },
	{ href: "https://letterboxd.com/ragofjoes", title: "Letterboxd" },
];

export function IndexSocials() {
	return (
		<Windows.Panel value="Socials">
			<Windows.Header>
				<Windows.Title />

				<Windows.Controls>
					<Windows.Reset />
					<Windows.Fullscreen />
					<Windows.Close />
				</Windows.Controls>
			</Windows.Header>

			<Windows.Content>
				<ul className="inline-flex flex-col gap-1">
					{SOCIALS.map((social) => (
						<li
							key={social.href}
							className={cn(
								"inline-flex flex-col gap-1 pb-2",

								"not-last:border-b",
							)}
						>
							<h3 className="font-mono text-[11px] font-semibold">[{social.title}]</h3>

							<a
								className={cn(
									"w-fit font-mono text-[11px] font-medium underline",

									"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
									"hover:bg-foreground hover:text-background hover:no-underline",
								)}
								href={social.href}
								rel="me noopener noreferrer"
								target="_blank"
							>
								{social.href}
							</a>
						</li>
					))}
				</ul>
			</Windows.Content>
		</Windows.Panel>
	);
}
