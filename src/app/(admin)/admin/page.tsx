import React from "react";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const userCount = await prisma.userProfile.count();
  const activeSubs = await prisma.subscription.count({ where: { status: "active" } });
  const completedDraws = await prisma.draw.count({ where: { status: "completed" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-neutral-400 mt-2">Global system metrics and controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Users", value: userCount, color: "text-blue-500" },
          { label: "Active Subscriptions", value: activeSubs, color: "text-green-500" },
          { label: "Total Draws", value: completedDraws, color: "text-purple-500" }
        ].map((stat) => (
          <div key={stat.label} className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="text-sm text-neutral-500 font-medium uppercase tracking-widest">{stat.label}</span>
            <div className={`text-5xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="p-12 rounded-3xl bg-red-600/5 border border-red-600/10 flex flex-col items-center justify-center text-center space-y-6">
         <div className="max-w-md space-y-2">
           <h3 className="text-xl font-bold text-red-500">Manual Draw Engine</h3>
           <p className="text-sm text-neutral-400">
             Trigger the monthly winner selection manually. This will calculate prizes, split charity donations, and notify winners.
           </p>
         </div>
         <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95">
           EXEUCTE MONTHLY DRAW
         </button>
      </div>
    </div>
  );
}
