"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/client";

type Step = "form" | "success" | "error";

export function DonateForm({ dict }: { dict: Dictionary }) {
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const supabase = createClient();
      let proofPath: string | null = null;

      if (proofFile) {
        const ext = proofFile.name.split(".").pop();
        const path = `donations/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("payment-proofs")
          .upload(path, proofFile);
        if (uploadError) throw uploadError;
        proofPath = path;
      }

      const { error } = await supabase.from("donations").insert({
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
        <h2 className="text-xl font-bold text-court-dark">{dict.donate.successTitle}</h2>
        <p className="mt-2 text-ink/70">{dict.donate.successBody}</p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="rounded-2xl border border-coral/30 bg-coral/10 p-8 text-center">
        <h2 className="text-xl font-bold text-coral-dark">{dict.donate.errorTitle}</h2>
        <p className="mt-2 text-ink/70">{dict.donate.errorBody}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-court focus:ring-1 focus:ring-court";
  const labelClass = "text-sm font-medium text-ink/80";
  const f = dict.donate.fields;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-lg font-bold text-court-dark">{dict.donate.formTitle}</h2>
      <p className="text-xs text-ink/50">{dict.donate.optionalNote}</p>

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
          min={0}
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

      <div>
        <label className={labelClass}>{dict.donate.proofLabel}</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="mt-1 block w-full text-sm"
          onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
        />
        <p className="mt-1 text-xs text-ink/50">{dict.donate.proofHelp}</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark disabled:opacity-60"
      >
        {submitting ? dict.donate.submitting : dict.donate.submit}
      </button>

      <p className="text-center text-xs text-ink/50">{dict.donate.skipFormNote}</p>
    </form>
  );
}
