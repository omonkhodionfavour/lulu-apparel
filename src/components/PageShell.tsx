import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-5xl">{title}</h1>
      {intro && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-12 space-y-10">{children}</div>
    </div>
  );
}

export function Clause({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
