import { createClient } from "@/lib/supabase/server";
import { AdminDashboard, type DonationRow, type RegistrationRow } from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ data: registrations }, { data: donations }] = await Promise.all([
    supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      registrations={(registrations ?? []) as RegistrationRow[]}
      donations={(donations ?? []) as DonationRow[]}
    />
  );
}
