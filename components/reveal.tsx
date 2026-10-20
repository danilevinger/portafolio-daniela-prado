import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
