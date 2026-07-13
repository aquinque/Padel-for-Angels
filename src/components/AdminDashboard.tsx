"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  getProofSignedUrl,
  updateDonationStatus,
  updateRegistrationStatus,
  type SubmissionStatus,
} from "@/app/admin/actions";
import { teamDisplayName, teamFlag } from "@/lib/countries";

interface TeamRef {
  name: string;
  country_code: string | null;
}

export interface RegistrationRow {
  id: string;
  created_at: string;
  registration_type: "team" | "solo";
  team_name: string | null;
  teams: TeamRef | null;
  player1_name: string;
  player1_email: string;
  player1_phone: string;
  player2_name: string | null;
  player2_email: string | null;
  player2_phone: string | null;
  category: string | null;
  amount_due: number;
  amount_declared: number | null;
  message: string | null;
  payment_reference: string | null;
  proof_path: string | null;
  status: SubmissionStatus;
}

export interface DonationRow {
  id: string;
  created_at: string;
  donor_name: string | null;
  donor_email: string | null;
  amount_declared: number | null;
  message: string | null;
  proof_path: string | null;
  status: SubmissionStatus;
  for_team_id: string | null;
  teams: TeamRef | null;
}

export interface FundraisingRow {
  team_id: string;
  team_name: string;
  country_code: string | null;
  amount_raised: number;
  donation_count: number;
}

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  rejected: "Rejeté",
};

const STATUS_CLASS: Record<SubmissionStatus, string> = {
  pending: "bg-sun/20 text-amber-800",
  confirmed: "bg-court/15 text-court-dark",
  rejected: "bg-coral/15 text-coral-dark",
};

function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function ProofButton({ path }: { path: string | null }) {
  const [loading, setLoading] = useState(false);

  if (!path) return <span className="text-xs text-ink/40">Sans preuve</span>;

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const url = await getProofSignedUrl(path);
          window.open(url, "_blank", "noopener,noreferrer");
        } finally {
          setLoading(false);
        }
      }}
      className="text-xs font-semibold text-court-dark underline disabled:opacity-50"
    >
      {loading ? "…" : "Voir la preuve"}
    </button>
  );
}

function StatusActions({
  status,
  onChange,
}: {
  status: SubmissionStatus;
  onChange: (status: SubmissionStatus) => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {status !== "confirmed" && (
        <button
          disabled={pending}
          onClick={() => startTransition(() => onChange("confirmed"))}
          className="rounded-full bg-court px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          Confirmer
        </button>
      )}
      {status !== "rejected" && (
        <button
          disabled={pending}
          onClick={() => startTransition(() => onChange("rejected"))}
          className="rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          Rejeter
        </button>
      )}
      {status !== "pending" && (
        <button
          disabled={pending}
          onClick={() => startTransition(() => onChange("pending"))}
          className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-ink/70 disabled:opacity-50"
        >
          En attente
        </button>
      )}
    </div>
  );
}

export function AdminDashboard({
  registrations,
  donations,
  fundraising,
}: {
  registrations: RegistrationRow[];
  donations: DonationRow[];
  fundraising: FundraisingRow[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"registrations" | "donations" | "fundraising">("registrations");
  const [regs, setRegs] = useState(registrations);
  const [dons, setDons] = useState(donations);

  async function handleRegStatus(id: string, status: SubmissionStatus) {
    await updateRegistrationStatus(id, status);
    setRegs((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  async function handleDonStatus(id: string, status: SubmissionStatus) {
    await updateDonationStatus(id, status);
    setDons((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-black/5 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <div>
            <p className="font-bold text-court-dark">Padel for Angels — Organisateur</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-black/5"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      <div className="container-page py-8">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("registrations")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === "registrations" ? "bg-court text-white" : "bg-white text-ink/60"
            }`}
          >
            Inscriptions ({regs.length})
          </button>
          <button
            onClick={() => setTab("donations")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === "donations" ? "bg-court text-white" : "bg-white text-ink/60"
            }`}
          >
            Dons ({dons.length})
          </button>
          <button
            onClick={() => setTab("fundraising")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === "fundraising" ? "bg-court text-white" : "bg-white text-ink/60"
            }`}
          >
            Cagnotte des équipes
          </button>
        </div>

        {tab === "registrations" && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-black/5 text-xs uppercase text-ink/50">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Équipe</th>
                  <th className="px-4 py-3">Joueur 1</th>
                  <th className="px-4 py-3">Joueur 2</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Référence</th>
                  <th className="px-4 py-3">Preuve</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {regs.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-6 text-center text-ink/40">
                      Rien pour l&apos;instant.
                    </td>
                  </tr>
                )}
                {regs.map((r) => (
                  <tr key={r.id} className="border-b border-black/5 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-ink/60">
                      {new Date(r.created_at).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          r.registration_type === "solo"
                            ? "bg-sun/20 text-amber-800"
                            : "bg-court/15 text-court-dark"
                        }`}
                      >
                        {r.registration_type === "solo" ? "Solo" : "Équipe"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.teams ? (
                        <span>
                          {teamFlag(r.teams.country_code)} {teamDisplayName(r.teams, "fr")}
                        </span>
                      ) : r.registration_type === "solo" ? (
                        <span className="text-xs text-ink/40">En attente de partenaire</span>
                      ) : (
                        r.team_name || "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{r.player1_name}</p>
                      <p className="text-xs text-ink/50">{r.player1_email}</p>
                      <p className="text-xs text-ink/50">{r.player1_phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      {r.player2_name ? (
                        <>
                          <p className="font-medium">{r.player2_name}</p>
                          <p className="text-xs text-ink/50">{r.player2_email}</p>
                          <p className="text-xs text-ink/50">{r.player2_phone}</p>
                        </>
                      ) : (
                        <span className="text-xs text-ink/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.amount_declared ?? r.amount_due} €
                    </td>
                    <td className="px-4 py-3">{r.payment_reference || "—"}</td>
                    <td className="px-4 py-3">
                      <ProofButton path={r.proof_path} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusActions
                        status={r.status}
                        onChange={(s) => handleRegStatus(r.id, s)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "donations" && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-black/5 text-xs uppercase text-ink/50">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Donateur</th>
                  <th className="px-4 py-3">Pour</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Preuve</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dons.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-ink/40">
                      Rien pour l&apos;instant.
                    </td>
                  </tr>
                )}
                {dons.map((d) => (
                  <tr key={d.id} className="border-b border-black/5 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-ink/60">
                      {new Date(d.created_at).toLocaleString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{d.donor_name || "Anonyme"}</p>
                      <p className="text-xs text-ink/50">{d.donor_email}</p>
                    </td>
                    <td className="px-4 py-3">
                      {d.teams ? (
                        <span>
                          {teamFlag(d.teams.country_code)} {teamDisplayName(d.teams, "fr")}
                        </span>
                      ) : (
                        <span className="text-xs text-ink/40">Don général</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {d.amount_declared != null ? `${d.amount_declared} €` : "—"}
                    </td>
                    <td className="px-4 py-3 max-w-xs">{d.message || "—"}</td>
                    <td className="px-4 py-3">
                      <ProofButton path={d.proof_path} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusActions
                        status={d.status}
                        onChange={(s) => handleDonStatus(d.id, s)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "fundraising" && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="border-b border-black/5 text-xs uppercase text-ink/50">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Équipe</th>
                  <th className="px-4 py-3">Dons confirmés</th>
                  <th className="px-4 py-3">Fonds levés</th>
                </tr>
              </thead>
              <tbody>
                {fundraising.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink/40">
                      Rien pour l&apos;instant.
                    </td>
                  </tr>
                )}
                {fundraising.map((row, index) => (
                  <tr key={row.team_id} className="border-b border-black/5">
                    <td className="px-4 py-3 text-ink/50">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">
                      {teamFlag(row.country_code)}{" "}
                      {teamDisplayName({ name: row.team_name, country_code: row.country_code }, "fr")}
                    </td>
                    <td className="px-4 py-3">{row.donation_count}</td>
                    <td className="px-4 py-3 font-bold text-court-dark">
                      {Number(row.amount_raised).toFixed(0)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
