import Link from "next/link";
import { Trophy } from "lucide-react";
import { Sofia_Sans_Condensed } from "next/font/google";
import { prisma } from "@/lib/prisma";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

export default async function TournamentHistory() {
  const tournamentWinners = await prisma.tournamentHistory.findMany({
    orderBy: { year: "desc" },
  });

  return (
    <div className="w-full mt-24 mb-12">
      <h3 className={`text-3xl font-black uppercase tracking-tight mb-8 text-center ${sofiaSansCondensed.className}`}>
        Tournament Champions History
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {tournamentWinners.map((tourney) => (
          <Link 
            key={tourney.id} 
            href={`/stats/tournaments/${tourney.year}`}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-colors overflow-hidden border-2 border-transparent group-hover:border-yellow-200">
              {tourney.sponsorLogo ? (
                <img src={tourney.sponsorLogo} alt={tourney.sponsorName || ""} className="w-full h-full object-cover bg-white" />
              ) : (
                <Trophy size={32} />
              )}
            </div>
            <div className="text-3xl font-black text-[#001429] mb-1">{tourney.year}</div>
            <h4 className="text-lg font-bold text-[#FF4D00] mb-1">{tourney.winner}</h4>
            <div className="flex items-center justify-center w-full gap-1.5 mt-2">
              {tourney.sponsorName ? (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#FF4D00] transition-colors">
                    Sponsored by:
                  </span>
                  <span className="text-[10px] font-black uppercase text-[#001429]">{tourney.sponsorName}</span>
                </>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#FF4D00] transition-colors">
                  Champions
                </span>
              )}
            </div>
          </Link>
        ))}
        {tournamentWinners.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">
            No tournament history available
          </div>
        )}
      </div>
    </div>
  );
}
