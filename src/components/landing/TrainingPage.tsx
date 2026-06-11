"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { Calendar, Clock, MapPin, Target, Users, Zap, Shield, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});


const programs = [
  {
    title: "Football Training & Matches",
    description: "Intense tactical training, fitness drills, and competitive matches. Home/Away schedules apply on match days.",
    icon: <Users className="w-8 h-8 text-[#2052DA]" />,
    schedule: "Thu, Sat",
    level: "All Levels",
  },
];

const schedule = [
  { day: "Thursday", sessions: [{ time: "16:00 - 18:00", name: "Football Training" }] },
  { day: "Saturday", sessions: [{ time: "08:00 - 12:00", name: "Football Training / Home Match" }, { time: "TBD", name: "Away Match (Opponent's Schedule)" }] },
];

export default function TrainingPage() {
  return (
    <div className="bg-[#f7f9fc] min-h-screen pb-20">
      <Breadcrumb title="Training & Programs" />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#001429] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg-3.webp"
            alt="Island FC Training"
            fill
            priority
            className="object-cover opacity-30 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001429] via-[#001429]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primaryColor text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-4">
              Elevate Your Game
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className={`text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6 ${sofiaSansCondensed.className}`}>
              Fitness, Sports & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">Brotherhood</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              From competitive football to indoor games, our diverse physical fitness programs are designed to keep members healthy, active, and connected.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">Our Activities</h2>
            <div className="w-20 h-1.5 bg-primaryColor mx-auto mb-6 rounded-full" />
            <p className="text-gray-500 text-lg">
              We offer structured weekly sessions designed to improve physical conditioning, cardiovascular health, and strategic thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {programs.map((prog, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primaryColor/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#001429] to-primaryColor flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-white rounded-full p-2">{prog.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#001429] mb-3">{prog.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{prog.description}</p>
                  
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                      <Calendar className="w-4 h-4 text-primaryColor" />
                      <span>{prog.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                      <Target className="w-4 h-4 text-primaryColor" />
                      <span>{prog.level}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
            
            <FadeIn delay={0.2} className="relative h-full min-h-[250px] md:min-h-[350px] w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/members/memberImage11.webp"
                alt="Football Training Session"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">Weekly Schedule</h2>
              <div className="w-20 h-1.5 bg-primaryColor mb-4 rounded-full" />
              <p className="text-gray-500">Regular activity times at the IASC grounds.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#001429] bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
              <MapPin className="w-5 h-5 text-primaryColor" />
              Lagos Business School Sports Complex
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schedule.map((dayPlan, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-[#001429] px-6 py-4">
                    <h3 className="text-white font-black uppercase tracking-wider">{dayPlan.day}</h3>
                  </div>
                  <div className="p-6 divide-y divide-gray-50">
                    {dayPlan.sessions.map((session, sIdx) => (
                      <div key={sIdx} className="py-3 first:pt-0 last:pb-0">
                        <p className="text-primaryColor text-xs font-bold flex items-center gap-1.5 mb-1">
                          <Clock className="w-3.5 h-3.5" />
                          {session.time}
                        </p>
                        <p className="text-[#001429] font-semibold text-sm leading-tight">{session.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
            
            {/* Call to action card in schedule grid */}
            <FadeIn delay={0.4}>
              <div className="bg-gradient-to-br from-primaryColor to-[#001429] rounded-2xl shadow-sm border border-blue-800 p-6 flex flex-col justify-center items-center text-center h-full">
                <h3 className="text-white font-black uppercase text-xl mb-3">Family Inclusive</h3>
                <p className="text-blue-100 text-sm mb-6">Our activities are designed to accommodate the wives and children of our esteemed members.</p>
                <Link href="/membership" className="w-full">
                  <button className="w-full py-3 bg-white text-[#001429] rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-gray-50 transition-colors">
                    Join The Family
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className={`text-3xl md:text-5xl font-black text-[#001429] uppercase mb-6 ${sofiaSansCondensed.className}`}>
            Ready to Join The Action?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            All sporting activities are exclusive to registered Island Allstars members. Secure your spot in the brotherhood today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/membership">
              <button className="w-full sm:w-auto px-10 py-4 bg-[#001429] text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primaryColor transition-all duration-300">
                View Memberships
              </button>
            </Link>
            <Link href="/join-iasc">
              <button className="w-full sm:w-auto px-10 py-4 bg-primaryColor text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group">
                Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
