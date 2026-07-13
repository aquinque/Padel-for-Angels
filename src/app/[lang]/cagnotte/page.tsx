import { getDictionary, LOCALES, type Locale } from "@/i18n/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { teamDisplayName, teamFlag } from "@/lib/countries";
import { TeamFundraisingForm } from "@/components/TeamFundraisingForm";

interface FundraisingRow {
  team_id: string;
  team_name: string;
  country_code: string | null;
  amount_raised: number;
  donation_count: number;
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamic = "force-dynamic";

export default async function FundraisingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const locale = lang as Locale;

  const supabase = await createClient();

  const [{ data: teams, error: teamsError }, { data: leaderboard, error: leaderboardError }] =
    await Promise.all([
      supabase.from("teams").select("id, name, country_code").order("created_at", { ascending: true }),
      supabase.rpc("get_team_fundraising"),
    ]);

  if (teamsError) console.error("Failed to load teams:", teamsError);
  if (leaderboardError) console.error("Failed to load fundraising leaderboard:", leaderboardError);

  const teamOptions = teams ?? [];
  const rows = (leaderboard ?? []) as FundraisingRow[];

  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="text-3xl font-extrabold text-court-dark sm:text-4xl">
        {dict.fundraising.title}
      </h1>
      <p className="mt-4 text-ink/70">{dict.fundraising.intro}</p>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-court-dark">{dict.fundraising.leaderboardTitle}</h2>

        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-ink/50">{dict.fundraising.leaderboardEmpty}</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-ink/50">
                <tr>
                  <th className="py-2">#</th>
                  <th className="py-2">{dict.fundraising.teamColumn}</th>
                  <th className="py-2 text-right">{dict.fundraising.amountColumn}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.team_id} className="border-t border-black/5">
                    <td className="py-2 text-ink/50">{index + 1}</td>
                    <td className="py-2 font-medium">
                      {teamFlag(row.country_code)}{" "}
                      {teamDisplayName(
                        { name: row.team_name, country_code: row.country_code },
                        locale
                      )}
                    </td>
                    <td className="py-2 text-right font-bold text-court-dark">
                      {Number(row.amount_raised).toFixed(0)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <TeamFundraisingForm dict={dict} locale={locale} teams={teamOptions} />
      </div>
    </div>
  );
}
