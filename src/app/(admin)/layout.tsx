import React from "react";
import prisma from "@/lib/prisma";
import { createSupabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  PieChart, 
  ArrowLeft 
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await prisma.userProfile.findUnique({ where: { id: user.id } });
  
  if (!profile || profile.role !== "admin") {
    redirect("/dashboard");
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: PieChart },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Draws", href: "/admin/draws", icon: Layers },
  ];

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-red-900/20 bg-neutral-950/50 flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-2 px-2">
          <ShieldCheck className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold tracking-tight">AdminPanel</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-neutral-800">
           <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-500 hover:text-neutral-400 transition-colors">
             <ArrowLeft className="w-4 h-4" />
             <span className="text-sm font-medium">Exit Admin</span>
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
