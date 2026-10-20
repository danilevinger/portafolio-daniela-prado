import { profile } from "@/data/profile";
import { buttonClass } from "@/components/button-styles";
import { IconArrowUpRight } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden bg-ink pt-16 text-paper"
    >
      <div className="tech-grid hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pine/40 blur-3xl"
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-16 text-center md:px-8 md:py-20">
        <h1
          id="inicio-titulo"
          aria-label={`${profile.firstName} ${profile.lastName}`}
          className="w-full max-w-full font-serif text-[clamp(3.25rem,15vw,8rem)] leading-[0.86] tracking-[-0.045em]"
        >
          <NameLine text={profile.firstName} delay={0.04} />
          <NameLine text={profile.lastName} delay={0.42} className="italic text-ember" />
        </h1>
        <span aria-hidden="true" className="name-rule mt-8 block h-px w-16 bg-signal/80" />
        <p className="hero-rise d3 mt-6 font-sans text-lg text-paper md:text-xl">{profile.title}</p>
        <p className="hero-rise d4 mt-4 max-w-lg text-base leading-relaxed text-pretty text-fog md:text-lg">
          {profile.summary}
        </p>
        <div className="hero-rise d5 mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#proyectos" className={`${buttonClass.base} ${buttonClass.signal}`}>
            Ver proyectos
            <IconArrowUpRight />
          </a>
          <a href="#contacto" className={`${buttonClass.base} ${buttonClass.ghost}`}>
            Contactarme
          </a>
        </div>
        <div className="hero-rise d5 mt-8 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}

function NameLine({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="name-char"
          style={{ animationDelay: `${delay + index * 0.055}s` }}
        >
          {character}
        </span>
      ))}
    </span>
  );
}
