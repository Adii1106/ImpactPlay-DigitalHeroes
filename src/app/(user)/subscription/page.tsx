import React from "react";
import { getSubscription } from "@/actions/subscriptionActions";
import { SubscriptionToggle } from "@/components/features/SubscriptionToggle";

export default async function SubscriptionPage() {
  const subscription = await getSubscription();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-neutral-400 mt-2">Manage your participation in the impact draws.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h3 className="font-semibold text-xl">Current Status</h3>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${subscription?.status === 'active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-neutral-800 text-neutral-500 border border-neutral-700'}`}>
                {subscription?.status === 'active' ? 'Active' : 'Inactive'}
              </div>
              <span className="text-sm text-neutral-400">
                {subscription?.plan ? `${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan` : 'No active plan'}
              </span>
            </div>
            
            {subscription?.status === 'active' ? (
              <p className="text-sm text-neutral-400">
                You are currently eligible to participate in the upcoming draws, provided you have recorded at least 5 scores this month.
              </p>
            ) : (
              <p className="text-sm text-neutral-400">
                Activate a plan to start participating in monthly draws and support your favorite charities.
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/20 space-y-2 text-sm text-blue-400">
             <h4 className="font-bold">Why subscribe?</h4>
             <ul className="list-disc list-inside space-y-1 text-xs text-blue-400/80">
               <li>Entry into monthly prize draws (up to $10,000)</li>
               <li>Automatic verification of your score history</li>
               <li>Direct impact on your chosen charities</li>
             </ul>
          </div>
        </div>

        <SubscriptionToggle currentStatus={subscription?.status as any} currentPlan={subscription?.plan as any} />
      </div>
    </div>
  );
}
