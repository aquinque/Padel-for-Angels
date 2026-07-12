import { getDictionary, LOCALES } from "@/i18n/dictionaries";
import { BizumCard } from "@/components/BizumCard";
import { DonateForm } from "@/components/DonateForm";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-3xl font-extrabold text-court-dark sm:text-4xl">{dict.donate.title}</h1>
      <p className="mt-4 text-ink/70">{dict.donate.intro}</p>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-court-dark">{dict.donate.howTitle}</h2>
        <p className="mt-2 text-sm text-ink/70">{dict.donate.howBody}</p>
      </div>

      <div className="mt-6">
        <BizumCard dict={dict} />
      </div>

      <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <DonateForm dict={dict} />
      </div>
    </div>
  );
}
