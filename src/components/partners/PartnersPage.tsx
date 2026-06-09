"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

/* ─────────── DATA ─────────── */
const partners = [
  { name: "Premier League", logo: null, initials: "PL" },
  { name: "Spotify", logo: null, initials: "Spotify" },
  { name: "NPLF", logo: null, initials: "NPLF" },
  { name: "Henninger", logo: null, initials: "Henninger" },
  { name: "Champions League", logo: null, initials: "UCL" },
  { name: "Nike", logo: null, initials: "Nike" },
  { name: "Coca-Cola", logo: null, initials: "Coca-Cola" },
  { name: "Adidas", logo: null, initials: "adidas" },
];

const benefits = [
  "Accelerate youth and high-performing players reaching their peak",
  "Clubs grow stronger through expert-backed insights",
  "Partners connect clubs with our wide-ranging football network",
];

const testimonials = [
  {
    name: "Matteo Romano",
    location: "Milan, Italy",
    rating: 5,
    image: "/images/team/hugo.png",
    text: "Island FC helped our squad grow with their expert training and advice. The coaches guided us to reach new levels and boosted our club fast.",
  },
  {
    name: "Ethan Marshall",
    location: "Turin, Italy",
    rating: 5,
    image: "/images/team/geff.png",
    text: "Island FC sparked our group with new methods and great support. Their team's love for football gave us a strong push on the pitch.",
  },
  {
    name: "Giovanni Russo",
    location: "Rome, Italy",
    rating: 5,
    image: "/images/team/robert.png",
    text: "IFC's creative events for fans made our matches much more fun. Their support and bold ideas gave our club a bright and loyal crowd.",
  },
];

/* ─────────── SECTION: Page Hero ─────────── */
function PartnersHero() {
  return (
    <div className="bg-white py-16 text-center border-b border-zinc-100">
      <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-3">
        Trusted Collaborators
      </p>
      <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-[#1a1a1a]">
        OUR PARTNERS
      </h1>
    </div>
  );
}

/* ─────────── SECTION: Partners Grid ─────────── */
function PartnersGrid() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-200">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white flex items-center justify-center py-14 px-6 group hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="object-contain opacity-40 group-hover:opacity-70 transition-opacity grayscale"
                />
              ) : (
                <span className="text-zinc-300 text-lg font-black uppercase tracking-widest group-hover:text-zinc-400 transition-colors text-center leading-tight">
                  {partner.initials}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── SECTION: Growth / Why Partner ─────────── */
function GrowthSection() {
  return (
    <section className="bg-[#111111] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Leading In Excellence
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight mb-6">
            WE INSPIRE GROWTH FOR PLAYERS AND CLUBS
          </h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Island FC drives football forward, uniting all who love the game
            through elite training, creative events, and digital tools for growth.
          </p>

          <ul className="space-y-4 mb-10">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primaryColor flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-2.5 h-2.5"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-zinc-300 text-[14px] leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/join-iasc"
            className="inline-flex items-center gap-2 bg-primaryColor text-white text-[11px] font-black uppercase tracking-widest px-7 py-3.5 hover:bg-white hover:text-primaryColor transition-all duration-300"
          >
            Partner With Us <ChevronRight size={14} />
          </Link>
        </div>

        {/* Right: Image with overlay badge */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/hero-bg-3.webp"
              alt="Island FC players celebrating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          {/* Floating badge */}
          <div className="absolute bottom-8 left-8 right-8 bg-primaryColor px-6 py-4">
            <p className="text-white text-sm font-black uppercase leading-snug">
              WE&apos;RE{" "}
              <span className="text-white/90 text-2xl font-black">50+</span>{" "}
              PEOPLE STRONG FROM ALL BACKGROUNDS JOINED BY OUR FOOTBALL DREAM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── SECTION: Testimonials ─────────── */
function TestimonialsSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-3">
            What People Say
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">
            PARTNER TESTIMONIALS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="border border-zinc-100 p-8 hover:border-primaryColor/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-zinc-500 text-[14px] leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-100 shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-[13px] font-black text-[#1a1a1a] uppercase">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── ROOT EXPORT ─────────── */
export default function PartnersPageContent() {
  return (
    <>
      <PartnersHero />
      <PartnersGrid />
      <GrowthSection />
      <TestimonialsSection />
    </>
  );
}
