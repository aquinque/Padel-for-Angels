import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

export function SupportBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div className="border-b border-black/5 bg-court-light/70">
      <div className="container-page flex items-center justify-center gap-2 py-1.5">
        <Link
          href={`/${locale}/fondation`}
          className="flex items-center gap-2 text-xs font-semibold text-court-dark transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/tierras-angels-logo.png"
            alt="Tierra's Angels"
            width={900}
            height={1025}
            className="h-5 w-auto"
            priority
          />
          {dict.nav.supportedBy}
        </Link>
      </div>
    </div>
  );
}
