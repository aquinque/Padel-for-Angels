import { createClient } from "@/lib/supabase/server";
import {
  AdminDashboard,
  type DonationRow,
  type FundraisingRow,
  type RegistrationRow,
} from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { data: registrations, error: registrationsError },
    { data: donations, error: donationsError },
    { data: fundraising, error: fundraisingError },
  ] = await Promise.all([
    supabase
      .from("registrations")
      .select("*, teams(name, country_code)")
      .order("created_at", { ascending: false }),
    supabase
      .from("donations")
      .select("*, teams(name, country_code)")
      .order("created_at", { ascending: false }),
    supabase.rpc("get_team_fundraising"),
  ]);

  if (registrationsError) console.error("Failed to load registrations:", registrationsError);
  if (donationsError) console.error("Failed to load donations:", donationsError);
  if (fundraisingError) console.error("Failed to load fundraising leaderboard:", fundraisingError);

  return (
    <AdminDashboard
      registrations={(registrations ?? []) as RegistrationRow[]}
      donations={(donations ?? []) as DonationRow[]}
      fundraising={(fundraising ?? []) as FundraisingRow[]}
    />
  );
}
