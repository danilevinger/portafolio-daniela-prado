"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { skillCategories, skills, type SkillCategory } from "@/data/skills";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { SkillMark } from "@/components/skill-mark";

export function Skills() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const resumeTimer = useRef(0);
  const drag = useRef({ active: false, startX: 0, startY: 0, startOffset: 0, decided: false });
  const reduce = useReducedMotion();

  function applyOffset() {
    const row = track.current;
    if (!row) return;
    const half = row.scrollWidth / 2;
    if (half > 8) {
      offset.current = ((offset.current % half) + half) % half;
    }
    row.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  }

  useEffect(() => {
    if (reduce !== false) return;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!paused.current && !document.hidden) {
        const delta = last ? Math.min(now - last, 40) : 16;
        offset.current += delta * 0.022;
      }
      last = now;
      applyOffset();
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resumeTimer.current);
    };
  }, [reduce]);

  function hold() {
    paused.current = true;
    window.clearTimeout(resumeTimer.current);
  }

  function release() {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      paused.current = false;
    }, 1600);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    hold();
    drag.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: offset.current,
      decided: false,
    };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state.active) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (!state.decided) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      state.decided = true;
      if (Math.abs(dy) > Math.abs(dx)) {
        state.active = false;
        release();
        return;
      }
      try {
        viewport.current?.setPointerCapture(event.pointerId);
      } catch {
        // A pointer that already ended cannot be captured.
      }
    }
    offset.current = state.startOffset - dx;
    applyOffset();
  }

  function onPointerUp() {
    if (!drag.current.active && drag.current.decided) return;
    drag.current.active = false;
    release();
  }

  function move(direction: -1 | 1) {
    const row = track.current;
    if (!row) return;
    hold();
    offset.current += direction * cardStep(row);
    applyOffset();
    release();
  }

  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-titulo"
      className="scroll-mt-24 bg-ink py-24 text-paper md:py-32"
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

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            onFocus={hold}
            onBlur={release}
            className="hidden h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-paper transition hover:border-signal hover:text-signal md:inline-flex"
            aria-label="Ver habilidades anteriores"
          >
            <IconArrowLeft className="h-5 w-5" />
          </button>
          <div
            ref={viewport}
            className="@container min-w-0 flex-1 overflow-hidden touch-pan-y"
            aria-label="Habilidades técnicas"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <ul ref={track} className="flex w-max gap-2 will-change-transform md:gap-4">
              {skills.map((skill) => (
                <li key={skill.name}>
                  <SkillCard name={skill.name} category={skill.category} reduce={reduce === true} />
                </li>
              ))}
              {skills.map((skill) => (
                <li key={`${skill.name}-loop`} aria-hidden="true">
                  <SkillCard name={skill.name} category={skill.category} reduce={reduce === true} />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            onFocus={hold}
            onBlur={release}
            className="hidden h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-paper transition hover:border-signal hover:text-signal md:inline-flex"
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

function cardStep(row: HTMLUListElement) {
  const card = row.querySelector("li");
  if (!card) return 176;
  const styles = window.getComputedStyle(row);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "16");
  return card.getBoundingClientRect().width + gap;
}
