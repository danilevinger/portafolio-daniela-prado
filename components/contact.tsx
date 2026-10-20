import { profile } from "@/data/profile";
import { ContactForm } from "@/components/contact-form";
import { IconMail } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="scroll-mt-24 bg-ink py-24 text-paper md:py-32"
    >
      <div className="section-rise mx-auto grid w-full max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:items-start">
        <Reveal className="min-w-0 lg:col-span-5">
          <SectionHeading
            id="contacto-titulo"
            index="04"
            eyebrow="Contacto"
            tone="dark"
            title="Construyamos algo concreto"
            description="Si tienes una vacante, un proyecto o una idea que necesite desarrollo, me encantará leerla."
          />
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 flex w-full max-w-full items-center gap-3 font-serif text-lg italic leading-snug text-paper transition hover:text-signal sm:text-xl"
          >
            <IconMail className="h-5 w-5 shrink-0 text-signal" />
            <span className="min-w-0 break-words">{profile.email}</span>
          </a>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </Reveal>
        <div className="min-w-0 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
