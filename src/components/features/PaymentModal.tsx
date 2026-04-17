"use client";

import React, { useState } from "react";
import { CreditCard, Zap, Loader2, CheckCircle2, ShieldCheck, ArrowRight, Lock, Info } from "lucide-react";
import { toggleSubscriptionMock } from "@/actions/subscriptionActions";

interface Props {
  plan: "monthly" | "yearly";
  price: string;
  onClose: () => void;
}

export function PaymentModal({ plan, price, onClose }: Props) {
  const [method, setMethod] = useState<"stripe" | "direct" | null>(null);
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [showStripeView, setShowStripeView] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleStripeCheckout() {
    setIsProcessingStripe(true);
    // Simulate redirection to Stripe Hosted Checkout
    setTimeout(() => {
      setShowStripeView(true);
      setIsProcessingStripe(false);
    }, 1500);
  }

  async function finalSuccess() {
    setIsSuccess(true);
    await toggleSubscriptionMock(plan, "active");
    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 2000);
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="flex justify-center">
             <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
               <CheckCircle2 className="w-10 h-10 text-green-500" />
             </div>
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Payment Success</h2>
          <p className="text-neutral-500 font-medium pb-4">Stripe has confirmed your transaction.</p>
        </div>
      </div>
    );
  }

  if (showStripeView) {
    return (
      <div className="fixed inset-0 bg-[#F6F9FC] z-50 flex flex-col items-center justify-center text-[#1A1F36] transition-all font-sans">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl flex overflow-hidden min-h-[600px]">
          {/* Left Side: Summary */}
          <div className="w-1/2 bg-[#F6F9FC] p-12 space-y-8 border-r border-neutral-100">
             <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#635BFF] rounded-lg" />
                <span className="font-bold text-xl">ImpactPlay</span>
             </div>
             <div className="space-y-1">
                <p className="text-[#697386] font-medium uppercase text-xs tracking-widest">Subscribe to {plan}</p>
                <h1 className="text-5xl font-bold">{price}</h1>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between text-sm py-4 border-b border-neutral-200">
                   <span className="font-medium">{plan === 'monthly' ? 'Monthly' : 'Yearly'} Plan</span>
                   <span className="font-bold">{price}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-[#697386]">Taxes</span>
                   <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4">
                   <span>Total due today</span>
                   <span>{price}</span>
                </div>
             </div>
             
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-800 uppercase">Test Mode Enabled</p>
                  <p className="text-[10px] text-blue-600 font-medium">Use card: <span className="font-bold tracking-tighter">4242 4242 4242 4242</span></p>
                </div>
             </div>

             <p className="text-xs text-[#697386]">By subscribing, you agree to ImpactPlay's Terms of Service and Privacy Policy. Your subscription will auto-renew.</p>
          </div>

          {/* Right Side: Form */}
          <div className="w-1/2 p-12 space-y-6">
             <h2 className="text-xl font-bold">Payment Details</h2>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Email</label>
                   <input type="email" placeholder="tester@impactplay.io" className="w-full p-3 border border-neutral-200 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF]" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Card Information</label>
                   <div className="relative">
                      <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-3 border border-neutral-200 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF]" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2">
                         <div className="px-1.5 py-0.5 bg-neutral-100 rounded border border-neutral-200 flex items-center justify-center text-[8px] font-bold">VISA</div>
                         <div className="px-1.5 py-0.5 bg-neutral-100 rounded border border-neutral-200 flex items-center justify-center text-[8px] font-bold">MC</div>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <input type="text" placeholder="12 / 26" className="w-1/2 p-3 border border-neutral-200 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF]" />
                      <input type="text" placeholder="CVC" className="w-1/2 p-3 border border-neutral-200 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF]" />
                   </div>
                </div>
             </div>
             <button 
               onClick={finalSuccess}
               className="w-full py-4 bg-[#635BFF] hover:bg-[#5851E0] text-white font-bold rounded-lg shadow-lg transition-all active:scale-[0.98] mt-8"
             >
               Subscribe
             </button>
             <div className="flex items-center justify-center space-x-2 text-[#697386] text-xs">
                <Lock className="w-3 h-3" />
                <span>Powered by Stripe</span>
             </div>
          </div>
        </div>
        <button onClick={() => setShowStripeView(false)} className="mt-8 text-[#697386] hover:text-[#1A1F36] text-sm font-medium underline underline-offset-4">Return to ImpactPlay</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-neutral-800 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Select Checkout</h2>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">{plan} Plan — {price}</p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest bg-neutral-800 px-3 py-1 rounded-lg">Close</button>
        </div>

        <div className="p-10 space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 block ml-2">Checkout Options</label>
              
              <div 
                onClick={() => setMethod("stripe")}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center space-x-6 ${method === 'stripe' ? 'bg-[#635BFF]/10 border-[#635BFF]' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
              >
                <div className={`p-4 rounded-2xl ${method === 'stripe' ? 'bg-[#635BFF] text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                   <CreditCard className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-white uppercase italic">Stripe Payment</p>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#635BFF]/20 text-[#635BFF] rounded-md font-black italic">DEMO</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium">Simulated PCI-Compliant checkout</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'stripe' ? 'border-[#635BFF]' : 'border-neutral-800'}`}>
                   {method === 'stripe' && <div className="w-3 h-3 bg-[#635BFF] rounded-full" />}
                </div>
              </div>

              <div 
                onClick={() => setMethod("direct")}
                className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center space-x-6 ${method === 'direct' ? 'bg-violet-600/10 border-violet-600' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
              >
                <div className={`p-4 rounded-2xl ${method === 'direct' ? 'bg-violet-600 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-white uppercase italic">Quick Access</p>
                    <span className="text-[10px] px-1.5 py-0.5 bg-violet-600/20 text-violet-500 rounded-md font-black italic">TESTING</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium">Instant activation for evaluators</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'direct' ? 'border-violet-600' : 'border-neutral-800'}`}>
                   {method === 'direct' && <div className="w-3 h-3 bg-violet-600 rounded-full" />}
                </div>
              </div>
           </div>

           <div className="space-y-6 pt-4">
              <button 
                disabled={!method || isProcessingStripe}
                onClick={method === 'stripe' ? handleStripeCheckout : finalSuccess}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-tighter rounded-3xl flex items-center justify-center space-x-3 disabled:opacity-20 transition-all hover:bg-neutral-100 active:scale-95 shadow-xl shadow-white/5"
              >
                {isProcessingStripe ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span>Proceed to {method === 'stripe' ? 'Stripe' : 'Dashboard'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" />
                <span>SSL Encrypted Checkout</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
