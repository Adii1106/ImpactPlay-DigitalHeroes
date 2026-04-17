"use client";

import React, { useState } from "react";
import { addScore } from "@/actions/scoreActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function ScoreForm() {
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await addScore(parseInt(value), date);

    if (result.success) {
      setMessage({ type: "success", text: "Score added successfully!" });
      setValue("");
    } else {
      setMessage({ type: "error", text: result.error || "Something went wrong" });
    }
    
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
      <h3 className="font-semibold text-lg text-white">Record New Score</h3>
      
      <div className="space-y-2">
        <label className="text-sm text-neutral-400">Score Value</label>
        <Input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter your score"
          required
          min={1}
          max={45}
          className="bg-neutral-950 border-neutral-800 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-neutral-400">Date Played</label>
        <Input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required
          className="bg-neutral-950 border-neutral-800"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Score"}
      </Button>

      {message && (
        <div className={`text-sm p-3 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
          {message.text}
        </div>
      )}

      <p className="text-[10px] text-neutral-600 italic">
        * Note: Only your latest 5 scores are retained. Older scores are automatically removed.
      </p>
    </form>
  );
}
