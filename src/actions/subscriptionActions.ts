"use server";

import prisma from "@/lib/prisma";
import { createSupabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleSubscriptionMock(plan: "monthly" | "yearly", status: "active" | "canceled") {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Unauthorized");

  const existingSub = await prisma.subscription.findFirst({
    where: { userId: user.id }
  });

  if (existingSub) {
    await prisma.subscription.update({
      where: { id: existingSub.id },
      data: { status, plan }
    });
  } else {
    await prisma.subscription.create({
      data: {
        userId: user.id,
        status,
        plan
      }
    });
  }

  revalidatePath("/subscription");
  revalidatePath("/dashboard");
  
  return { success: true };
}

export async function getSubscription() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  return await prisma.subscription.findFirst({
    where: { userId: user.id }
  });
}
