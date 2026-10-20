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
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="habilidades-titulo"
            index="02"
            eyebrow="Habilidades"
            tone="dark"
            title="Stack de trabajo"
            description="Frontend, backend, datos, nube y la forma de trabajo con la que llevo un sistema de la idea al despliegue."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              className="inline-flex h-12 w-12 items-center justify-center border border-white/20 text-paper transition hover:border-signal hover:text-signal"
              aria-label="Ver habilidades anteriores"
            >
              <IconArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="inline-flex h-12 w-12 items-center justify-center border border-white/20 text-paper transition hover:border-signal hover:text-signal"
              aria-label="Ver siguientes habilidades"
            >
              <IconArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

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

        <ul
          ref={scroller}
          className="scrollbar-none mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          aria-label="Habilidades técnicas"
        >
          {skills.map((skill) => (
            <li key={skill.name} className="snap-start">
              <SkillCard name={skill.name} category={skill.category} reduce={reduce === true} />
            </li>
          ))}
        </ul>
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
      className="group flex h-44 w-40 shrink-0 flex-col justify-between border border-white/10 bg-white/[0.03] p-4 text-fog transition duration-300 hover:border-signal/70 hover:text-signal"
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <SkillMark name={name} />
      <div>
        <h3 className="text-base font-medium text-paper">{name}</h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]">{category}</p>
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
