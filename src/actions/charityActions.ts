"use server";

import prisma from "@/lib/prisma";
import { createSupabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCharities() {
  return await prisma.charity.findMany();
}

export async function getUserPreferences() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  return await prisma.userPreference.findUnique({
    where: { userId: user.id },
    include: { charity: true }
  });
}

export async function updateCharityPreference(charityId: string, contributionPct: number) {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Unauthorized");

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {
      defaultCharityId: charityId,
      charityContributionPct: contributionPct
    },
    create: {
      userId: user.id,
      defaultCharityId: charityId,
      charityContributionPct: contributionPct
    }
  });

  revalidatePath("/charity");
  revalidatePath("/dashboard");
  
  return { success: true };
}
