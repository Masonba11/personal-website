import { Shell } from "@/components/Shell";

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-ink text-paper">
      <Shell className="py-16 md:py-24">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.08] md:text-6xl">{title}</h1>
        {lede ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{lede}</p> : null}
        {children}
      </Shell>
    </header>
  );
}
