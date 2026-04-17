"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { PaymentModal } from "./PaymentModal";

interface Props {
  currentStatus?: "active" | "canceled" | "inactive";
  currentPlan?: "monthly" | "yearly";
}

export function SubscriptionToggle({ currentStatus, currentPlan }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<{ id: "monthly" | "yearly", price: string } | null>(null);

  const plans = [
    { id: "monthly", name: "Monthly", price: "$9.99", description: "Billed every month" },
    { id: "yearly", name: "Yearly", price: "$99.99", description: "Billed every year" }
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {plans.map((plan) => {
        const isActive = currentStatus === "active" && currentPlan === plan.id;
        
        return (
          <div 
            key={plan.id} 
            className={`p-10 rounded-[40px] border transition-all relative overflow-hidden group ${isActive ? 'bg-blue-600/10 border-blue-600 ring-2 ring-blue-600/20' : 'bg-neutral-900 border-white/5 hover:border-white/10'}`}
          >
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div>
                <h4 className="font-black italic text-3xl text-white uppercase tracking-tighter">{plan.name}</h4>
                <p className="text-sm text-neutral-500 font-medium uppercase tracking-widest mt-1">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white italic tracking-tighter">{plan.price}</div>
                <div className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">{plan.id === 'monthly' ? 'per month' : 'per year'}</div>
              </div>
            </div>

            <button 
              onClick={() => !isActive && setSelectedPlan({ id: plan.id as any, price: plan.price })}
              disabled={isActive}
              className={`w-full py-5 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 ${isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default' : 'bg-white text-black hover:bg-neutral-100 shadow-xl shadow-white/5'}`}
            >
              {isActive ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Current Active Plan</span>
                </>
              ) : (
                <>
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[100px] rounded-full transition-all ${isActive ? 'bg-blue-600/20' : 'bg-white/0 group-hover:bg-white/5'}`} />
          </div>
        );
      })}

      {selectedPlan && (
        <PaymentModal 
          plan={selectedPlan.id} 
          price={selectedPlan.price} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </div>
  );
}
