import Link from "next/link";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const mark = tone === "light" ? "text-paper" : "text-ink";
  return (
    <Link href="/" className="inline-flex flex-col leading-none">
      <span className={`font-script text-[2.6rem] leading-none ${mark}`}>MBall</span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-mist">
        Marketing
      </span>
    </Link>
  );
}
