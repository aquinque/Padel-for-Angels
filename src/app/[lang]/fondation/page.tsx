import Image from "next/image";
import Link from "next/link";
import { getDictionary, LOCALES, type Locale } from "@/i18n/dictionaries";
import { FOUNDATION_URL } from "@/lib/config";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function FoundationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const locale = lang as Locale;
  const f = dict.foundation;

  return (
    <div className="container-page py-16">
      <Image
        src="/images/tierras-angels-logo.png"
        alt="Tierra's Angels"
        width={900}
        height={1025}
        className="h-32 w-auto sm:h-40"
        priority
      />
      <h1 className="mt-6 text-3xl font-extrabold text-court-dark sm:text-4xl">{f.title}</h1>
      <p className="mt-4 max-w-2xl text-ink/70">{f.intro}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-court-dark">{f.storyTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.storyBody}</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-court-dark">{f.missionTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.missionBody}</p>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-bold text-court-dark">{f.programsTitle}</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {f.programs.map((p) => (
          <div key={p.title} className="rounded-2xl bg-court-light/60 p-6">
            <h3 className="font-semibold text-court-dark">{p.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{p.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-xs text-ink/50">{f.statusNote}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={FOUNDATION_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-court px-6 py-3 text-sm font-semibold text-court-dark transition-colors hover:bg-court/10"
        >
          {f.officialSite}
        </a>
        <Link
          href={`/${locale}/don`}
          className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-coral-dark"
        >
          {f.ctaDonate}
        </Link>
      </div>
    </div>
  );
}
