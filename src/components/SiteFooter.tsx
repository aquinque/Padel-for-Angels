import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { CONTACT_EMAIL, FOUNDATION_URL } from "@/lib/config";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-black/5 bg-court-light/60">
      <div className="container-page flex flex-col gap-6 py-10 text-sm text-ink/70 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <a href={FOUNDATION_URL} target="_blank" rel="noreferrer" className="shrink-0">
            <Image
              src="/images/tierras-angels-logo.png"
              alt="Tierra's Angels"
              width={900}
              height={1025}
              className="h-16 w-auto"
            />
          </a>
          <div>
            <p className="font-semibold text-court-dark">Padel for Angels</p>
            <p>{dict.footer.tagline}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href={`/${locale}/tournoi`} className="hover:text-court-dark">
            {dict.nav.tournament}
          </Link>
          <Link href={`/${locale}/fondation`} className="hover:text-court-dark">
            {dict.nav.foundation}
          </Link>
          <Link href={`/${locale}/inscription`} className="hover:text-court-dark">
            {dict.nav.register}
          </Link>
          <Link href={`/${locale}/cagnotte`} className="hover:text-court-dark">
            {dict.nav.fundraising}
          </Link>
          <Link href={`/${locale}/don`} className="hover:text-court-dark">
            {dict.nav.donate}
          </Link>
          <a href={FOUNDATION_URL} target="_blank" rel="noreferrer" className="hover:text-court-dark">
            tierrasangels.org
          </a>
        </nav>

        <div>
          <p>
            {dict.footer.contact}: <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
          </p>
          <p className="mt-1">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
