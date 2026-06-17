import Link from "next/link";
import { Trophy } from "lucide-react";
import { Sofia_Sans_Condensed } from "next/font/google";
import { tournamentWinners } from "@/data/tournaments";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

export default function TournamentHistory() {
  return (
    <div className="w-full mt-24 mb-12">
      <h3 className={`text-3xl font-black uppercase tracking-tight mb-8 text-center ${sofiaSansCondensed.className}`}>
        Tournament Champions History
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {tournamentWinners.map((tourney, idx) => (
          <Link 
            key={idx} 
            href={`/stats/tournaments/${tourney.year}`}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
              <Trophy size={32} />
            </div>
            <div className="text-3xl font-black text-[#001429] mb-1">{tourney.year}</div>
            <h4 className="text-lg font-bold text-[#FF4D00] mb-1">{tourney.winner}</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#FF4D00] transition-colors">Champions</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
