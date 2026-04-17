"use client";

import React, { useState } from "react";
import { executeAdminDraw } from "@/actions/drawActions";
import { Button } from "@/components/ui/button";
import { Loader2, Coins } from "lucide-react";

export function DrawExecutor() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("10000");

  async function handleExecute() {
    if (!confirm("Are you sure you want to execute the draw? This will select a winner and split the prize pool.")) return;
    
    setIsLoading(true);
    try {
      const result = await executeAdminDraw(parseFloat(amount));
      if (result.success) {
        alert("Draw executed successfully!");
      }
    } catch (err: any) {
      alert(err.message || "Failed to execute draw");
    }
    setIsLoading(false);
  }

  return (
    <div className="p-12 rounded-3xl bg-red-600/5 border border-red-600/10 flex flex-col items-center justify-center text-center space-y-6">
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-red-500">Manual Draw Engine</h3>
        <p className="text-sm text-neutral-400">
          Trigger the monthly winner selection manually. This will calculate prizes, split charity donations, and notify winners.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-bold focus:ring-red-500 outline-none w-40"
          />
        </div>
        <Button 
          onClick={handleExecute}
          disabled={isLoading}
          className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "EXECUTE DRAW"}
        </Button>
      </div>
    </div>
  );
}
