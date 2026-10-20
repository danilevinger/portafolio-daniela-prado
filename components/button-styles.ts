export const buttonClass = {
  base: "inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-medium transition duration-300",
  signal: "bg-signal text-ink hover:bg-paper",
  ghost:
    "border border-white/30 text-paper hover:border-signal hover:text-signal",
  ink: "bg-ink text-paper hover:bg-pine",
  line: "border border-ink/15 bg-transparent text-ink hover:border-ink",
} as const;
