import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Trophy, 
  Heart, 
  Settings, 
  UserCircle 
} from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <aside className="w-64 border-r border-neutral-800 flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg" />
          <span className="text-xl font-bold tracking-tight">ImpactPlay</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-neutral-800">
           <div className="flex items-center space-x-3 px-3 py-2">
             <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700" />
             <div className="flex flex-col">
               <span className="text-sm font-medium">User Account</span>
               <span className="text-xs text-neutral-500">Free Plan</span>
             </div>
           </div>
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
