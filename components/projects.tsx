import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { IconArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="scroll-mt-24 bg-paper py-20 text-ink md:py-28"
    >
      <div className="section-rise mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading id="proyectos-titulo" index="01" eyebrow="Proyectos" title="Experiencia en desarrollo" />
        </Reveal>

        <div className="mt-12 grid gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden border border-ink/10 bg-white/40 transition duration-300 hover:border-copper/40 md:grid-cols-5">
      <div className="relative aspect-[19/10] bg-paper-deep md:col-span-3">
        {project.vercelUrl ? (
          <a
            href={project.vercelUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${project.title}`}
            className="absolute inset-0 block"
          >
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover object-top"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-ink px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal shadow-sm">
              Abrir
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        ) : (
          <Image
            src={project.image}
            alt={`Vista del proyecto ${project.title}`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-top"
          />
        )}
      </div>
      <div className="flex flex-col justify-center p-6 md:col-span-2 md:p-8">
        <h3 className="font-serif text-3xl leading-tight">{project.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-pretty text-muted">{project.summary}</p>
      </div>
    </article>
  );
}
