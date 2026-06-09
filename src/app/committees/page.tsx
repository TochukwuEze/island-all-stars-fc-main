import type { Metadata } from "next";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Sofia_Sans_Condensed, Montserrat } from "next/font/google";
import { Users } from "lucide-react";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Our Committees | Island Football Club",
  description: "Meet the dedicated committees driving the success and organization of Island Football Club.",
};

const committees = [
  {
    title: "Constitution Review Committee",
    members: [
      { name: "Barrister Ibe Onwunali", role: "Chairman" },
      { name: "Mr. Chidi Duru", role: "Secretary" },
      { name: "Dr. Okey Anyadiegwu", role: "Member" },
      { name: "Barrister Ben Uzoka", role: "Member" },
      { name: "Sir Ben Azuh", role: "Member" },
      { name: "Dr. Udo Agomonso", role: "Member" },
      { name: "Chief Jaja Ihesiaba", role: "Member" }
    ]
  },
  {
    title: "Alcoholic/Substance Control Committee",
    members: [
      { name: "Derrick Brown Obiora Igboegwu", role: "Chairman" },
      { name: "Ikem Ugwuanodi Yabash", role: "Vice Chairman" },
      { name: "Tony Maduka", role: "Secretary" },
      { name: "Chidozie Agu", role: "Member" },
      { name: "Maduwike Emeka", role: "Member" },
      { name: "Nzewuba Oparaocha Elechi", role: "Member" },
      { name: "Obinna Duruibe", role: "Member" }
    ]
  },
  {
    title: "Corporate Bodies Liaison Committee",
    members: [
      { name: "Mr. Elvis Okoli", role: "Chairman" },
      { name: "Mr. Uche Ifemeludike", role: "Vice Chairman" },
      { name: "Mr. Arinze Ehidonye (Abadaba)", role: "Secretary" },
      { name: "Mr. Gbenga Awokoya", role: "Exco Liaison" },
      { name: "Mr. Emeka Nwankwo (Mekzy)", role: "Member" },
      { name: "Mr. Austin Ejola", role: "Member" },
      { name: "Dr. Udo Agomonso", role: "Member" }
    ]
  },
  {
    title: "Security Committee",
    members: [
      { name: "Mr. Chika Azubike (Royalty)", role: "Chairman" },
      { name: "Mr. Martin Ohanele", role: "Vice Chairman" },
      { name: "Mr. Victor Nwadike", role: "Secretary" },
      { name: "CSP. Bonny Alinta (VP)", role: "Exco Liaison Officer" },
      { name: "Mr. Ikechukwu Eze", role: "Member" },
      { name: "Mr. Dike Lawrence", role: "Member" },
      { name: "Mr. Austin Okafor", role: "Member" },
      { name: "Mr. Chima Njoku", role: "Member" }
    ]
  },
  {
    title: "League Management Committee",
    members: [
      { name: "Mr. Kelvin O. Irikefe", role: "Chairman" },
      { name: "Chief Ike Okorafor", role: "Secretary" },
      { name: "Mr. Bonny Alinta (VP)", role: "Exco Liaison Officer" },
      { name: "Mr. Gbenga Awokoya", role: "PRO" },
      { name: "Mr. Ogbonna Kanu", role: "Member" },
      { name: "Mr. Peter Ogemdi Nwaugo", role: "Member" },
      { name: "Mr. Joe Igwe", role: "Member" },
      { name: "Mr. Emeka Ibe", role: "Member" }
    ]
  },
  {
    title: "Welfare Committee",
    members: [
      { name: "Mr. Nelson Ekwegh (Jojo)", role: "Chairman" },
      { name: "Mr. Tony Chukwuma", role: "Vice Chairman" },
      { name: "Mr. Obinna Azonobi", role: "Secretary" },
      { name: "Mr. Chris Inokwere", role: "Director Welfare/Exco Liaison" },
      { name: "Mr. Emeka Agukwe", role: "Member" },
      { name: "Mr. Emeka Asikabulu", role: "Member" }
    ]
  },
  {
    title: "Works and Projects Committee",
    members: [
      { name: "Chief Kenneth Okeke", role: "Chairman" },
      { name: "Comrade Chidinma Onyenagubo", role: "Vice Chairman" },
      { name: "Martin Ohanele", role: "Secretary" },
      { name: "Nonso Nwosu", role: "Financial Secretary" },
      { name: "Chief Kenneth Osuagwu", role: "Member" },
      { name: "Chief Uchenna Julius Onuoha (Don King)", role: "Member" },
      { name: "Lincoln Chukwunyere", role: "Member" },
      { name: "Chief Chijioke Isiolu", role: "Member" },
      { name: "Andora Ezeokafor (Onowu)", role: "Member" }
    ]
  },
  {
    title: "Health Committee",
    members: [
      { name: "Dr Emmanuel Nwaka", role: "Chairman" },
      { name: "Amaechi Nnaji", role: "Secretary" },
      { name: "Maduawuchukwu Calistus (Ala Owerri)", role: "Member" },
      { name: "Emeka Ajomiwe", role: "Member" },
      { name: "Ikechukwu Patrick Nioku (Scarface)", role: "Member" },
      { name: "Kenechukwu Eke", role: "Member" }
    ]
  },
  {
    title: "Legal Services",
    members: [
      { name: "Barrister Ben Uzoka", role: "Legal Adviser" },
      { name: "Barrister Ibe Onwunali", role: "Head Legal Services" },
      { name: "Barrister Victor Odebala", role: "Assistant Legal Services" }
    ]
  },
  {
    title: "Presidential Advisory Committee",
    members: [
      { name: "Barrister Briggs Amajuoyi", role: "Chairman" },
      { name: "Mr. Nnaji Ede", role: "Secretary" },
      { name: "Mr. Chuma Ukaere", role: "Member" },
      { name: "Barrister Chijioke Isiolu", role: "Member" },
      { name: "Mr. Uche Onumajulu", role: "Member" },
      { name: "Chief Ugochukwu Duru", role: "Member" },
      { name: "Chief Kelechi Onuoha", role: "Member" }
    ]
  },
  {
    title: "Audit Committee",
    members: [
      { name: "Alh. Haliru Momodu", role: "Chairman" },
      { name: "Mr. Charles Nwaozuzu", role: "Secretary" },
      { name: "Alh. Jubril Danesi", role: "Member" },
      { name: "Mr. Celestine Agba", role: "Member" },
      { name: "Chief Ike Okorafor", role: "Member" },
      { name: "Mr. Obinna Ofoha", role: "Member" },
      { name: "Mr. Martin Ohanele", role: "Member" }
    ]
  },
  {
    title: "Technology, New Media and Digital Economy Committee",
    members: [
      { name: "Mr Gbenga Awokoya", role: "Chairman" },
      { name: "Mr. Emeka Agukwe", role: "Vice Chairman" },
      { name: "Mr. Nnamdi Nzewuba", role: "Secretary" },
      { name: "Mr. Prince Nnadi", role: "Member" },
      { name: "Mr. Nonso Obidike", role: "Member" },
      { name: "Mr. Opara Godgive Tochukwu", role: "Member" },
      { name: "Mr. Ziad Offorha", role: "Member" }
    ]
  },
  {
    title: "Roadmap & Strategic Growth Committee",
    members: [
      { name: "Chief Ugochukwu Duru", role: "Chairman" },
      { name: "Barr Michael Akano", role: "Vice Chairman" },
      { name: "Chike Okwara", role: "Secretary" },
      { name: "Bonny Alinta", role: "Vice President" },
      { name: "Ben Ijezie", role: "Secretary General" },
      { name: "Lucky Oiwoh", role: "Member" },
      { name: "Barr Ikenna Ugochukwu", role: "Member" },
      { name: "Chief Kelechi Onuoha", role: "Member" },
      { name: "Eze Okeahia", role: "Member" }
    ]
  },
  {
    title: "Coaching Crew",
    members: [
      { name: "Mr. Ndukwe Chukwu", role: "Technical Director" },
      { name: "Chief Ugochukwu Duru", role: "Chief Coach" },
      { name: "Chief Kelechi Onuoha", role: "Assistant Coach" },
      { name: "Mr. Eastwood Ofojeh", role: "Trainer" }
    ]
  },
  {
    title: "Disciplinary Committee",
    members: [
      { name: "Santos Onwuzuruike", role: "Chairman" },
      { name: "Barr. Ibe Onwunali", role: "Vice Chairman" },
      { name: "Barr. Ben Uzoka", role: "Secretary" },
      { name: "Mr. Victor Nwadike", role: "Member" },
      { name: "Mr. Ikechukwu Pascal Oguguo", role: "Member" },
      { name: "Alh. Jubril Danesi", role: "Member" },
      { name: "Chief Nnaji Ede", role: "Member" }
    ]
  }
];

export default function CommitteesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar />
      <MainHeader />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#001429] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#2052DA] text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-4">
            Governance & Leadership
          </p>
          <h1 className={`text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6 ${sofiaSansCondensed.className}`}>
            Our Committees
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Discover the dedicated groups of individuals working tirelessly behind the scenes to ensure the smooth operation, growth, and integrity of Island All-Stars Sports Club.
          </p>
        </div>
      </section>

      {/* Committees Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {committees.map((committee, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              {/* Card Header */}
              <div className="bg-[#f8f9fa] border-b border-gray-100 px-6 py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2052DA] flex items-center justify-center shrink-0 mt-1">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-[#001429] uppercase tracking-tight leading-tight ${montserrat.className}`}>
                    {committee.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">{committee.members.length} Members</p>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6 flex-1 bg-white">
                <ul className="flex flex-col gap-4">
                  {committee.members.map((member, mIdx) => {
                    const isLeader = member.role.toLowerCase().includes("chairman") || 
                                     member.role.toLowerCase().includes("secretary") || 
                                     member.role.toLowerCase().includes("director") || 
                                     member.role.toLowerCase().includes("head") ||
                                     member.role.toLowerCase().includes("adviser");
                                     
                    return (
                      <li key={mIdx} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0 gap-4">
                        <span className={`text-[15px] ${isLeader ? 'font-bold text-[#001429]' : 'font-medium text-gray-600'}`}>
                          {member.name}
                        </span>
                        <span className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-full whitespace-nowrap text-right ${
                          isLeader 
                            ? 'bg-blue-50 text-[#2052DA] font-bold' 
                            : 'bg-gray-100 text-gray-500 font-semibold'
                        }`}>
                          {member.role}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
