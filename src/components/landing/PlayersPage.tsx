"use client";

import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { User, Shield, Info } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const squad = [
  {
    name: "David Ojo",
    number: 1,
    position: "Goalkeeper",
    image: "/images/members/memberImage1.webp",
    nationality: "Nigeria",
  },
  {
    name: "Michael Adeyemi",
    number: 4,
    position: "Defender",
    image: "/images/members/memberImage2.webp",
    nationality: "Nigeria",
  },
  {
    name: "Samuel Uche",
    number: 5,
    position: "Defender",
    image: "/images/members/memberImage1.webp",
    nationality: "Nigeria",
  },
  {
    name: "Emeka Okafor",
    number: 8,
    position: "Midfielder",
    image: "/images/members/memberImage2.webp",
    nationality: "Nigeria",
  },
  {
    name: "Chinedu Eze",
    number: 10,
    position: "Midfielder",
    image: "/images/members/memberImage1.webp",
    nationality: "Nigeria",
  },
  {
    name: "Tunde Bakare",
    number: 9,
    position: "Forward",
    image: "/images/members/memberImage11.webp",
    nationality: "Nigeria",
  },
  {
    name: "Kelechi Iheanacho",
    number: 11,
    position: "Forward",
    image: "/images/members/memberImage1.webp",
    nationality: "Nigeria",
  },
  {
    name: "Peter Okoye",
    number: 7,
    position: "Forward",
    image: "/images/members/memberImage2.webp",
    nationality: "Nigeria",
  },
];

export default function PlayersPage() {
  const groupedSquad = squad.reduce(
    (acc, player) => {
      if (!acc[player.position]) acc[player.position] = [];
      acc[player.position].push(player);
      return acc;
    },
    {} as Record<string, typeof squad>,
  );

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

  return (
    <div className="bg-[#f7f9fc] min-h-screen pb-20">
      <Breadcrumb title="First Team Squad" />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#0d0d0d] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/members/memberImage10.webp"
            alt="Island FC Squad"
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
              The Warriors
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
              First Team <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">
                Squad 2026
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Meet the elite athletes representing Island All-Stars Sports Club.
              Driven by passion, united by the crest.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Squad Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        {positions.map((pos) => {
          if (!groupedSquad[pos]) return null;
          return (
            <div key={pos} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-[#001429] uppercase">
                  {pos}s
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {groupedSquad[pos].map((player, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-80 w-full bg-gray-100 overflow-hidden">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#001429] w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl shadow-sm">
                          {player.number}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001429]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                          <button className="w-full py-2.5 bg-primaryColor text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2">
                            <Info className="w-3 h-3" /> Player Profile
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-primaryColor text-[10px] font-black uppercase tracking-widest mb-1">
                          {player.position}
                        </p>
                        <h4 className="text-lg font-bold text-[#001429] mb-1">
                          {player.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" /> {player.nationality}
                          </span>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Staff Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-[#001429] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-40 w-80 h-80 bg-primaryColor/20 rounded-full blur-[80px]" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-black text-white uppercase mb-4">
              Technical Staff
            </h2>
            <p className="text-gray-400">
              Behind every great team is a group of dedicated professionals.
              Meet our coaches, physios, and support staff who work tirelessly
              behind the scenes.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-white hover:text-[#001429] transition-colors whitespace-nowrap">
            View Staff Directory
          </button>
        </div>
      </div>
    </div>
  );
}
