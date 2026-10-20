/**
 * Portfolio projects.
 * Set vercelUrl to the live Vercel deployment.
 * Images live in public/projects.
 */

export type Project = {
  slug: string;
  title: string;
  summary: string;
  vercelUrl: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "tienda-de-ropa",
    title: "Tienda de ropa",
    summary:
      "Plataforma web de comercio electrónico con catálogo de productos, filtros de búsqueda e información sobre pedidos internacionales, métodos de envío y condiciones de compra.",
    vercelUrl: "",
    image: "/projects/share-fashion.jpg",
  },
  {
    slug: "gestion-de-inventario",
    title: "Sistema de gestión de inventario",
    summary:
      "Aplicación web para el control de existencias, registro y consulta de productos, identificación de diferencias de inventario y generación de reportes en PDF.",
    vercelUrl: "",
    image: "/projects/inventario.png",
  },
  {
    slug: "control-de-almuerzos",
    title: "Control de almuerzos",
    summary: "Aplicación web para la gestión de horarios de almuerzo de colaboradores, con temporizadores, registro de tiempos, seguimiento de períodos y generación de reportes automatizados.",
    vercelUrl: "",
    image: "/projects/control-almuerzos.png",
  },
];
