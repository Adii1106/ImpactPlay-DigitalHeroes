import React from "react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

export default async function AdminDrawsPage() {
  const draws = await prisma.draw.findMany({
    orderBy: { executedAt: "desc" },
    include: {
      winners: {
        include: { user: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Draw Records</h1>
        <p className="text-neutral-400 mt-2">Historical data of all executed lottery draws.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {draws.map((draw) => (
          <div key={draw.id} className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                {draw.executedAt ? format(new Date(draw.executedAt), "MMMM dd, yyyy") : "Pending"}
              </span>
              <h3 className="text-xl font-bold text-white">
                Total Prize: <span className="text-blue-500">${draw.totalPrizePool.toLocaleString()}</span>
              </h3>
            </div>
            
            <div className="flex items-center space-x-12">
               <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1 text-right">Winner</div>
                  <div className="font-bold text-white text-right">{draw.winners[0]?.user?.email || "N/A"}</div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1 text-right">Charity Split</div>
                  <div className="font-bold text-green-500 text-right">${draw.winners[0]?.charityDonation.toLocaleString()}</div>
               </div>
            </div>
          </div>
        ))}
        {draws.length === 0 && (
          <div className="p-20 text-center text-neutral-500 font-medium bg-neutral-900/50 border border-neutral-800 rounded-3xl border-dashed">
            No draws have been recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
