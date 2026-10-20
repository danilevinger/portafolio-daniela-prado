type SkillMarkProps = {
  name: string;
};

export function SkillMark({ name }: SkillMarkProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      <Mark name={name} />
    </svg>
  );
}

function Mark({ name }: SkillMarkProps) {
  const label = shortLabel(name);

  if (name === "React") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
        <ellipse cx="24" cy="24" rx="13" ry="5.5" />
        <ellipse cx="24" cy="24" rx="13" ry="5.5" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="13" ry="5.5" transform="rotate(120 24 24)" />
      </g>
    );
  }

  if (name === "Tailwind CSS") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M10 20c3.2-4.2 6.4-4.2 9.6 0s6.4 4.2 9.6 0 6.4-4.2 8.8 0" />
        <path d="M10 28c3.2-4.2 6.4-4.2 9.6 0s6.4 4.2 9.6 0 6.4-4.2 8.8 0" />
      </g>
    );
  }

  if (name === "Node.js") {
    return (
      <path
        d="M24 11.5 35.5 18v12L24 36.5 12.5 30V18Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    );
  }

  if (name === "Docker") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="14" y="18" width="20" height="14" rx="2" />
        <path d="M18 18v-4h6v4" />
        <path d="M14 24h20" />
      </g>
    );
  }

  if (name === "API REST") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 16 12 24l6 8" />
        <path d="M30 16l6 8-6 8" />
        <path d="M27 14 21 34" />
      </g>
    );
  }

  if (name === "SQL Server") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="24" cy="16" rx="9" ry="3.4" />
        <path d="M15 16v12c0 1.9 4 3.4 9 3.4s9-1.5 9-3.4V16" />
        <path d="M15 22c0 1.9 4 3.4 9 3.4s9-1.5 9-3.4" />
      </g>
    );
  }

  if (name === "Scrum") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M30 18a8 8 0 0 0-13.2-3.2" />
        <path d="M18 30a8 8 0 0 0 13.2 3.2" />
        <path d="M16.2 16.2 14 20.8l4.6-.4" />
        <path d="M31.8 31.8 34 27.2l-4.6.4" />
      </g>
    );
  }

  if (name === "CI/CD") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="16" cy="24" r="3" />
        <circle cx="32" cy="24" r="3" />
        <path d="M19 24h10" />
        <path d="M26 21l3 3-3 3" />
      </g>
    );
  }

  if (name === "Git" || name === "GitHub") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="15" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="32" cy="15" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="33" r="2.2" fill="currentColor" stroke="none" />
        <path d="M16 17.2v13.6" />
        <path d="M16 18h12.2a3.2 3.2 0 0 1 3.2 3.2v0" />
      </g>
    );
  }

  return (
    <text
      x="24"
      y="29"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="var(--font-geist-mono), ui-monospace, monospace"
      fontSize={label.length > 3 ? 9 : 12}
      fontWeight="600"
    >
      {label}
    </text>
  );
}

function shortLabel(name: string) {
  switch (name) {
    case "HTML":
      return "</>";
    case "JavaScript":
      return "JS";
    case "TypeScript":
      return "TS";
    case "Next.js":
      return "N";
    case "Python":
      return "Py";
    case "SQL Server":
      return "SQL";
    case "Postman":
      return "API";
    case "Azure":
      return "Az";
    case "AWS":
      return "AWS";
    case "Vercel":
      return "▲";
    case ".NET":
      return ".NET";
    default:
      return name;
  }
}
