import Link from "next/link";

export function Logo({ tone = "light", linked = true }: { tone?: "light" | "dark"; linked?: boolean }) {
  const mark = tone === "light" ? "text-paper" : "text-ink";
  const markUp = (
    <>
      <span className={`font-script text-[2.6rem] leading-none ${mark}`}>MBall</span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-mist">
        Marketing
      </span>
    </>
  );
  if (!linked) {
    return <div className="inline-flex flex-col leading-none">{markUp}</div>;
  }
  return (
    <Link href="/" className="inline-flex flex-col leading-none">
      {markUp}
    </Link>
  );
}
