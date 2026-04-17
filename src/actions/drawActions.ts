"use server";

import prisma from "@/lib/prisma";
import { createSupabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function executeAdminDraw(totalPrizePool: number) {
  if (totalPrizePool <= 0) throw new Error("Prize pool must be greater than 0");

  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Strict Admin Role Check with explicit null handling
  const profile = await prisma.userProfile.findUnique({ where: { id: user.id } });
  if (!profile || profile.role !== "admin") throw new Error("Forbidden: Admin only");

  // Logic: Active subscription AND at least 5 scores
  const usersWithSubs = await prisma.userProfile.findMany({
    where: {
      subscriptions: { some: { status: "active" } }
    },
    include: {
      scores: {
        orderBy: { playedAt: "desc" } 
      },
      userPreferences: true
    }
  });

  // Strict PRD Requirement: Must have 5 or more scores to participate
  const eligibleUsers = usersWithSubs.filter(u => u.scores.length >= 5);

  if (eligibleUsers.length === 0) throw new Error("No eligible users found for the draw.");

  // Math.random selection for 1-day MVP simplicity
  const winnerIndex = Math.floor(Math.random() * eligibleUsers.length);
  const winner = eligibleUsers[winnerIndex];

  // Prize Splitting Logic with safe fallback
  const charityPct = winner.userPreferences?.charityContributionPct ?? 10;
  const charityDonation = totalPrizePool * (charityPct / 100);
  const userPrize = totalPrizePool - charityDonation;

  // Single Transaction Execution
  await prisma.$transaction(async (tx) => {
    const draw = await tx.draw.create({
      data: {
        status: "completed",
        totalPrizePool,
        executedAt: new Date()
      }
    });

    await tx.drawWinner.create({
      data: {
        drawId: draw.id,
        userId: winner.id,
        userPrize,
        charityDonation,
        status: "pending_verification"
      }
    });
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  
  return { success: true, winnerId: winner.id };
}

export async function getDrawHistory() {
  return await prisma.draw.findMany({
    orderBy: { createdAt: "desc" },
    include: {
       winners: {
         include: { user: true }
       }
    }
  });
}
