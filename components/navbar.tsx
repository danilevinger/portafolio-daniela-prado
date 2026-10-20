"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/90 text-paper backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
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
                      className={`relative text-sm transition ${isActive ? "text-signal" : "text-fog hover:text-paper"}`}
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
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-ink lg:hidden"
          >
            <nav aria-label="Secciones móviles" className="mx-auto w-full max-w-6xl px-5 py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className={`block border-b border-white/10 py-3 font-serif text-3xl ${active === link.id ? "text-signal" : "text-paper"}`}
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
