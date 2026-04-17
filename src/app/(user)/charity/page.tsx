import React from "react";
import { getCharities, getUserPreferences } from "@/actions/charityActions";
import { CharitySelector } from "@/components/features/CharitySelector";

export default async function CharityPage() {
  const charities = await getCharities();
  const preferences = await getUserPreferences();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Choose Your Impact</h1>
        <p className="text-neutral-400 mt-2">Select the cause you want to support with your tournament winnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {charities.length > 0 ? (
               <CharitySelector 
                 charities={charities} 
                 currentCharityId={preferences?.defaultCharityId || undefined} 
                 currentPct={preferences?.charityContributionPct}
               />
             ) : (
               <div className="col-span-2 p-12 text-center bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-500">
                 No charities found in the system.
               </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
              <h3 className="font-semibold text-lg">Your Current Selection</h3>
              {preferences?.charity ? (
                <div className="space-y-2">
                   <div className="font-bold text-blue-400">{preferences.charity.name}</div>
                   <div className="text-sm text-neutral-400">
                     Supporting this cause with <span className="text-white font-medium">{preferences.charityContributionPct}%</span> of all winnings.
                   </div>
                </div>
              ) : (
                <div className="text-sm text-neutral-500 italic">No charity selected yet.</div>
              )}
           </div>

           <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 font-mono text-xs">
              <div className="text-neutral-500">TRANSACTION PREVIEW</div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Monthly Prize Pool</span>
                <span className="text-white">$10,000.00</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span>Personal Winnings (90%)</span>
                <span className="text-white tracking-widest">$9,000.00</span>
              </div>
              <div className="flex justify-between text-blue-400">
                <span>Charity Donation (10%)</span>
                <span>$1,000.00</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
