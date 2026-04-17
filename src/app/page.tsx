import React from "react";
import Link from "next/link";
import { 
  Trophy, 
  Heart, 
  Zap, 
  ArrowRight, 
  Github, 
  Shield 
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">ImpactPlay</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-400 uppercase tracking-widest">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-6 py-2.5 text-sm font-bold hover:text-blue-400 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-neutral-200 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full animate-pulse" />
          </div>

          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>1-Day MVP Edition // ImpactPlay v1.0</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              The Next Gen <br />
              <span className="text-white">Charity Lottery.</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Track your scores, win massive prizes, and make a real-world impact. ImpactPlay connects tournament performance with transparent charitable giving.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/login" 
                className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>ENTER THE ARENA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all active:scale-95"
              >
                VIEW LIVE DRAWS
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-3 p-12 rounded-[40px] bg-neutral-900 border border-white/5 space-y-6 flex flex-col justify-end min-h-[400px] group transition-all hover:border-blue-500/20">
               <Trophy className="w-16 h-16 text-blue-500 group-hover:scale-110 transition-transform" />
               <div className="space-y-2">
                 <h3 className="text-3xl font-bold tracking-tight text-white leading-tight">Dynamic Score Tracking</h3>
                 <p className="text-neutral-400 font-medium">Capture your best moments. Our system retains only your latest 5 scores to keep the competition fresh and fair.</p>
               </div>
            </div>

            <div className="md:col-span-3 p-12 rounded-[40px] bg-neutral-900 border border-white/5 space-y-6 flex flex-col justify-end min-h-[400px] group transition-all hover:border-violet-500/20">
               <Heart className="w-16 h-16 text-red-500 group-hover:scale-110 transition-transform" />
               <div className="space-y-2">
                 <h3 className="text-3xl font-bold tracking-tight text-white leading-tight">Charitable Impact</h3>
                 <p className="text-neutral-400 font-medium">Choose from our curated list of foundations. A portion of every win goes directly to those who need it most.</p>
               </div>
            </div>

            <div className="md:col-span-4 p-12 rounded-[40px] bg-neutral-900 border border-white/5 flex flex-col md:flex-row items-center gap-12 group transition-all hover:border-white/20">
              <div className="flex-1 space-y-4 text-center md:text-left">
                 <h3 className="text-4xl font-bold tracking-tight text-white leading-tight">Admin-Led Transparency</h3>
                 <p className="text-neutral-400 font-medium">
                   Fully auditable draw history. Our platform ensures every winner selection is verified, registered, and processed with maximum security.
                 </p>
              </div>
              <div className="w-full md:w-48 h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 group-hover:bg-white/10 transition-all">
                <Shield className="w-full h-full text-blue-400" />
              </div>
            </div>

            <div className="md:col-span-2 p-12 rounded-[40px] bg-blue-600 space-y-6 flex flex-col justify-center text-center">
               <div className="text-5xl font-black tracking-tighter">$1.2M+</div>
               <div className="text-sm font-bold uppercase tracking-widest text-blue-200">Total Donated</div>
            </div>
          </div>
        </section>

        {/* App Stats / Footer */}
        <footer className="py-20 border-t border-white/5 text-center space-y-8">
           <div className="flex items-center justify-center space-x-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <Github className="w-6 h-6" />
              <span className="font-bold tracking-tighter uppercase text-sm">Source Available</span>
           </div>
           <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.5em]">
             &copy; 2026 ImpactPlay Platform. All rights reserved.
           </p>
        </footer>
      </main>
    </div>
  );
}
