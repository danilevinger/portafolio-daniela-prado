import { profile, siteYear } from "@/data/profile";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-fog">
      <div className="section-rise mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-serif text-2xl text-paper">{profile.name}</p>
          <p className="mt-1 text-sm">{profile.title}</p>
        </div>
        <SocialLinks />
        <p className="font-mono text-xs uppercase tracking-[0.16em]">© {siteYear}</p>
      </div>
    </footer>
  );
}
