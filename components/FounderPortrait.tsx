import fs from "fs";
import path from "path";
import Image from "next/image";

const files = ["mason-ball.jpg", "mason-ball.jpeg", "mason-ball.png", "mason-ball.webp"];

export function FounderPortrait() {
  const found = files.find((name) => fs.existsSync(path.join(process.cwd(), "public", "images", name)));

  if (found) {
    return (
      <Image
        src={`/images/${found}`}
        alt="Mason Ball, founder of MBall Marketing"
        width={900}
        height={1125}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full min-h-80 flex-col justify-between bg-charcoal p-8 text-paper" role="img" aria-label="Placeholder for a photograph of Mason Ball">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Founder</p>
      <div>
        <p className="font-script text-6xl leading-none">MBall</p>
        <p className="mt-4 font-serif text-2xl">Portrait coming soon</p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
          This frame is reserved for a real photograph of Mason Ball. It is not a generated portrait.
        </p>
      </div>
    </div>
  );
}
