"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { skillCategories, skills, type SkillCategory } from "@/data/skills";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { SkillMark } from "@/components/skill-mark";

export function Skills() {
  const scroller = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce !== false || paused) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const timer = window.setInterval(() => {
      const list = scroller.current;
      if (!list || document.hidden) return;
      const max = list.scrollWidth - list.clientWidth;
      if (max <= 8) return;
      const amount = cardStep(list);
      if (list.scrollLeft >= max - 8) {
        list.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        list.scrollBy({ left: amount, behavior: "smooth" });
      }
    }, 2800);

    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  function move(direction: -1 | 1) {
    const list = scroller.current;
    if (!list) return;
    list.scrollBy({ left: direction * cardStep(list), behavior: "smooth" });
  }

  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-titulo"
      className="scroll-mt-24 bg-ink py-24 text-paper md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="section-rise mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="habilidades-titulo"
          index="02"
          eyebrow="Habilidades"
          tone="dark"
          title="Stack de trabajo"
          description="Frontend, backend, datos, nube y la forma de trabajo con la que llevo un sistema de la idea al despliegue."
        />

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Categorías">
          {skillCategories.map((category) => (
            <li
              key={category}
              className="border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fog"
            >
              {category}
            </li>
          ))}
        </ul>

        <div className="@container relative mt-8">
          <button
            type="button"
            onClick={() => move(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-ink text-paper transition hover:border-signal hover:text-signal md:inline-flex"
            aria-label="Ver habilidades anteriores"
          >
            <IconArrowLeft className="h-5 w-5" />
          </button>
          <ul
            ref={scroller}
            className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 md:scroll-pl-14 md:scroll-pr-14 md:gap-4 md:px-14"
            aria-label="Habilidades técnicas"
          >
            {skills.map((skill) => (
              <li key={skill.name} className="snap-start">
                <SkillCard name={skill.name} category={skill.category} reduce={reduce === true} />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => move(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-ink text-paper transition hover:border-signal hover:text-signal md:inline-flex"
            aria-label="Ver siguientes habilidades"
          >
            <IconArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  name,
  category,
  reduce,
}: {
  name: string;
  category: SkillCategory;
  reduce: boolean;
}) {
  return (
    <motion.article
      className="group flex h-36 w-[calc((100cqw-1rem)/3)] min-w-0 shrink-0 flex-col justify-between border border-white/10 bg-white/[0.03] p-2.5 text-fog transition duration-300 hover:border-signal/70 hover:text-signal sm:h-44 sm:w-40 sm:p-4"
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="[&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-11 sm:[&_svg]:w-11">
        <SkillMark name={name} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[13px] font-medium leading-tight text-balance text-paper sm:text-base">{name}</h3>
        <p className="mt-1 font-mono text-[8px] uppercase leading-tight tracking-normal sm:text-[10px] sm:tracking-[0.14em]">
          {category}
        </p>
      </div>
    </motion.article>
  );
}

function cardStep(list: HTMLUListElement) {
  const card = list.querySelector("li");
  if (!card) return 176;
  const styles = window.getComputedStyle(list);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "16");
  return card.getBoundingClientRect().width + gap;
}
