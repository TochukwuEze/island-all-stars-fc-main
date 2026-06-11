import type { Metadata } from "next";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Stats and Analytics | Island Football Club",
  description: "View the latest player metrics and team standings.",
};

const teams = [
  { pos: 1, name: "Team A", p: 6, w: 4, d: 1, l: 1, f: 12, pts: 13, sponsorName: "Acme Corp", sponsorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Acme" },
  { pos: 2, name: "Team B", p: 6, w: 3, d: 2, l: 1, f: 10, pts: 11, sponsorName: "Globex Inc", sponsorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Globex" },
  { pos: 3, name: "Team C", p: 6, w: 2, d: 2, l: 2, f: 8, pts: 8, sponsorName: "Soylent Corp", sponsorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Soylent" },
  { pos: 4, name: "Team D", p: 6, w: 0, d: 1, l: 5, f: 4, pts: 1, sponsorName: "Initech", sponsorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Initech" },
];

export default function StatsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />

      <main className="flex-1 bg-[#f9f9f9] text-black py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <p className="text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            Island Allstars
          </p>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-16 ${sofiaSansCondensed.className}`}
          >
            End of Year League
          </h1>

          {/* Table Container */}
          <div className="w-full bg-white shadow-sm border border-gray-100">
            <div className="bg-black text-white px-6 py-4 border-t-4 border-[#FF4D00]">
              <h3 className="text-sm font-bold uppercase tracking-widest">
                Full League Standings
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 font-semibold text-[11px] uppercase tracking-wider bg-gray-50">
                    <th className="py-4 px-6 text-left w-16">Pos</th>
                    <th className="py-4 px-6 text-left">Team</th>
                    <th className="py-4 px-4 w-12">Played</th>
                    <th className="py-4 px-4 w-12">Won</th>
                    <th className="py-4 px-4 w-12">Drawn</th>
                    <th className="py-4 px-4 w-12">Lost</th>
                    <th className="py-4 px-4 w-12">Goals</th>
                    <th className="py-4 px-4 w-12">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-5 px-6 text-left font-medium text-gray-400 text-base">
                        {team.pos}
                      </td>
                      <td className="py-5 px-6 text-left font-bold text-[#FF4D00] flex items-center gap-4 text-base">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <svg
                            className="w-4 h-4 text-gray-400"
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
                        {team.name}
                      </td>
                      <td className="py-5 px-4 text-gray-500 font-medium">
                        {team.p}
                      </td>
                      <td className="py-5 px-4 text-gray-500 font-medium">
                        {team.w}
                      </td>
                      <td className="py-5 px-4 text-gray-500 font-medium">
                        {team.d}
                      </td>
                      <td className="py-5 px-4 text-gray-500 font-medium">
                        {team.l}
                      </td>
                      <td className="py-5 px-4 text-gray-500 font-medium">
                        {team.f}
                      </td>
                      <td className="py-5 px-4 text-black font-bold text-lg">
                        {team.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team Sponsors */}
          <div className="w-full mt-16">
            <h3 className={`text-3xl font-black uppercase tracking-tight mb-8 text-center ${sofiaSansCondensed.className}`}>
              Team Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teams.map((team, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-50 group-hover:border-[#FF4D00]/20 transition-colors mb-4">
                    <img 
                      src={team.sponsorAvatar} 
                      alt={team.sponsorName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{team.sponsorName}</h4>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#FF4D00]">Sponsor of {team.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
