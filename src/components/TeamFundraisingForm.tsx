"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/client";
import { teamDisplayName, teamFlag } from "@/lib/countries";
import { BizumCard } from "./BizumCard";

interface TeamOption {
  id: string;
  name: string;
  country_code: string | null;
}

type Step = "form" | "success" | "error";

export function TeamFundraisingForm({
  dict,
  locale,
  teams,
}: {
  dict: Dictionary;
  locale: Locale;
  teams: TeamOption[];
}) {
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);

  const [teamId, setTeamId] = useState(teams[0]?.id ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!teamId) return;
    setSubmitting(true);

    try {
      const supabase = createClient();
      let proofPath: string | null = null;

      if (proofFile) {
        const ext = proofFile.name.split(".").pop();
        const path = `fundraising/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("payment-proofs")
          .upload(path, proofFile);
        if (uploadError) throw uploadError;
        proofPath = path;
      }

      const { error } = await supabase.from("donations").insert({
        for_team_id: teamId,
        donor_name: name || null,
        donor_email: email || null,
        amount_declared: amount ? Number(amount) : null,
        message: message || null,
        proof_path: proofPath,
      });

      if (error) throw error;
      setStep("success");
    } catch (err) {
      console.error(err);
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "success") {
    return (
      <div className="rounded-2xl border border-court/20 bg-court-light/60 p-8 text-center">
        <h2 className="text-xl font-bold text-court-dark">{dict.fundraising.successTitle}</h2>
        <p className="mt-2 text-ink/70">{dict.fundraising.successBody}</p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="rounded-2xl border border-coral/30 bg-coral/10 p-8 text-center">
        <h2 className="text-xl font-bold text-coral-dark">{dict.fundraising.errorTitle}</h2>
        <p className="mt-2 text-ink/70">{dict.fundraising.errorBody}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-court focus:ring-1 focus:ring-court";
  const labelClass = "text-sm font-medium text-ink/80";
  const f = dict.fundraising.fields;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-lg font-bold text-court-dark">{dict.fundraising.formTitle}</h2>

      <div>
        <label className={labelClass}>{f.team}</label>
        <select
          required
          className={inputClass}
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        >
          {teams.length === 0 && <option value="">{f.teamPlaceholder}</option>}
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {teamFlag(team.country_code)} {teamDisplayName(team, locale)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{f.name}</label>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>{f.email}</label>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{f.amount}</label>
        <input
          type="number"
          min={1}
          step="1"
          className={inputClass}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>{f.message}</label>
        <textarea
          className={inputClass}
          rows={3}
          placeholder={f.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <BizumCard dict={dict} amountLabel={amount ? `${amount} €` : undefined} />

      <div>
        <label className={labelClass}>{dict.fundraising.proofLabel}</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="mt-1 block w-full text-sm"
          onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
        />
        <p className="mt-1 text-xs text-ink/50">{dict.fundraising.proofHelp}</p>
      </div>

      <button
        type="submit"
        disabled={submitting || !teamId}
        className="w-full rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark disabled:opacity-60"
      >
        {submitting ? dict.fundraising.submitting : dict.fundraising.submit}
      </button>
    </form>
  );
}
