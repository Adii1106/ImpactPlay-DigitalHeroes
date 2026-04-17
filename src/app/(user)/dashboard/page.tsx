import React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-neutral-400 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Scores", value: "0", subtext: "Last 5 recorded" },
          { label: "Active Plan", value: "Free", subtext: "Upgrade to participate" },
          { label: "Charity", value: "None", subtext: "Select to donate" }
        ].map((card) => (
          <div key={card.label} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="text-sm text-neutral-500 font-medium">{card.label}</span>
            <div className="text-2xl font-bold">{card.value}</div>
            <span className="text-xs text-neutral-600 italic">{card.subtext}</span>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 min-h-[400px] flex items-center justify-center border-dashed">
         <div className="text-center space-y-4">
           <div className="text-neutral-500">No recent activity</div>
           <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
             Record your first score
           </button>
         </div>
      </div>
    </div>
  );
}
