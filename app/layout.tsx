import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Portafolio de Daniela Prado, ingeniera en sistemas computacionales. Desarrollo de software frontend y backend, proyectos full stack y formación académica.";

export const metadata: Metadata = {
  title: {
    default: "Daniela Prado | Ingeniera en Sistemas Computacionales",
    template: "%s | Daniela Prado",
  },
  description,
  applicationName: "Portafolio de Daniela Prado",
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Daniela Prado",
    "ingeniera en sistemas computacionales",
    "desarrollo de software",
    "full stack",
    "Next.js",
    "React",
    "TypeScript",
    "SQL Server",
  ],
  openGraph: {
    title: "Daniela Prado | Ingeniera en Sistemas Computacionales",
    description,
    locale: "es_MX",
    type: "website",
    siteName: "Daniela Prado",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniela Prado | Ingeniera en Sistemas Computacionales",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1519",
  width: "device-width",
  initialScale: 1,
};

const introBoot = `(function(){try{var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var seen=window.sessionStorage.getItem("dp-intro")==="1";if(reduce||seen){document.documentElement.classList.add("skip-intro","intro-ready");}if(!reduce){document.documentElement.classList.add("section-motion");}}catch(e){}document.addEventListener("DOMContentLoaded",function(){var nodes=document.querySelectorAll(".section-rise");if(!document.documentElement.classList.contains("section-motion")||typeof IntersectionObserver!=="function"){for(var i=0;i<nodes.length;i++)nodes[i].classList.add("is-shown");return;}var io=new IntersectionObserver(function(entries){for(var i=0;i<entries.length;i++){if(!entries[i].isIntersecting)continue;entries[i].target.classList.add("is-shown");io.unobserve(entries[i].target);}},{rootMargin:"0px 0px -8% 0px",threshold:0.14});for(var j=0;j<nodes.length;j++)io.observe(nodes[j]);});setTimeout(function(){document.documentElement.classList.add("intro-ready");var intro=document.getElementById("intro");if(intro)intro.classList.add("is-leaving");},1600);})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: profile.email,
  url: profile.github,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Desarrollo de software",
    "Frontend",
    "Backend",
    "SQL Server",
    "Next.js",
    "React",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-paper font-sans text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: introBoot }} />
        <noscript>
          <style>{`html{overflow:auto !important}#intro{display:none !important}.hero-rise{opacity:1 !important;animation:none !important}`}</style>
        </noscript>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
