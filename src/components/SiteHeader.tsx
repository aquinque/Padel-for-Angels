"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/tournoi`, label: dict.nav.tournament },
    { href: `/${locale}/fondation`, label: dict.nav.foundation },
    { href: `/${locale}/don`, label: dict.nav.donate },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-court-dark">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-court text-sm text-white">
            PA
          </span>
          <span className="text-lg">Padel for Angels</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-court-dark"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/inscription`}
            className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-dark"
          >
            {dict.nav.register}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
          aria-label="Menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-paper md:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink/70"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/inscription`}
              onClick={() => setOpen(false)}
              className="rounded-full bg-coral px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {dict.nav.register}
            </Link>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
