import { getDictionary, LOCALES } from "@/i18n/dictionaries";
import { RegisterForm } from "@/components/RegisterForm";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-3xl font-extrabold text-court-dark sm:text-4xl">
        {dict.register.title}
      </h1>
      <p className="mt-4 text-ink/70">{dict.register.intro}</p>

      <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <RegisterForm dict={dict} />
      </div>
    </div>
  );
}
