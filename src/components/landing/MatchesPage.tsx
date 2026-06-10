"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});


const upcomingFixtures = [
  { date: "Saturday, May 18, 2026", time: "16:00", opponent: "Ikoyi Club Veterans", venue: "Home - LBS Sports Complex", competition: "Above 45 Tournament", type: "Home" },
  { date: "Saturday, May 25, 2026", time: "15:30", opponent: "VGC Allstars", venue: "Away - VGC Stadium", competition: "Synergy Cup", type: "Away" },
  { date: "Wednesday, Jun 3, 2026", time: "19:00", opponent: "Team Blue vs Team Red", venue: "Home - LBS Sports Complex", competition: "Monthly Internal Match", type: "Internal" },
];

const recentResults = [
  { date: "May 11, 2026", opponent: "Mainland Veterans", result: "W", score: "3 - 1", competition: "Synergy Cup", homeTeam: "Island Allstars", awayTeam: "Mainland Veterans" },
  { date: "May 4, 2026", opponent: "Homecoming Match", result: "D", score: "2 - 2", competition: "Novelty Match", homeTeam: "Island Legends", awayTeam: "Island Active" },
  { date: "April 28, 2026", opponent: "Festac Allstars", result: "W", score: "2 - 0", competition: "Club Friendly", homeTeam: "Island Allstars", awayTeam: "Festac Allstars" },
];

const standings = [
  { pos: 1, team: "Ikoyi Club Veterans", p: 5, w: 4, d: 1, l: 0, gd: "+8", pts: 13 },
  { pos: 2, team: "Island Allstars", p: 5, w: 3, d: 2, l: 0, gd: "+6", pts: 11 },
  { pos: 3, team: "VGC Allstars", p: 5, w: 2, d: 2, l: 1, gd: "+2", pts: 8 },
  { pos: 4, team: "Lagos Country Club", p: 5, w: 1, d: 2, l: 2, gd: "-1", pts: 5 },
  { pos: 5, team: "Festac Allstars", p: 5, w: 0, d: 1, l: 4, gd: "-15", pts: 1 },
];

export default function MatchesPage() {
  return (
    <div className="bg-[#f7f9fc] min-h-screen pb-20">
      <Breadcrumb title="Matches & Fixtures" />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#0d0d0d] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg-2.webp"
            alt="Island FC Match"
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
              Match Center
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className={`text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6 ${sofiaSansCondensed.className}`}>
              Follow the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">Action Live</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Stay up to date with Island Allstars' latest fixtures, recent results, and tournament standings. Cheer on our members on the pitch!
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Fixtures and Results */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Upcoming Fixtures */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-black text-[#001429] uppercase flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primaryColor" /> Upcoming Fixtures
                </h2>
              </div>
              
              <div className="space-y-4">
                {upcomingFixtures.map((fixture, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primaryColor/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primaryColor bg-primaryColor/10 px-2.5 py-1 rounded-full">
                            {fixture.competition}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${fixture.type === "Home" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                            {fixture.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#001429] mb-1">vs {fixture.opponent}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {fixture.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {fixture.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {fixture.venue}</span>
                        </div>
                      </div>
                      {fixture.type === "Home" && (
                        <button className="md:ml-4 px-6 py-3 bg-[#001429] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primaryColor transition-colors flex-shrink-0">
                          Add to Calendar
                        </button>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            {/* Recent Results */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-black text-[#001429] uppercase flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-primaryColor" /> Recent Results
                </h2>
              </div>
              
              <div className="space-y-3">
                {recentResults.map((result, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex-1 w-full flex justify-between items-center text-sm font-semibold text-gray-500">
                        <span className="flex-1 text-right">{result.homeTeam}</span>
                        <div className="mx-6 px-4 py-2 bg-[#001429] text-white text-lg font-black rounded-lg min-w-[80px] text-center">
                          {result.score}
                        </div>
                        <span className="flex-1 text-left">{result.awayTeam}</span>
                      </div>
                      <div className="w-full sm:w-auto flex justify-between sm:flex-col items-center sm:items-end gap-1 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{result.date}</span>
                        <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-white ${
                          result.result === "W" ? "bg-green-500" : result.result === "D" ? "bg-gray-400" : "bg-red-500"
                        }`}>{result.result}</span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar: Standings & Tickets */}
          <div className="space-y-8">
            
            {/* League Table */}
            <FadeIn direction="left">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#001429] uppercase mb-6 pb-4 border-b border-gray-100">
                  Synergy Cup Group Stage
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                        <th className="pb-3 text-left font-semibold">Pos</th>
                        <th className="pb-3 text-left font-semibold">Club</th>
                        <th className="pb-3 text-center font-semibold">P</th>
                        <th className="pb-3 text-center font-semibold">GD</th>
                        <th className="pb-3 text-right font-semibold">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {standings.map((team, idx) => (
                        <tr key={idx} className={`${team.team === "Island FC" ? "bg-primaryColor/5" : ""}`}>
                          <td className="py-3 font-semibold text-gray-500">{team.pos}</td>
                          <td className={`py-3 font-bold ${team.team === "Island FC" ? "text-primaryColor" : "text-[#001429]"}`}>
                            {team.team}
                          </td>
                          <td className="py-3 text-center text-gray-500">{team.p}</td>
                          <td className="py-3 text-center text-gray-500">{team.gd}</td>
                          <td className="py-3 text-right font-black text-[#001429]">{team.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link href="#" className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-primaryColor hover:text-[#001429] transition-colors pt-4 border-t border-gray-50">
                  View Full Table <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            {/* CTA Box */}
            <FadeIn direction="left" delay={0.2}>
              <div className="bg-gradient-to-br from-primaryColor to-[#001429] rounded-3xl p-8 text-center text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-black uppercase mb-3 relative z-10">Post-Match Social</h3>
                <p className="text-sm text-blue-100 mb-6 relative z-10">
                  Join us after the match for drinks, food, and brotherhood at the clubhouse.
                </p>
                <button className="w-full py-3 bg-white text-[#001429] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-gray-100 transition-colors relative z-10">
                  View Social Calendar
                </button>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}
