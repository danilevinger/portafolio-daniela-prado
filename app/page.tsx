import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <Intro />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
