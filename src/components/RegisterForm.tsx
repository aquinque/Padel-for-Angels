"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/client";
import { PRICE_PER_PLAYER, PRICE_PER_TEAM } from "@/lib/config";
import { BizumCard } from "./BizumCard";

type Mode = "team" | "solo";
type Step = "form" | "payment" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-court focus:ring-1 focus:ring-court";
const labelClass = "text-sm font-medium text-ink/80";

export function RegisterForm({ dict }: { dict: Dictionary }) {
  const [mode, setMode] = useState<Mode>("team");
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);

  // Team fields
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

  // Solo fields
  const [soloName, setSoloName] = useState("");
  const [soloEmail, setSoloEmail] = useState("");
  const [soloPhone, setSoloPhone] = useState("");
  const [soloCategory, setSoloCategory] = useState("");
  const [soloAmount, setSoloAmount] = useState(String(PRICE_PER_PLAYER));
  const [soloMessage, setSoloMessage] = useState("");

  // Shared payment step
  const [paymentReference, setPaymentReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setStep("form");
  }

  function goToPayment(e: FormEvent) {
    e.preventDefault();
    setStep("payment");
  }

  async function uploadProof(supabase: ReturnType<typeof createClient>, folder: string) {
    if (!proofFile) return null;
    const ext = proofFile.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("payment-proofs").upload(path, proofFile);
    if (error) throw error;
    return path;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const supabase = createClient();
      const proofPath = await uploadProof(supabase, "registrations");

      if (mode === "team") {
        const { data: team, error: teamError } = await supabase
          .from("teams")
          .insert({
            name: teamName || `${player1Name} & ${player2Name}`,
            source: "team_registration",
          })
          .select()
          .single();
        if (teamError) throw teamError;

        const { error } = await supabase.from("registrations").insert({
          registration_type: "team",
          team_id: team.id,
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
      } else {
        const { error } = await supabase.from("registrations").insert({
          registration_type: "solo",
          player1_name: soloName,
          player1_email: soloEmail,
          player1_phone: soloPhone,
          category: soloCategory || null,
          amount_due: PRICE_PER_PLAYER,
          amount_declared: soloAmount ? Number(soloAmount) : null,
          message: soloMessage || null,
          payment_reference: paymentReference || null,
          proof_path: proofPath,
        });
        if (error) throw error;
      }

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
        <h2 className="text-xl font-bold text-court-dark">
          {mode === "team" ? dict.register.successTitle : dict.register.soloSuccessTitle}
        </h2>
        <p className="mt-2 text-ink/70">
          {mode === "team" ? dict.register.successBody : dict.register.soloSuccessBody}
        </p>
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

  const ModeToggle = (
    <div className="mb-6">
      <p className={labelClass}>{dict.register.modeLabel}</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => switchMode("team")}
          className={`rounded-2xl border p-4 text-left transition-colors ${
            mode === "team" ? "border-court bg-court-light/60" : "border-black/10 bg-white"
          }`}
        >
          <p className="font-semibold text-court-dark">{dict.register.modeTeam}</p>
          <p className="mt-1 text-xs text-ink/60">{dict.register.modeTeamDesc}</p>
        </button>
        <button
          type="button"
          onClick={() => switchMode("solo")}
          className={`rounded-2xl border p-4 text-left transition-colors ${
            mode === "solo" ? "border-court bg-court-light/60" : "border-black/10 bg-white"
          }`}
        >
          <p className="font-semibold text-court-dark">{dict.register.modeSolo}</p>
          <p className="mt-1 text-xs text-ink/60">{dict.register.modeSoloDesc}</p>
        </button>
      </div>
    </div>
  );

  if (step === "form" && mode === "team") {
    const f = dict.register.fields;
    return (
      <div>
        {ModeToggle}
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
      </div>
    );
  }

  if (step === "form" && mode === "solo") {
    const f = dict.register.soloFields;
    return (
      <div>
        {ModeToggle}
        <form onSubmit={goToPayment} className="space-y-5">
          <h2 className="text-lg font-bold text-court-dark">{dict.register.soloFormTitle}</h2>
          <p className="rounded-xl bg-court-light/60 p-3 text-xs text-ink/70">
            {dict.register.soloPairingNote}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{f.name}</label>
              <input
                required
                className={inputClass}
                value={soloName}
                onChange={(e) => setSoloName(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>{f.email}</label>
              <input
                required
                type="email"
                className={inputClass}
                value={soloEmail}
                onChange={(e) => setSoloEmail(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>{f.phone}</label>
              <input
                required
                type="tel"
                className={inputClass}
                value={soloPhone}
                onChange={(e) => setSoloPhone(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>{f.category}</label>
              <input
                className={inputClass}
                placeholder={f.categoryPlaceholder}
                value={soloCategory}
                onChange={(e) => setSoloCategory(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>{f.message}</label>
            <textarea
              className={inputClass}
              rows={3}
              placeholder={f.messagePlaceholder}
              value={soloMessage}
              onChange={(e) => setSoloMessage(e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>{f.amount}</label>
            <input
              type="number"
              min={PRICE_PER_PLAYER}
              step="1"
              className={inputClass}
              value={soloAmount}
              onChange={(e) => setSoloAmount(e.target.value)}
            />
            <p className="mt-1 text-xs text-ink/50">{dict.register.soloPriceNote}</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-coral-dark"
          >
            {dict.register.submit}
          </button>
        </form>
      </div>
    );
  }

  // step === "payment"
  const paymentAmount = mode === "team" ? amount : soloAmount;
  const paymentReferenceDefault = mode === "team" ? player1Name : soloName;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-court-dark">{dict.register.paymentStepTitle}</h2>
        <p className="mt-1 text-sm text-ink/70">{dict.register.paymentStepIntro}</p>
      </div>

      <BizumCard dict={dict} amountLabel={`${paymentAmount} €`} />

      <div>
        <label className={labelClass}>{dict.register.paymentReferenceLabel}</label>
        <input
          className={inputClass}
          value={paymentReference}
          onChange={(e) => setPaymentReference(e.target.value)}
          placeholder={paymentReferenceDefault}
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
          onClick={() => setStep("form")}
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
