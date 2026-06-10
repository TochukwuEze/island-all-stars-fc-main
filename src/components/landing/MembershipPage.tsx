"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/landing/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { Check, Shield, Star, Trophy, Users } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});

const membershipTiers = [
  {
    name: "Club Membership",
    price: "₦50,000",
    period: "/ year",
    description:
      "The ultimate package to stay connected, play, and support the club.",
    icon: <Star className="w-8 h-8 text-white" />,
    features: [
      "Access to online Member Portal",
      "Family-inclusive weekly sporting programmes",
      "Networking & wealth creation opportunities",
      "Access to IASC member lounge at Lagos Business School",
      "Access to football, table tennis, aerobics, & gymnastics",
      "Participation in indoor games (Chess, Draft, Ludo)",
      "Priority registration for tournaments & events",
    ],
    highlight: true,
    buttonText: "Join Now",
  },
];

const benefits = [
  {
    title: "Family & Community",
    description:
      "Enjoy weekly sporting programmes specifically tailored to embrace our wives and children as part of our close-knit family.",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    title: "Networking & Wealth Creation",
    description:
      "Connect with professionals from all walks of life—lawyers, doctors, bankers, and entrepreneurs—to foster wealth creation.",
    icon: <Shield className="w-6 h-6 text-white" />,
  },
  {
    title: "Diverse Physical Fitness",
    description:
      "Play football and other sports like Table Tennis, Aerobics, Gymnastics, Chess, and Ludo in an organized and urbane fashion.",
    icon: <Star className="w-6 h-6 text-white" />,
  },
];

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">(
    "annual",
  );

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
            <h1 className={`text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6 ${sofiaSansCondensed.className}`}>
              Become a part of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">
                Island Allstars Sports Club
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join a social, family, networking, and physical fitness club where
              professionals from all walks of life come together. Improve the
              quality of life through fun, friendship, fitness, and wealth
              creation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">
              Why Join IASC?
            </h2>
            <div className="w-20 h-1.5 bg-primaryColor mx-auto mb-6 rounded-full" />
            <p className="text-gray-500 text-lg">
              Membership at Island Allstars Sports Club is more than just sports. It's your pass to an exclusive lifestyle, brotherhood, and a thriving professional network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primaryColor/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#001429] to-primaryColor flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#001429] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {benefit.description}
                  </p>
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
            <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">
              Membership Plan
            </h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Unlock exclusive benefits, access the member portal, and support
              the club. All memberships are billed annually and come with a
              welcome pack.
            </p>
          </div>

          <div className="flex justify-center max-w-2xl mx-auto w-full">
            {membershipTiers.map((tier, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} className="w-full">
                <div className="relative rounded-3xl overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#001429] to-[#2052DA] text-white shadow-2xl border border-[#386bf2] w-full">
                  <div className="absolute top-0 left-0 right-0 bg-primaryColor text-white text-[10px] font-black uppercase tracking-[0.2em] text-center py-2">
                    Official Membership
                  </div>

                  <div className="p-8 md:p-10 pt-12">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-black uppercase text-white">
                          {tier.name}
                        </h3>
                        <p className="text-sm mt-2 text-blue-100">
                          {tier.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 flex items-end gap-1">
                      <span className="text-4xl md:text-5xl font-black">
                        {tier.price}
                      </span>
                      <span className="text-sm font-semibold pb-1 text-blue-200">
                        {tier.period}
                      </span>
                    </div>

                    <Link href="/join-iasc" className="block w-full">
                      <button className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 bg-white text-primaryColor hover:bg-gray-100 hover:shadow-lg">
                        {tier.buttonText}
                      </button>
                    </Link>
                  </div>

                  <div className="p-8 md:p-10 border-t border-blue-800/50 bg-black/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
                      What's included
                    </p>
                    <ul className="space-y-4">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 flex-shrink-0 text-blue-300" />
                          <span className="text-sm leading-tight text-white">
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
          <h2 className={`text-3xl md:text-5xl font-black text-white uppercase mb-6 ${sofiaSansCondensed.className}`}>
            Ready to Join the Brotherhood?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of members who are already enjoying the exclusive
            benefits of Island Allstars Sports Club. Connect, stay fit, and create wealth together.
          </p>
          <Link href="/join-iasc">
            <button className="px-10 py-4 bg-primaryColor text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(32,82,218,0.4)]">
              Register Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
