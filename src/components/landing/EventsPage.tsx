"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { Calendar, MapPin, Clock, ArrowRight, Star } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";


const upcomingEvents = [
  {
    title: "Island FC Annual Gala & Awards Night",
    date: "June 15, 2026",
    time: "19:00 - 23:00",
    location: "Eko Hotels & Suites, Victoria Island",
    description: "Join us as we celebrate the achievements of our players, staff, and community members over the past season. Black tie event.",
    type: "Club Event",
    image: "/images/hero-bg.webp",
  },
  {
    title: "Youth Academy Open Tryouts",
    date: "July 4, 2026",
    time: "08:00 - 14:00",
    location: "Lekki Phase 1 Sports Complex",
    description: "Calling all young talents! We are hosting open tryouts for our U-15 and U-18 academy squads. Pre-registration is required.",
    type: "Academy",
    image: "/images/hero-bg-2.webp",
  },
  {
    title: "Community Health & Fitness Day",
    date: "August 20, 2026",
    time: "09:00 - 15:00",
    location: "Island FC Training Grounds",
    description: "A free event for the local community featuring free health checkups, fitness classes, and 5-a-side fun matches.",
    type: "Community",
    image: "/images/hero-bg-3.webp",
  },
];

const pastEvents = [
  { title: "2025 End of Season Party", date: "December 2025" },
  { title: "LFA Charity Cup Tournament", date: "October 2025" },
  { title: "Coaching Masterclass with Pro Staff", date: "August 2025" },
  { title: "Island FC Beach Soccer Day", date: "June 2025" },
];

export default function EventsPage() {
  return (
    <div className="bg-[#f7f9fc] min-h-screen pb-20">
      <Breadcrumb title="Club Events" />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-[#0d0d0d] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg-ai.webp"
            alt="Island FC Events"
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
              Connect & Celebrate
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
              Upcoming <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-blue-400">Club Events</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              From glamorous galas to community outreach programs, stay updated on everything happening off the pitch at Island Football Club.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Upcoming Events */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-black text-[#001429] uppercase mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primaryColor" /> Mark Your Calendars
            </h2>
            
            <div className="space-y-6">
              {upcomingEvents.map((event, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col sm:flex-row group">
                    <div className="sm:w-2/5 relative h-60 sm:h-auto bg-gray-100 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-primaryColor text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                        {event.type}
                      </div>
                    </div>
                    
                    <div className="sm:w-3/5 p-6 md:p-8 flex flex-col">
                      <h3 className="text-2xl font-bold text-[#001429] mb-4 group-hover:text-primaryColor transition-colors">{event.title}</h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Calendar className="w-4 h-4 text-primaryColor" /> {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Clock className="w-4 h-4 text-primaryColor" /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <MapPin className="w-4 h-4 text-primaryColor" /> {event.location}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{event.description}</p>
                      
                      <button className="self-start px-6 py-3 bg-[#f4f7f9] text-[#001429] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primaryColor hover:text-white transition-colors flex items-center gap-2">
                        RSVP / Tickets <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* VIP Box */}
            <FadeIn direction="left">
              <div className="bg-gradient-to-br from-[#001429] to-[#1469B4] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <Star className="w-10 h-10 text-yellow-400 mb-6" />
                <h3 className="text-2xl font-black uppercase mb-3">Host Your Event With Us</h3>
                <p className="text-sm text-blue-100 mb-8 leading-relaxed">
                  Looking for a unique venue? Our sports complex and VIP lounges are available for private hire, corporate team building, and tournaments.
                </p>
                <Link href="/contact" className="block">
                  <button className="w-full py-4 bg-white text-[#001429] font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-gray-100 transition-colors">
                    Inquire Now
                  </button>
                </Link>
              </div>
            </FadeIn>

            {/* Past Events Highlights */}
            <FadeIn direction="left" delay={0.2}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-[#001429] uppercase mb-6 pb-4 border-b border-gray-100">
                  Past Events Archive
                </h3>
                <div className="space-y-4">
                  {pastEvents.map((pe, i) => (
                    <div key={i} className="group cursor-pointer">
                      <p className="text-sm font-bold text-gray-700 group-hover:text-primaryColor transition-colors mb-1">{pe.title}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{pe.date}</p>
                      {i < pastEvents.length - 1 && <div className="h-px bg-gray-50 mt-4" />}
                    </div>
                  ))}
                </div>
                <Link href="/gallery" className="mt-6 block text-center">
                  <button className="w-full py-3 border-2 border-gray-100 text-gray-500 font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-gray-50 hover:text-primaryColor transition-colors">
                    View Event Gallery
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
