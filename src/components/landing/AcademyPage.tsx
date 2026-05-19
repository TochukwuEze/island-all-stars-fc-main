"use client";

import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { ArrowRight, Trophy, Users, Star, Target, Zap, Shield } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const ageGroups = [
  { group: "U-12 Academy", desc: "Focus on technical fundamentals, fun, and building a love for the game.", age: "8-12 Years", icon: <Star className="w-6 h-6 text-primaryColor" /> },
  { group: "U-15 Academy", desc: "Tactical introduction, physical development, and competitive matches.", age: "13-15 Years", icon: <Target className="w-6 h-6 text-primaryColor" /> },
  { group: "U-18 Elite", desc: "High-performance training, showcase events, and transition to senior football.", age: "16-18 Years", icon: <Trophy className="w-6 h-6 text-primaryColor" /> },
];

export default function AcademyPage() {
  return (
    <div className="bg-[#f7f9fc] min-h-screen pb-20">
      <Breadcrumb title="Youth Academy" />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#0d0d0d] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg-ai.webp"
            alt="Island FC Academy"
            fill
            priority
            className="object-cover opacity-40 mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001429] via-[#001429]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-primaryColor text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-4">
              Shaping The Future
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
              Island FC <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">Youth Academy</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Developing the next generation of football stars through elite coaching, state-of-the-art facilities, and a commitment to personal growth.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <Link href="/join-ifc">
              <button className="px-8 py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                Apply for Academy
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero-bg.webp"
                  alt="Academy Training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#001429]/60 to-transparent" />
                <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-lg max-w-xs">
                  <div className="flex items-center gap-4 mb-2">
                    <Users className="w-8 h-8 text-primaryColor" />
                    <span className="text-3xl font-black text-[#001429]">250+</span>
                  </div>
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Active Academy Players</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div>
                <p className="text-primaryColor text-xs font-black uppercase tracking-widest mb-3">Our Philosophy</p>
                <h2 className="text-3xl md:text-4xl font-black text-[#001429] uppercase mb-6 leading-tight">
                  Developing Players. <br /> Building Character.
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 text-lg">
                  At the Island FC Academy, we believe that great footballers are built on a foundation of great character. Our holistic approach to player development ensures that every young athlete grows not just on the pitch, but in life.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "UEFA-Licensed Coaching Staff",
                    "Video Analysis & Performance Tracking",
                    "Academic Support & Mentorship",
                    "Clear Pathway to the First Team"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-gray-700 font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 bg-[#001429]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Academy Squads</h2>
            <div className="w-20 h-1 bg-primaryColor mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">Tailored development programs structured specifically for different age groups to maximize learning and performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((squad, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {squad.icon}
                  </div>
                  <div className="text-primaryColor text-xs font-bold uppercase tracking-widest mb-2">{squad.age}</div>
                  <h3 className="text-2xl font-black text-white uppercase mb-4">{squad.group}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">{squad.desc}</p>
                  <Link href="/join-ifc" className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-wider group-hover:text-primaryColor transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
