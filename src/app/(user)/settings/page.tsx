import React from "react";
import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { User, Shield, Bell, CreditCard, LogOut } from "lucide-react";
import { signOut } from "@/actions/authActions";

export default async function SettingsPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await prisma.userProfile.findUnique({
    where: { id: user.id },
    include: { subscriptions: true }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-neutral-400 mt-2">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-2 space-y-6">
          <section className="p-8 rounded-[32px] bg-neutral-900 border border-neutral-800 space-y-6">
             <div className="flex items-center space-x-4">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-2xl font-black italic">
                 {user.email?.[0].toUpperCase()}
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white">{user.email}</h3>
                  <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest">
                    {profile?.role === 'admin' ? '🛡️ System Administrator' : 'Elite Player'}
                  </p>
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Member Since</span>
                  <p className="font-bold text-white">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Account Status</span>
                  <p className="font-bold text-green-500 uppercase tracking-tight">Verified</p>
                </div>
             </div>
          </section>

          {/* Security & System */}
          <section className="space-y-4">
             <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 ml-4">System Preferences</h4>
             <div className="rounded-[32px] bg-neutral-900 border border-neutral-800 divide-y divide-neutral-800">
                <div className="p-6 flex items-center justify-between group cursor-not-allowed grayscale">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Email Notifications</p>
                      <p className="text-xs text-neutral-500">Get notified when you win a draw.</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between group cursor-not-allowed grayscale">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-neutral-500">Add an extra layer of security.</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest italic">Disabled</span>
                </div>
             </div>
          </section>

          <section className="pt-8">
             <form action={signOut}>
                <button className="flex items-center space-x-2 text-red-500 hover:text-red-400 font-bold transition-colors ml-4">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out of ImpactPlay</span>
                </button>
             </form>
          </section>
        </div>

        {/* Plan Summary */}
        <div className="space-y-6">
           <section className="p-8 rounded-[32px] bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500">Active Plan</h4>
              <div className="space-y-2">
                 <div className="text-4xl font-black italic text-white uppercase tracking-tighter">
                   {profile?.subscriptions?.[0]?.status === 'active' ? profile.subscriptions[0].plan : 'FREE'}
                 </div>
                 <p className="text-neutral-500 text-sm font-medium">
                   {profile?.subscriptions?.[0]?.status === 'active' 
                     ? 'You are eligible for all prize draws.' 
                     : 'Upgrade to participate in monthly draws.'}
                 </p>
              </div>
              <Link 
                href="/subscription" 
                className="block w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 text-center rounded-2xl font-bold transition-all"
              >
                Manage Billing
              </Link>
           </section>
        </div>
      </div>
    </div>
  );
}

// Internal Link component since we didn't import it
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return <a href={href} className={className}>{children}</a>;
}
