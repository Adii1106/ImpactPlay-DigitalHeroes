import React from "react";
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { 
  LayoutDashboard, 
  Trophy, 
  Heart, 
  Settings, 
  UserCircle,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  let plan = "Free Plan";

  if (user) {
    const profile = await prisma.userProfile.findUnique({
      where: { id: user.id },
      include: { subscriptions: { where: { status: "active" } } }
    });
    isAdmin = profile?.role === "admin";
    if (profile?.subscriptions && profile.subscriptions.length > 0) {
      plan = `${profile.subscriptions[0].plan.toUpperCase()} Plan`;
    }
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Scores", href: "/scores", icon: Trophy },
    { label: "Charity", href: "/charity", icon: Heart },
    { label: "Subscription", href: "/subscription", icon: UserCircle },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-neutral-800 flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">ImpactPlay</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold tracking-tight text-sm uppercase">{item.label}</span>
            </Link>
          ))}

          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-neutral-800 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 px-4">Management</span>
              <Link
                href="/admin"
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-500 hover:from-red-600/30 hover:to-orange-600/30 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="font-black tracking-tight text-sm uppercase italic">Admin Panel</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            </div>
          )}
        </nav>

        <div className="pt-8 border-t border-neutral-800">
           <div className="flex items-center space-x-4 px-3 py-2">
             <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-black italic">
               {user?.email?.[0].toUpperCase()}
             </div>
             <div className="flex flex-col">
               <span className="text-sm font-bold truncate max-w-[140px]">{user?.email}</span>
               <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{plan}</span>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
