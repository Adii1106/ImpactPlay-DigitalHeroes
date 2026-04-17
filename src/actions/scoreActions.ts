"use server";

import prisma from "@/lib/prisma";
import { createSupabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addScore(value: number, playedAtString: string) {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  // PRD: Unique constraint handled by Prisma error catching
  // PRD: 5-score limit handled by Postgres Trigger
  try {
    await prisma.score.create({
      data: {
        userId: user.id,
        value,
        playedAt: new Date(playedAtString),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/scores");
    
    return { success: true };
  } catch (err: any) {
    if (err.code === "P2002") {
      return { success: false, error: "A score for this date already exists." };
    }
    return { success: false, error: "Failed to add score. Please try again." };
  }
}

export async function getLatestScores() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  return await prisma.score.findMany({
    where: { userId: user.id },
    orderBy: { playedAt: "desc" },
    take: 5
  });
}
