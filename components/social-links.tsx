import { socialLinks } from "@/data/profile";
import { IconArrowUpRight, IconGitHub, IconLinkedIn } from "@/components/icons";

type SocialLinksProps = {
  tone?: "dark" | "light";
};

export function SocialLinks({ tone = "dark" }: SocialLinksProps) {
  const color = tone === "dark" ? "text-fog hover:text-signal" : "text-muted hover:text-copper";

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      {socialLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label}, se abre en una pestaña nueva`}
            className={`inline-flex items-center gap-2 text-sm font-medium transition ${color}`}
          >
            {link.label === "GitHub" ? <IconGitHub /> : <IconLinkedIn />}
            {link.label}
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
