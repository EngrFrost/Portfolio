import Link from "next/link";
import { notFound } from "next/navigation";
import { RiRadioButtonFill } from "react-icons/ri";
import ProjectCoverImage from "@/components/projects/ProjectCoverImage";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} — Ian John Samson` };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="w-full">
      <ProjectCoverImage
        src={project.cover}
        alt={project.title}
        title={project.title}
        subtitle={project.subtitle}
      />

      <div className="mx-auto grid max-w-content gap-12 px-4 py-16 md:grid-cols-5 md:px-8">
        <div className="md:col-span-3">
          <span className="section-number">Project</span>
          <h2 className="mt-2 text-3xl">Overview</h2>
          <p className="mt-6 leading-relaxed text-text-muted">{project.overview}</p>
          <div className="mt-8 flex gap-4">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition-transform hover:scale-105"
                data-cursor="interactive"
              >
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-surface-2 px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
                data-cursor="interactive"
              >
                Live Site
              </a>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-surface-2 bg-surface p-6 md:col-span-2">
          <p className="font-bold">Technologies</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
            {project.tech.map((t) => (
              <li key={t} className="flex items-center gap-2 text-text-muted">
                <RiRadioButtonFill className="text-accent" /> {t}
              </li>
            ))}
          </ul>
        </aside>

        <Link
          href="/#projects"
          className="text-accent underline underline-offset-4 md:col-span-5"
          data-cursor="interactive"
        >
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}
