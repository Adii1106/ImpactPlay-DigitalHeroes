"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { login } from "@/actions/authActions";
import { Zap, Mail, Lock } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";

const initialState = {
  error: null,
};

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Welcome Back</h1>
          <p className="text-neutral-500 font-medium">Enter your credentials to access the arena.</p>
        </div>

        {state?.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
              <input 
                name="email"
                type="email" 
                required
                placeholder="commander@impactplay.io"
                className="w-full pl-12 pr-4 py-4 bg-neutral-900 border border-white/5 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-neutral-900 border border-white/5 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-neutral-700"
              />
            </div>
          </div>

          <SubmitButton label="SIGN IN" />
        </form>

        <div className="text-center pt-4">
          <p className="text-neutral-500 text-sm font-medium">
            New to ImpactPlay?{" "}
            <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-bold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
