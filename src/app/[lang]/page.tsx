import Image from "next/image";
import Link from "next/link";
import { getDictionary, LOCALES, type Locale } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const locale = lang as Locale;

  return (
    <div>
      <section className="bg-gradient-to-b from-court-light to-paper">
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
          <Image
            src="/images/tierras-angels-logo.png"
            alt="Tierra's Angels"
            width={900}
            height={1025}
            className="h-20 w-auto sm:h-24"
            priority
          />
          <span className="rounded-full bg-court/10 px-4 py-1 text-sm font-semibold text-court-dark">
            {dict.home.heroKicker}
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
            {dict.home.heroTitle}
          </h1>
          <p className="max-w-xl text-lg text-ink/70">{dict.home.heroSubtitle}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/inscription`}
              className="rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark"
            >
              {dict.home.ctaRegister}
            </Link>
            <Link
              href={`/${locale}/don`}
              className="rounded-full border border-court px-6 py-3 text-base font-semibold text-court-dark transition-colors hover:bg-court/10"
            >
              {dict.home.ctaDonate}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-6 py-16 md:grid-cols-3">
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-court-dark">{dict.home.aboutTournamentTitle}</h2>
          <p className="mt-3 text-ink/70">{dict.home.aboutTournamentBody}</p>
          <Link
            href={`/${locale}/tournoi`}
            className="mt-4 inline-block text-sm font-semibold text-coral hover:underline"
          >
            {dict.home.aboutTournamentLink} →
          </Link>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-court-dark">{dict.home.aboutFoundationTitle}</h2>
          <p className="mt-3 text-ink/70">{dict.home.aboutFoundationBody}</p>
          <Link
            href={`/${locale}/fondation`}
            className="mt-4 inline-block text-sm font-semibold text-coral hover:underline"
          >
            {dict.home.aboutFoundationLink} →
          </Link>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-court-dark">{dict.home.aboutFundraisingTitle}</h2>
          <p className="mt-3 text-ink/70">{dict.home.aboutFundraisingBody}</p>
          <Link
            href={`/${locale}/cagnotte`}
            className="mt-4 inline-block text-sm font-semibold text-coral hover:underline"
          >
            {dict.home.aboutFundraisingLink} →
          </Link>
        </div>
      </section>

      <section className="bg-court-light/50 py-16">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold text-court-dark">
            {dict.home.howItWorksTitle}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dict.home.steps.map((step) => (
              <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="font-bold text-coral">{step.title}</p>
                <p className="mt-2 text-sm text-ink/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
