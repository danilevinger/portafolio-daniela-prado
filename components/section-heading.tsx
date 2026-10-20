type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  id: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = "light",
  id,
}: SectionHeadingProps) {
  const eyebrowColor = tone === "dark" ? "text-signal" : "text-copper";
  const titleColor = tone === "dark" ? "text-paper" : "text-ink";
  const descriptionColor = tone === "dark" ? "text-fog" : "text-muted";

  return (
    <div className="max-w-2xl">
      <p className={`font-mono text-xs uppercase tracking-[0.22em] ${eyebrowColor}`}>
        {index}
        <span className="px-2 opacity-50">/</span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-serif text-4xl leading-[1.02] tracking-tight text-balance md:text-6xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-xl text-base leading-relaxed text-pretty md:text-lg ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
