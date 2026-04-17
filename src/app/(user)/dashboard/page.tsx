import React from "react";
import Link from "next/link";
import { getLatestScores } from "@/actions/scoreActions";
import { getSubscription } from "@/actions/subscriptionActions";
import { getUserPreferences } from "@/actions/charityActions";
import { Trophy, Zap, Heart, ArrowRight, Play } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [scores, subscription, preferences, winnings] = await Promise.all([
    getLatestScores(),
    getSubscription(),
    getUserPreferences(),
    prisma.drawWinner.findMany({
      where: { userId: user.id },
      include: { draw: true },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const cards = [
    { 
      label: "Total Scores", 
      value: scores.length.toString(), 
      subtext: "Last 5 recorded",
      icon: Trophy,
      color: "text-blue-500"
    },
    { 
      label: "Active Plan", 
      value: subscription?.status === 'active' ? subscription.plan.toUpperCase() : "FREE", 
      subtext: subscription?.status === 'active' ? "Upgrade to participate" : "Upgrade to participate",
      icon: Zap,
      color: "text-yellow-500"
    },
    { 
      label: "Current Charity", 
      value: preferences?.charity?.name || "NONE", 
      subtext: preferences?.charityContributionPct ? `${preferences.charityContributionPct}% donation` : "Select to donate",
      icon: Heart,
      color: "text-red-500"
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Overview</h1>
          <p className="text-neutral-500 font-medium">Welcome back, Elite Player. Here is your current standing.</p>
        </div>
        <Link href="/scores" className="px-6 py-3 bg-white text-black font-bold rounded-2xl flex items-center space-x-2 active:scale-95 transition-all">
          <Play className="w-4 h-4 fill-black" />
          <span>PLAY NOW</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="p-8 rounded-[32px] bg-neutral-900 border border-white/5 space-y-4 relative overflow-hidden group">
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">{card.label}</span>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-4xl font-black italic tracking-tighter text-white uppercase">{card.value}</div>
              <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest">{card.subtext}</p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="p-10 rounded-[40px] bg-neutral-900 border border-white/5 min-h-[400px] flex flex-col justify-between">
           <h3 className="text-xl font-bold tracking-tight text-white mb-8">Recent Performance</h3>
           
           {scores.length > 0 ? (
             <div className="space-y-4">
               {scores.map((score) => (
                 <div key={score.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-neutral-400">
                      {new Date(score.playedAt).toLocaleDateString()}
                    </span>
                    <span className="text-lg font-black italic text-blue-500">{score.value.toLocaleString()}</span>
                 </div>
               ))}
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl p-12">
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-neutral-600" />
                </div>
                <p className="text-neutral-500 font-medium">No tournament scores recorded yet.</p>
                <Link href="/scores" className="text-blue-500 font-bold hover:underline">Record your first score &rarr;</Link>
             </div>
           )}
        </section>

        {/* Action / Winnings Card */}
        {winnings.length > 0 ? (
          <section className="bg-gradient-to-br from-green-600 to-emerald-600 p-10 rounded-[40px] flex flex-col justify-between text-white shadow-2xl shadow-green-500/20">
             <div className="space-y-4">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                 <Trophy className="w-6 h-6 fill-white" />
               </div>
               <h3 className="text-3xl font-black italic uppercase tracking-tighter">You Won! 🏆</h3>
               <p className="text-green-100 font-medium opacity-80">
                 Congratulations! You were selected in a recent draw. Your prize pool contribution has also been sent to your chosen charity.
               </p>
               
               <div className="pt-4 space-y-2">
                  {winnings.map((win) => (
                    <div key={win.id} className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                       <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Your Prize</p>
                         <p className="text-2xl font-black">${win.userPrize.toLocaleString()}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status</p>
                         <p className="text-sm font-bold uppercase tracking-tight px-2 py-1 bg-white/20 rounded-md">{win.status.replace('_', ' ')}</p>
                       </div>
                    </div>
                  ))}
               </div>
             </div>
             
             <button className="mt-8 w-full py-4 bg-white text-green-600 rounded-2xl font-black text-center shadow-lg hover:bg-green-50 transition-all active:scale-95">
               CLAIM WINNINGS
             </button>
          </section>
        ) : (
          <section className="bg-gradient-to-br from-blue-600 to-violet-600 p-10 rounded-[40px] flex flex-col justify-between text-white shadow-2xl shadow-blue-500/20">
             <div className="space-y-2">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                 <Zap className="w-6 h-6 fill-white" />
               </div>
               <h3 className="text-3xl font-black italic uppercase tracking-tighter pt-4">Monthly Draw <br />Live Soon.</h3>
               <p className="text-blue-100 font-medium opacity-80 pt-2">Ensure your subscription is active and you have recorded 5+ scores to be eligible for the next prize pool.</p>
             </div>
             
             <Link href="/subscription" className="mt-12 w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-center shadow-lg hover:bg-blue-50 transition-all active:scale-95">
               CHECK ELIGIBILITY
             </Link>
          </section>
        )}
      </div>
    </div>
  );
}
