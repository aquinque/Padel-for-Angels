"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/i18n/dictionaries";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-sm font-medium">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === locale
              ? "bg-court text-white"
              : "text-ink/60 hover:text-ink"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
