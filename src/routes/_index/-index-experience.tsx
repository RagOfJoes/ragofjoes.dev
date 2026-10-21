import { Windows } from "@/components/windows";
import { cn } from "@/lib/cn";

const EXPERIENCE = [
	{
		company: "SenseMesh",
		role: "Lead Frontend Engineer",
		dates: "Feb 2025 - Aug 2026",
		highlights: [
			"Architected a React SPA, establishing reusable data-fetching patterns and type-safe API integrations adopted by other engineers.",
			"Introduced Storybook across the application, enabling designers to independently explore components, refine interactions, and collaborate on UI development.",
			"Built the primary chat-first interface using LLM tool calling, enabling natural-language detection searches and security workflows with seamless transitions to traditional forms for refinement.",
			"Developed a video pipeline using NATS, FFmpeg, and LL-HLS, enabling low-latency browser playback and on-demand viewing through Google Cloud Storage.",
			"Established the initial gRPC architecture using Protocol Buffers and Envoy, providing strongly typed APIs across frontend and backend services.",
			"Integrated Ory for identity management and implemented RBAC with tenant-scoped data access across public and internal services.",
		],
	},
	{
		company: "Offset Partners",
		role: "Senior Software Engineer",
		dates: "May 2021 - Oct 2024",
		highlights: [
			"Rebuilt and redesigned the product dashboard in React, launching a block-based CMS adopted by new and existing winery clients.",
			"Modernized a legacy PHP/jQuery frontend with Webpack and route-aware asset loading, reducing build times by ~80% and eliminating unnecessary JavaScript delivery.",
			"Refactored an in-house PHP MVC framework, restructuring application routing and shared utilities while consolidating duplicated code.",
			"Optimized MySQL queries within a legacy data architecture, improving API response times by ~50%.",
		],
	},
	{
		company: "Offset Partners",
		role: "Junior Software Engineer",
		dates: "Jul 2019 - May 2021",
		highlights: [
			"Replaced FTP-based development workflows with Dockerized local environments and GitHub Actions CI, enabling independent development and automated code-quality checks.",
			"Collaborated with winery stakeholders and designers to translate business requirements into customer-facing interfaces.",
		],
	},
	{
		company: "Napa Valley College",
		role: "Computer Science Tutor",
		dates: "Aug 2018 - May 2019",
		highlights: [
			"Tutored students in programming fundamentals, algorithms, and computer science coursework.",
			"Collaborated with faculty to support students with assignments, projects, and exam preparation.",
		],
	},
];

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
							key={`${job.company}-${job.role}`}
							className={cn(
								"inline-flex flex-col pb-2",

								"not-last:border-b",
							)}
						>
							<h3 className="font-sans text-sm leading-none font-semibold">{job.company}</h3>
							<h4 className="font-sans text-xs leading-none font-medium text-muted-foreground">
								{job.role}
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
