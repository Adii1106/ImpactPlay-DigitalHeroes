import React from "react";
import prisma from "@/lib/prisma";
import { DrawExecutor } from "@/components/features/DrawExecutor";
import { getDrawHistory } from "@/actions/drawActions";
import { format } from "date-fns";

export default async function AdminDashboardPage() {
  const userCount = await prisma.userProfile.count();
  const activeSubs = await prisma.subscription.count({ where: { status: "active" } });
  const completedDraws = await prisma.draw.count({ where: { status: "completed" } });
  const drawHistory = await getDrawHistory();

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

      <DrawExecutor />

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Draw History</h3>
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-950 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Winner</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Prize Pool</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Donation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {drawHistory.length > 0 ? (
                drawHistory.map((draw) => {
                  const winner = draw.winners[0];
                  return (
                    <tr key={draw.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">
                        {draw.executedAt ? format(new Date(draw.executedAt), "MMM dd, yyyy HH:mm") : "Pending"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {winner?.user?.email || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-400">
                        ${draw.totalPrizePool.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-500 font-bold">
                        ${winner?.charityDonation.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                    No draws have been executed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
