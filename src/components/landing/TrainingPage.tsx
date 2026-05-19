"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { Calendar, Clock, MapPin, Target, Users, Zap, Shield, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";


const programs = [
  {
    title: "Senior Squad Training",
    description: "Intensive tactical and physical preparation for our competitive first and reserve teams.",
    icon: <Users className="w-8 h-8 text-[#1469B4]" />,
    schedule: "Tue, Thu, Sat",
    level: "Advanced",
  },
  {
    title: "Youth Academy",
    description: "Development-focused sessions for young talents to refine their skills and understanding of the game.",
    icon: <Target className="w-8 h-8 text-[#1469B4]" />,
    schedule: "Mon, Wed, Fri",
    level: "Beginner - Intermediate",
  },
  {
    title: "Fitness & Conditioning",
    description: "High-intensity cardio and strength training designed specifically for football endurance.",
    icon: <Zap className="w-8 h-8 text-[#1469B4]" />,
    schedule: "Wed, Sun",
    level: "All Levels",
  },
  {
    title: "Goalkeeper Coaching",
    description: "Specialized drills focusing on reflexes, distribution, positioning, and shot-stopping.",
    icon: <Shield className="w-8 h-8 text-[#1469B4]" />,
    schedule: "Tue, Thu",
    level: "Intermediate - Advanced",
  },
];

const schedule = [
  { day: "Monday", sessions: [{ time: "16:00 - 18:00", name: "Youth Academy (U12 - U15)" }, { time: "18:30 - 20:30", name: "Open Play / Scrimmage" }] },
  { day: "Tuesday", sessions: [{ time: "17:00 - 19:00", name: "Senior Squad Tactics" }, { time: "19:00 - 20:30", name: "Goalkeeper Clinic" }] },
  { day: "Wednesday", sessions: [{ time: "16:00 - 18:00", name: "Youth Academy (U16 - U18)" }, { time: "18:30 - 20:00", name: "Fitness & Conditioning" }] },
  { day: "Thursday", sessions: [{ time: "17:00 - 19:00", name: "Senior Squad Match Prep" }, { time: "19:00 - 20:30", name: "Goalkeeper Clinic" }] },
  { day: "Friday", sessions: [{ time: "16:00 - 18:30", name: "Youth Academy Match Prep" }] },
  { day: "Saturday", sessions: [{ time: "08:00 - 10:00", name: "Senior Squad Walkthrough" }, { time: "10:30 - 13:00", name: "Youth Matches" }] },
  { day: "Sunday", sessions: [{ time: "09:00 - 11:00", name: "Recovery & Conditioning" }, { time: "15:00 - 18:00", name: "Senior Matches" }] },
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
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
              Elite Training <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">For Every Level</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              From grassroots development to competitive senior squads, our professional coaching staff provides the perfect environment to hone your skills.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-4">Our Programs</h2>
            <div className="w-20 h-1.5 bg-primaryColor mx-auto mb-6 rounded-full" />
            <p className="text-gray-500 text-lg">
              We offer structured sessions designed to improve tactical awareness, technical ability, and physical conditioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primaryColor/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
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
              <p className="text-gray-500">Regular training times at the Island FC Main Ground.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#001429] bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
              <MapPin className="w-5 h-5 text-primaryColor" />
              Lekki Phase 1 Sports Complex
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
                <h3 className="text-white font-black uppercase text-xl mb-3">Private Sessions</h3>
                <p className="text-blue-100 text-sm mb-6">Need 1-on-1 coaching? Book a private session with our senior staff.</p>
                <Link href="/contact" className="w-full">
                  <button className="w-full py-3 bg-white text-[#001429] rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-gray-50 transition-colors">
                    Inquire Now
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
          <h2 className="text-3xl md:text-5xl font-black text-[#001429] uppercase mb-6">
            Ready to Join Training?
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            All training sessions are exclusive to registered Island FC members. Secure your spot on the pitch today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/membership">
              <button className="w-full sm:w-auto px-10 py-4 bg-[#001429] text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-primaryColor transition-all duration-300">
                View Memberships
              </button>
            </Link>
            <Link href="/join-ifc">
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
