"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navLinks, profile } from "@/data/profile";
import { IconClose, IconMenu } from "@/components/icons";
import { Monogram } from "@/components/monogram";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function currentSection() {
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 48;
      if (atBottom) return navLinks[navLinks.length - 1].id;

      const probe = Math.min(window.innerHeight * 0.33, 320);
      let current: string = navLinks[0].id;
      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= probe) current = link.id;
      }
      return current;
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = currentSection();
        setActive((previous) => (previous === next ? previous : next));
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("a, button");
    first?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>("a, button");
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function followSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    setActive(id);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.pushState(null, "", `#${id}`);
    });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/90 text-paper backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#inicio"
          onClick={(event) => followSection(event, "inicio")}
          className="flex items-center gap-3"
          aria-label="Ir al inicio"
        >
          <Monogram />
          <span className="hidden font-serif text-lg leading-none sm:inline">{profile.name}</span>
        </a>

        <div className="flex items-center gap-6">
          <nav aria-label="Secciones" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative text-base transition ${isActive ? "text-signal" : "text-fog hover:text-paper"}`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px bg-signal transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: reduce || !open ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-ink lg:hidden"
          >
            <nav aria-label="Secciones móviles" className="mx-auto w-full max-w-6xl px-5 py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(event) => followSection(event, link.id)}
                      className={`block border-b border-white/10 py-3 font-serif text-[2rem] leading-none ${active === link.id ? "text-signal" : "text-paper"}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
