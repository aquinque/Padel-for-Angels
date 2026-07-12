import Link from "next/link";
import { getDictionary, LOCALES, type Locale } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const locale = lang as Locale;
  const t = dict.tournament;

  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-extrabold text-court-dark sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl text-ink/70">{t.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.infoCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              {card.label}
            </p>
            <p className="mt-1 text-lg font-bold text-court-dark">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-court-light/60 p-6">
          <h2 className="font-bold text-court-dark">{t.formatTitle}</h2>
          <p className="mt-2 text-sm text-ink/70">{t.formatBody}</p>
        </div>
        <div className="rounded-2xl bg-court-light/60 p-6">
          <h2 className="font-bold text-court-dark">{t.scheduleTitle}</h2>
          <p className="mt-2 text-sm text-ink/70">{t.scheduleBody}</p>
        </div>
        <div className="rounded-2xl bg-court-light/60 p-6">
          <h2 className="font-bold text-court-dark">{t.prizesTitle}</h2>
          <p className="mt-2 text-sm text-ink/70">{t.prizesBody}</p>
        </div>
      </div>

      <div className="mt-12">
        <Link
          href={`/${locale}/inscription`}
          className="inline-block rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark"
        >
          {t.ctaRegister}
        </Link>
      </div>
    </div>
  );
}
