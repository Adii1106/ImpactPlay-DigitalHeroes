"use client";

import React, { useState } from "react";
import { updateCharityPreference } from "@/actions/charityActions";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Charity {
  id: string;
  name: string;
  description: string | null;
}

interface Props {
  charities: Charity[];
  currentCharityId?: string;
  currentPct?: number;
}

export function CharitySelector({ charities, currentCharityId, currentPct = 10 }: Props) {
  const [selectedId, setSelectedId] = useState(currentCharityId);
  const [pct, setPct] = useState(currentPct);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSave() {
    if (!selectedId) return;
    setIsLoading(true);
    await updateCharityPreference(selectedId, pct);
    setIsLoading(false);
  }

  return (
    <div className="col-span-2 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {charities.map((charity) => {
          const isSelected = selectedId === charity.id;
          return (
            <div 
              key={charity.id}
              onClick={() => setSelectedId(charity.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'bg-blue-600/10 border-blue-600' : 'bg-neutral-900 border-neutral-800 h-32'}`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg">{charity.name}</h4>
                {isSelected && <Check className="w-5 h-5 text-blue-500" />}
              </div>
              <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{charity.description}</p>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="font-bold text-lg">Contribution Percentage</h4>
            <p className="text-sm text-neutral-500">How much of your winnings should go to this charity?</p>
          </div>
          <div className="text-3xl font-black text-blue-500">{pct}%</div>
        </div>

        <Slider 
          value={[pct]} 
          onValueChange={(v) => setPct(v[0])} 
          min={5} 
          max={100} 
          step={5}
          className="py-4"
        />

        <div className="flex justify-between text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
           <span>Standard (5%)</span>
           <span>Generous (50%)</span>
           <span>Hero (100%)</span>
        </div>

        <Button 
          onClick={handleSave}
          disabled={!selectedId || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-bold rounded-xl shadow-lg shadow-blue-600/20"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
