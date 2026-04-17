"use client";

import React, { useState } from "react";
import { toggleSubscriptionMock } from "@/actions/subscriptionActions";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";

interface Props {
  currentStatus?: "active" | "canceled" | "inactive";
  currentPlan?: "monthly" | "yearly";
}

export function SubscriptionToggle({ currentStatus, currentPlan }: Props) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  async function handleToggle(plan: "monthly" | "yearly") {
    setIsLoading(plan);
    const newStatus = (currentStatus === "active" && currentPlan === plan) ? "canceled" : "active";
    await toggleSubscriptionMock(plan, newStatus);
    setIsLoading(null);
  }

  const plans = [
    { id: "monthly", name: "Monthly", price: "$9.99", description: "Billed every month" },
    { id: "yearly", name: "Yearly", price: "$99.99", description: "Billed every year" }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {plans.map((plan) => {
        const isActive = currentStatus === "active" && currentPlan === plan.id;
        
        return (
          <div 
            key={plan.id} 
            className={`p-6 rounded-2xl border transition-all ${isActive ? 'bg-blue-600/10 border-blue-600' : 'bg-neutral-900 border-neutral-800'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg">{plan.name}</h4>
                <p className="text-sm text-neutral-500">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">{plan.price}</div>
                <div className="text-xs text-neutral-500">per {plan.id === 'monthly' ? 'month' : 'year'}</div>
              </div>
            </div>

            <Button 
              onClick={() => handleToggle(plan.id as any)}
              disabled={!!isLoading}
              className={`w-full ${isActive ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
            >
              {isLoading === plan.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isActive ? (
                <span className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Subscribed</span>
                </span>
              ) : (
                `Choose ${plan.name}`
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
