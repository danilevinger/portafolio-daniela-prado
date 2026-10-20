import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button-styles";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La ruta solicitada no forma parte del portafolio de Daniela Prado.",
};

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-ink px-6 text-paper">
      <div className="max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal">404</p>
        <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">Esta página no existe</h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-fog">
          El enlace no corresponde a una sección del portafolio.
        </p>
        <Link href="/" className={`${buttonClass.base} ${buttonClass.signal} mt-8`}>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
