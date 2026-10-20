"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Intro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const closed = useRef(false);
  const dismissRef = useRef<() => void>(() => {});

  useEffect(() => {
    let hideTimer = 0;

    function dismiss() {
      if (closed.current) return;
      closed.current = true;
      try {
        window.sessionStorage.setItem("dp-intro", "1");
      } catch {
        // Ignore storage failures and continue the exit.
      }
      document.documentElement.classList.add("intro-ready");
      setLeaving(true);
      hideTimer = window.setTimeout(() => setVisible(false), 380);
    }

    dismissRef.current = dismiss;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("dp-intro") === "1";
    } catch {
      seen = false;
    }

    if (reduce || seen) {
      document.documentElement.classList.add("intro-ready", "skip-intro");
      return;
    }

    const showTimer = window.setTimeout(dismiss, 650);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      id="intro"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-ink text-paper ${leaving ? "is-leaving" : ""}`}
      initial={false}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
    >
      <button
        type="button"
        onClick={() => dismissRef.current()}
        className="absolute right-5 top-5 font-mono text-xs uppercase tracking-[0.18em] text-fog transition hover:text-signal"
      >
        Omitir
      </button>
      <div aria-hidden="true" className="w-[min(32rem,calc(100%-3rem))]">
        <div className="intro-line mb-8 h-px w-full bg-signal" />
        <p className="intro-fade font-mono text-xs uppercase tracking-[0.28em] text-signal">DP</p>
        <p className="intro-fade mt-4 font-serif text-5xl leading-none tracking-tight sm:text-7xl">
          Daniela Prado
        </p>
        <p className="intro-fade mt-4 font-mono text-xs uppercase tracking-[0.18em] text-fog">
          Ingeniera en Sistemas Computacionales
        </p>
      </div>
    </motion.div>
  );
}
