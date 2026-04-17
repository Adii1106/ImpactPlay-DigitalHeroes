"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2 } from "lucide-react";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-neutral-800 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="uppercase tracking-widest text-xs">Processing...</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
}
