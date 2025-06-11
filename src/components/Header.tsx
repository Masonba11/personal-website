"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { path: "/about", label: "About Me" },
    { path: "/education", label: "Education" },
    { path: "/business", label: "Business" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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

          {/* Logo - Centered on all screens */}
          <Link
            href="/about"
            className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] transition-all duration-300"
          >
            MB
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
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
            className={`md:hidden fixed inset-0 top-16 bg-gray-100 transform transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-center py-4 text-lg font-medium tracking-wide transition-all duration-300 ${
                    isActive(path)
                      ? "text-black bg-gray-200"
                      : "text-gray-700 hover:text-black hover:bg-gray-200"
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
