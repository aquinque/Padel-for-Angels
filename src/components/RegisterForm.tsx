"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/client";
import { PRICE_PER_TEAM } from "@/lib/config";
import { BizumCard } from "./BizumCard";

type Step = "team" | "payment" | "success" | "error";

export function RegisterForm({ dict }: { dict: Dictionary }) {
  const [step, setStep] = useState<Step>("team");
  const [submitting, setSubmitting] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player1Email, setPlayer1Email] = useState("");
  const [player1Phone, setPlayer1Phone] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player2Email, setPlayer2Email] = useState("");
  const [player2Phone, setPlayer2Phone] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(String(PRICE_PER_TEAM));
  const [message, setMessage] = useState("");

  const [paymentReference, setPaymentReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);

  function goToPayment(e: FormEvent) {
    e.preventDefault();
    setStep("payment");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const supabase = createClient();
      let proofPath: string | null = null;

      if (proofFile) {
        const ext = proofFile.name.split(".").pop();
        const path = `registrations/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("payment-proofs")
          .upload(path, proofFile);
        if (uploadError) throw uploadError;
        proofPath = path;
      }

      const { error } = await supabase.from("registrations").insert({
        team_name: teamName || null,
        player1_name: player1Name,
        player1_email: player1Email,
        player1_phone: player1Phone,
        player2_name: player2Name,
        player2_email: player2Email || null,
        player2_phone: player2Phone || null,
        category: category || null,
        amount_due: PRICE_PER_TEAM,
        amount_declared: amount ? Number(amount) : null,
        message: message || null,
        payment_reference: paymentReference || null,
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
        <h2 className="text-xl font-bold text-court-dark">{dict.register.successTitle}</h2>
        <p className="mt-2 text-ink/70">{dict.register.successBody}</p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="rounded-2xl border border-coral/30 bg-coral/10 p-8 text-center">
        <h2 className="text-xl font-bold text-coral-dark">{dict.register.errorTitle}</h2>
        <p className="mt-2 text-ink/70">{dict.register.errorBody}</p>
        <button
          type="button"
          onClick={() => setStep("payment")}
          className="mt-4 rounded-full bg-coral px-5 py-2 text-sm font-semibold text-white"
        >
          {dict.common.back}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-court focus:ring-1 focus:ring-court";
  const labelClass = "text-sm font-medium text-ink/80";

  if (step === "team") {
    const f = dict.register.fields;
    return (
      <form onSubmit={goToPayment} className="space-y-5">
        <h2 className="text-lg font-bold text-court-dark">{dict.register.formTitle}</h2>

        <div>
          <label className={labelClass}>{f.teamName}</label>
          <input
            className={inputClass}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{f.player1Name}</label>
            <input
              required
              className={inputClass}
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>{f.player1Email}</label>
            <input
              required
              type="email"
              className={inputClass}
              value={player1Email}
              onChange={(e) => setPlayer1Email(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>{f.player1Phone}</label>
            <input
              required
              type="tel"
              className={inputClass}
              value={player1Phone}
              onChange={(e) => setPlayer1Phone(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>{f.category}</label>
            <input
              className={inputClass}
              placeholder={f.categoryPlaceholder}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{f.player2Name}</label>
            <input
              required
              className={inputClass}
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>{f.player2Email}</label>
            <input
              type="email"
              className={inputClass}
              value={player2Email}
              onChange={(e) => setPlayer2Email(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>{f.player2Phone}</label>
            <input
              type="tel"
              className={inputClass}
              value={player2Phone}
              onChange={(e) => setPlayer2Phone(e.target.value)}
            />
          </div>
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
          <label className={labelClass}>{f.amount}</label>
          <input
            type="number"
            min={PRICE_PER_TEAM}
            step="1"
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="mt-1 text-xs text-ink/50">{dict.register.priceNote}</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark"
        >
          {dict.register.submit}
        </button>
      </form>
    );
  }

  // step === "payment"
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-court-dark">{dict.register.paymentStepTitle}</h2>
        <p className="mt-1 text-sm text-ink/70">{dict.register.paymentStepIntro}</p>
      </div>

      <BizumCard dict={dict} amountLabel={`${amount} €`} />

      <div>
        <label className={labelClass}>{dict.register.paymentReferenceLabel}</label>
        <input
          className={inputClass}
          value={paymentReference}
          onChange={(e) => setPaymentReference(e.target.value)}
          placeholder={player1Name}
        />
        <p className="mt-1 text-xs text-ink/50">{dict.register.paymentReferenceHelp}</p>
      </div>

      <div>
        <label className={labelClass}>{dict.register.proofLabel}</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="mt-1 block w-full text-sm"
          onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
        />
        <p className="mt-1 text-xs text-ink/50">{dict.register.proofHelp}</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep("team")}
          className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink/70"
        >
          {dict.common.back}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark disabled:opacity-60"
        >
          {submitting ? dict.register.submitting : dict.register.confirmSubmit}
        </button>
      </div>
    </form>
  );
}
