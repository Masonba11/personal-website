import Link from "next/link";

const styles = {
  primary:
    "bg-gold text-ink hover:bg-[#e4c27a] border border-gold",
  secondary:
    "border border-paper/30 text-paper hover:border-gold hover:text-gold",
  light:
    "border border-ink/20 text-ink hover:border-gold-deep hover:text-gold-deep",
} as const;

export function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-5 py-3 text-sm font-medium tracking-wide ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
