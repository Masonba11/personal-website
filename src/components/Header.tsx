"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo/Home Link - Centered on Mobile */}
          <Link
            href="/about"
            className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none text-2xl md:text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300"
          >
            MB
          </Link>

          {/* Empty div for spacing on mobile */}
          <div className="w-10 md:hidden"></div>

          {/* Navigation Links - Desktop Only */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: "/about", label: "About Me" },
              { path: "/education", label: "Education" },
              { path: "/business", label: "Business" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive(path)
                    ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/20 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              {[
                { path: "/about", label: "About Me" },
                { path: "/education", label: "Education" },
                { path: "/business", label: "Business" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium tracking-wide transition-all duration-300 ${
                    isActive(path)
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      : "text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
