type MonogramProps = {
  className?: string;
};

export function Monogram({ className = "" }: MonogramProps) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center border border-signal/80 font-mono text-[11px] tracking-wide text-signal ${className}`}
    >
      DP
    </span>
  );
}
