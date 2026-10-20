/** Personal content for the portfolio. */

export const siteYear = 2026;

export const profile = {
  name: "Daniela Prado",
  firstName: "Daniela",
  lastName: "Prado",
  title: "Ingeniera en Sistemas Computacionales",

  summary:
    "Desarrollo soluciones tecnológicas que combinan funcionalidad, diseño y eficiencia, integrando conocimientos de frontend, backend y gestión de procesos.",
  email: "danipradomolina@gmail.com",
  github: "https://github.com/danilevinger",
  linkedin: "https://www.linkedin.com/in/danilevinger",
} as const;

export const socialLinks = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
] as const;

export const navLinks = [
  { href: "#inicio", id: "inicio", label: "Inicio" },
  { href: "#proyectos", id: "proyectos", label: "Proyectos" },
  { href: "#habilidades", id: "habilidades", label: "Habilidades" },
  { href: "#formacion", id: "formacion", label: "Formación" },
  { href: "#contacto", id: "contacto", label: "Contacto" },
] as const;
