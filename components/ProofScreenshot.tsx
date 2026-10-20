"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { Shot } from "@/lib/case-studies";

export function ProofScreenshot({ shot }: { shot: Shot }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      dialog.close();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  return (
    <figure className="border border-ink/10 bg-white">
      <button
        type="button"
        className="block w-full cursor-zoom-in text-left"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-label={`Enlarge screenshot: ${shot.caption}`}
      >
        <span className="relative block bg-charcoal" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
          />
        </span>
      </button>
      <figcaption className="border-t border-ink/10 px-4 py-3 text-sm leading-relaxed text-body">
        {shot.caption}
        <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-gold-deep">Click to enlarge</span>
      </figcaption>
      <dialog
        ref={dialogRef}
        className="shot-dialog"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <p id={titleId} className="text-sm leading-relaxed text-paper">
            {shot.caption}
          </p>
          <button
            type="button"
            className="shrink-0 border border-gold px-3 py-2 text-sm text-gold"
            onClick={() => dialogRef.current?.close()}
          >
            Close
          </button>
        </div>
        <div className="relative mt-4" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
          <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-contain" />
        </div>
      </dialog>
    </figure>
  );
}
