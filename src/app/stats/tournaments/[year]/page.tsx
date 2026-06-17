import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Trophy, ArrowLeft } from "lucide-react";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { tournamentWinners } from "@/data/tournaments";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Tournament Champions | Island Football Club`,
    description: `Details of the ${year} End of Year League Tournament Champions.`,
  };
}

export default async function TournamentDetailsPage({ params }: Props) {
  const { year } = await params;
  const tourney = tournamentWinners.find((t) => t.year.toString() === year);

  if (!tourney) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />

      <main className="flex-1 bg-[#f9f9f9] text-black">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] min-h-[400px] bg-black">
          <img 
            src={tourney.images[0]} 
            alt={`${tourney.winner} ${tourney.year} Celebration`}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9f9] via-transparent to-black/50" />
          
          <div className="absolute top-8 left-8 md:left-24 z-10">
            <Link 
              href="/stats" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-xs uppercase tracking-widest transition-all"
            >
              <ArrowLeft size={16} />
              Back to Stats
            </Link>
          </div>

          <div className="absolute bottom-16 left-0 right-0 px-6 md:px-24">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 backdrop-blur-md flex items-center justify-center border border-yellow-500/30">
                    <Trophy size={24} className="text-yellow-400" />
                  </div>
                  <span className="font-black text-yellow-400 uppercase tracking-widest text-sm drop-shadow-md">
                    {tourney.year} Champions
                  </span>
                </div>
                <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tight text-white drop-shadow-xl ${sofiaSansCondensed.className}`}>
                  {tourney.winner}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-6 md:px-24 py-16 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Main Details */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className={`text-3xl font-black uppercase tracking-tight text-[#001429] mb-6 ${sofiaSansCondensed.className}`}>
                  The Journey to Victory
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="leading-relaxed font-medium">
                    {tourney.details}
                  </p>
                  <p className="mt-6 leading-relaxed">
                    The {tourney.year} End of Year League was one for the history books. {tourney.winner} demonstrated incredible resilience, tactical brilliance, and a relentless desire to lift the trophy.
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Championship Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-2xl overflow-hidden group">
                      <img src={tourney.images[0]} alt="Gallery 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    {/* Placeholder for more images if they existed in the array */}
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">More images coming soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-[#001429] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-white/5">
                  <Trophy size={160} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-6 border-b border-white/10 pb-4">
                    Tournament Stats
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Season</p>
                      <p className="text-2xl font-black text-white">{tourney.year}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Tournament</p>
                      <p className="text-lg font-bold text-white">End of Year League</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Status</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00]/20 text-[#FF4D00] rounded-full text-xs font-bold uppercase tracking-wider">
                        <Trophy size={12} />
                        Champions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
