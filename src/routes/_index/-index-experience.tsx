import { Windows } from "@/components/windows";
import { cn } from "@/lib/cn";
import { RESUME } from "@/lib/constants";

// One entry per role, each under its company's name
const EXPERIENCE = RESUME.experience.flatMap((company) =>
	company.roles.map((role) => ({ company: company.name, ...role })),
);

export function IndexExperience() {
	return (
		<Windows.Panel value="Experience">
			<Windows.Header>
				<Windows.Title />

				<Windows.Controls>
					<Windows.Reset />
					<Windows.Fullscreen />
					<Windows.Close />
				</Windows.Controls>
			</Windows.Header>

			<Windows.Content>
				<ul className="inline-flex flex-col gap-2">
					{EXPERIENCE.map((job) => (
						<li
							key={`${job.company}-${job.title}`}
							className={cn(
								"inline-flex flex-col pb-2",

								"not-last:border-b",
							)}
						>
							<h3 className="font-sans text-sm leading-none font-semibold">{job.company}</h3>
							<h4 className="font-sans text-xs leading-none font-medium text-muted-foreground">
								{job.title}
							</h4>

							<div className="mt-1 inline-flex w-fit items-center bg-foreground p-0.5 text-background">
								<span className="font-mono text-[10px] leading-none font-bold">{job.dates}</span>
							</div>

							<ul className="mt-2 inline-flex flex-col gap-2">
								{job.highlights.map((highlight) => (
									<li key={highlight}>
										<p>{highlight}</p>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</Windows.Content>
		</Windows.Panel>
	);
}
