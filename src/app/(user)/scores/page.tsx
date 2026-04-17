import React from "react";
import { getLatestScores } from "@/actions/scoreActions";
import { ScoreForm } from "@/components/features/ScoreForm";
import { format } from "date-fns";

export default async function ScoresPage() {
  const scores = await getLatestScores();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Scores</h1>
          <p className="text-neutral-400 mt-2">Manage your tournament entries and history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-neutral-950 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date Played</th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {scores.length > 0 ? (
                  scores.map((score) => (
                    <tr key={score.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">
                        {format(new Date(score.playedAt), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-lg text-blue-400">{score.value}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-[10px] font-bold bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-neutral-500">
                      No scores recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl text-xs text-blue-400">
             <strong>Pro Tip:</strong> Only your 5 highest/latest verified scores are considered for the monthly draw.
          </div>
        </div>

        <div>
          <ScoreForm />
        </div>
      </div>
    </div>
  );
}
