"use client";

import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="p-12 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-6 max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-neutral-500 text-sm mt-2">
            An error occurred while loading this section. Please try again or contact support if the problem persists.
          </p>
        </div>
        <Button 
          onClick={() => reset()}
          className="bg-neutral-800 hover:bg-neutral-700 text-white space-x-2"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Try again</span>
        </Button>
      </div>
    </div>
  );
}
