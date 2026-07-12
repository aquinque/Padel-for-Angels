"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmissionStatus = "pending" | "confirmed" | "rejected";

export async function updateRegistrationStatus(id: string, status: SubmissionStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("registrations")
    .update({
      status,
      confirmed_at: status === "confirmed" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw error;
}

export async function updateDonationStatus(id: string, status: SubmissionStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("donations")
    .update({
      status,
      confirmed_at: status === "confirmed" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw error;
}

export async function getProofSignedUrl(path: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("payment-proofs")
    .createSignedUrl(path, 60 * 5);
  if (error) throw error;
  return data.signedUrl;
}
