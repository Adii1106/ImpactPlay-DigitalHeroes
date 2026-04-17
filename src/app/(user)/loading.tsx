import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-neutral-500 font-medium animate-pulse tracking-widest text-xs uppercase">
          Synthesizing Data
        </p>
      </div>
    </div>
  );
}
