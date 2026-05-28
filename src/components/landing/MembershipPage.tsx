"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/landing/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { Check, Shield, Star, Trophy, Users } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";


const membershipTiers = [
  {
    name: "Basic",
    price: "₦20,000",
    period: "/ year",
    description: "Perfect for fans who want to stay connected and support the club.",
    icon: <Users className="w-8 h-8 text-[#2052DA]" />,
    features: [
      "Access to online Member Portal",
      "Exclusive club news and match updates",
      "Standard priority for match tickets",
      "Digital membership card",
      "5% discount on club merchandise",
    ],
    highlight: false,
    buttonText: "Join Basic",
  },
  {
    name: "Premium",
    price: "₦50,000",
    period: "/ year",
    description: "The ultimate package for passionate supporters and active players.",
    icon: <Star className="w-8 h-8 text-white" />,
    features: [
      "Everything in Basic, plus:",
      "VIP match ticket access",
      "Access to IFC member lounge",
      "Exclusive training sessions with coaches",
      "Monthly performance reports",
      "20% discount on club merchandise",
      "Priority registration for tournaments",
    ],
    highlight: true,
    buttonText: "Join Premium",
  },
  {
    name: "Platinum",
    price: "₦150,000",
    period: "/ year",
    description: "Exclusive access and premium benefits for our most dedicated patrons.",
    icon: <Trophy className="w-8 h-8 text-[#2052DA]" />,
    features: [
      "Everything in Premium, plus:",
      "Guaranteed VIP seating for home matches",
      "Invitation to exclusive club galas",
      "Meet & greet sessions with the squad",
      "Free official club jersey each season",
      "Dedicated account manager",
    ],
    highlight: false,
    buttonText: "Join Platinum",
  },
];

const benefits = [
  {
    title: "Community & Networking",
    description: "Connect with fellow football enthusiasts, professionals, and local business leaders in a vibrant environment.",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    title: "Professional Development",
    description: "Train under experienced coaches and get regular feedback to elevate your game to the next level.",
    icon: <Shield className="w-6 h-6 text-white" />,
  },
  {
    title: "Exclusive Events",
    description: "Gain access to private galas, end-of-season awards, and special match-day hospitality packages.",
    icon: <Star className="w-6 h-6 text-white" />,
  },
];

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  return (
    <div className="bg-[#f7f9fc] min-h-screen pb-20">
      <Breadcrumb title="Membership" />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#0d0d0d] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/members/memberImage2.webp"
            alt="Island FC Membership"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001429] via-[#001429]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primaryColor text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-4">
              Join The Family
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
              Become a part of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">Island Football Club</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you want to play, support, or network, our membership packages are designed to bring you closer to the action and the community.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">Why Join IFC?</h2>
            <div className="w-20 h-1.5 bg-primaryColor mx-auto mb-6 rounded-full" />
            <p className="text-gray-500 text-lg">
              Membership at Island Football Club is more than just a ticket to a game. It's your pass to an exclusive lifestyle and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primaryColor/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#001429] to-primaryColor flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#001429] mb-3">{benefit.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">Membership Plans</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">Choose the tier that fits your passion. All memberships are billed annually and come with a welcome pack.</p>
            
            {/* Billing Toggle (Visual Only) */}
            <div className="inline-flex items-center p-1 bg-gray-200/60 rounded-full">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${billingCycle === "monthly" ? "bg-white text-[#001429] shadow-sm" : "text-gray-500 hover:text-[#001429]"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${billingCycle === "annual" ? "bg-white text-[#001429] shadow-sm" : "text-gray-500 hover:text-[#001429]"}`}
              >
                Annually
                <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {membershipTiers.map((tier, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} className="h-full">
                <div 
                  className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 ${
                    tier.highlight 
                      ? "bg-gradient-to-b from-[#001429] to-[#2052DA] text-white shadow-2xl scale-100 lg:scale-105 z-10 border border-[#386bf2]" 
                      : "bg-white text-[#001429] shadow-lg hover:shadow-xl border border-gray-100"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 left-0 right-0 bg-primaryColor text-white text-[10px] font-black uppercase tracking-[0.2em] text-center py-2">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`p-8 md:p-10 ${tier.highlight ? "pt-12" : ""}`}>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className={`text-2xl font-black uppercase ${tier.highlight ? "text-white" : "text-[#001429]"}`}>
                          {tier.name}
                        </h3>
                        <p className={`text-sm mt-2 ${tier.highlight ? "text-blue-100" : "text-gray-500"}`}>
                          {tier.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-8 flex items-end gap-1">
                      <span className="text-4xl md:text-5xl font-black">{tier.price}</span>
                      <span className={`text-sm font-semibold pb-1 ${tier.highlight ? "text-blue-200" : "text-gray-400"}`}>
                        {tier.period}
                      </span>
                    </div>

                    <Link href="/join-ifc" className="block w-full">
                      <button 
                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                          tier.highlight 
                            ? "bg-white text-primaryColor hover:bg-gray-100 hover:shadow-lg" 
                            : "bg-[#f4f7f9] text-[#001429] hover:bg-primaryColor hover:text-white"
                        }`}
                      >
                        {tier.buttonText}
                      </button>
                    </Link>
                  </div>

                  <div className={`p-8 md:p-10 border-t ${tier.highlight ? "border-blue-800/50 bg-black/10" : "border-gray-50 bg-gray-50/50"}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${tier.highlight ? "text-blue-200" : "text-gray-400"}`}>
                      What's included
                    </p>
                    <ul className="space-y-4">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? "text-blue-300" : "text-primaryColor"}`} />
                          <span className={`text-sm leading-tight ${tier.highlight ? "text-white" : "text-gray-600"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#001429]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primaryColor/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-6">
            Ready to Take the Pitch?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of members who are already enjoying the exclusive benefits of Island Football Club. Don't just watch the game—live it.
          </p>
          <Link href="/join-ifc">
            <button className="px-10 py-4 bg-primaryColor text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(32,82,218,0.4)]">
              Register Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
