import type { Dictionary } from "@/i18n/dictionaries";
import { BIZUM_HOLDER, BIZUM_PHONE } from "@/lib/config";

export function BizumCard({ dict, amountLabel }: { dict: Dictionary; amountLabel?: string }) {
  return (
    <div className="rounded-2xl border border-court/20 bg-court-light/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-court-dark">
        {dict.bizum.title}
      </p>

      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-ink/60">{dict.bizum.holder}</dt>
          <dd className="font-semibold">{BIZUM_HOLDER}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-ink/60">{dict.bizum.phone}</dt>
          <dd className="font-mono text-base font-bold text-court-dark">{BIZUM_PHONE}</dd>
        </div>
        {amountLabel && (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-ink/60">{dict.bizum.amount}</dt>
            <dd className="font-semibold">{amountLabel}</dd>
          </div>
        )}
      </dl>

      <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-ink/70">
        {dict.bizum.instructions.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
