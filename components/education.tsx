import { education } from "@/data/education";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section
      id="formacion"
      aria-labelledby="formacion-titulo"
      className="scroll-mt-24 bg-paper-deep py-20 text-ink md:py-28"
    >
      <div className="section-rise mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading id="formacion-titulo" index="03" eyebrow="Formación" title="Estudios" />
          <p className="mt-8 max-w-3xl text-balance font-serif text-2xl leading-tight sm:text-3xl md:text-4xl">
            {education.degree}
          </p>
          <p className="mt-4 text-lg text-muted">{education.institution}</p>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.16em]">{education.years}</p>
        </Reveal>
      </div>
    </section>
  );
}
