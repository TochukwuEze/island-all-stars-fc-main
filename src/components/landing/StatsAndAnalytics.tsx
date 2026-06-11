import React from "react";
import Link from "next/link";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

const teams = [
  { pos: 1, name: "Team A", p: 6, w: 4, d: 1, l: 1, f: 12, pts: 13 },
  { pos: 2, name: "Team B", p: 6, w: 3, d: 2, l: 1, f: 10, pts: 11 },
  { pos: 3, name: "Team C", p: 6, w: 2, d: 2, l: 2, f: 8, pts: 8 },
  { pos: 4, name: "Team D", p: 6, w: 0, d: 1, l: 5, f: 4, pts: 1 },
];

const StatsAndAnalytics = () => {
  return (
    <section className="bg-[#f9f9f9] text-black py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <p className="text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
          Island Allstars
        </p>
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-12 ${sofiaSansCondensed.className}`}
        >
          End of Year League
        </h2>

        {/* Table Container */}
        <div className="w-full bg-white shadow-sm border border-gray-100">
          <div className="bg-black text-white px-6 py-4 border-t-4 border-[#FF4D00]">
            <h3 className="text-xs font-bold uppercase tracking-widest">
              League Standings
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6 text-left w-16">Pos</th>
                  <th className="py-4 px-6 text-left">Team</th>
                  <th className="py-4 px-4 w-12">P</th>
                  <th className="py-4 px-4 w-12">W</th>
                  <th className="py-4 px-4 w-12">D</th>
                  <th className="py-4 px-4 w-12">L</th>
                  <th className="py-4 px-4 w-12">F</th>
                  <th className="py-4 px-4 w-12">Pts</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-left font-medium text-gray-400">
                      {team.pos}
                    </td>
                    <td className="py-4 px-6 text-left font-medium flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#FF4D00] hover:text-[#e64500] cursor-pointer transition-colors">
                        {team.name}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{team.p}</td>
                    <td className="py-4 px-4 text-gray-500">{team.w}</td>
                    <td className="py-4 px-4 text-gray-500">{team.d}</td>
                    <td className="py-4 px-4 text-gray-500">{team.l}</td>
                    <td className="py-4 px-4 text-gray-500">{team.f}</td>
                    <td className="py-4 px-4 text-gray-500">{team.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 text-right">
            <Link
              href="/stats"
              className="text-[#FF4D00] text-xs font-semibold hover:underline"
            >
              View full table
            </Link>
          </div>
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link
            href="/stats"
            className="bg-[#FF4D00] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#e64500] transition-colors inline-block"
          >
            View Report
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsAndAnalytics;
