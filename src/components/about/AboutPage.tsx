"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Play } from "lucide-react";

/* ─────────── DATA ─────────── */
const stats = [
  { value: "60%", label: "Win Rate" },
  { value: "35+", label: "Trophies" },
  { value: "8", label: "Champions" },
  { value: "400+", label: "Members" },
  { value: "25", label: "Coaches" },
  { value: "10", label: "Nations" },
];

const teamMembers = [
  {
    name: "Hugo Silva",
    role: "Head Coach",
    image: "/images/members/memberImage3.webp",
  },
  {
    name: "Robert Geff",
    role: "Technical Director",
    image: "/images/members/memberImage4.webp",
  },
];

const faqs = [
  {
    question: "How do I join Island Allstars Sports Club?",
    answer:
      "You can join Island Allstars Sports Club by completing our online membership form on the Join our club page. Our team will review your application and get in touch within 48 hours to guide you through the next steps, including a trial session at our Lekki facility.",
  },
  {
    question: "What age groups does the academy cater to?",
    answer:
      "Our academy programmes cater to players aged 6 and above, with dedicated streams for Under-8s, Under-10s, Under-12s, Under-16s, and our senior development squad. Each group trains with age-appropriate coaching methodology.",
  },
  {
    question:
      "Where are Island Allstars Sports Club training facilities located?",
    answer:
      "Our primary training ground is located at the Lagos Business School, Ajah, Lekki, Lagos. We also partner with additional venues across the Island for specialist sessions.",
  },
  {
    question: "Do you offer professional development pathways?",
    answer:
      "Yes. Island Allstars Sports Club actively scouts and develops talent for higher-level football. We have established relationships with clubs and academies regionally and internationally, providing our top performers with exposure and progression opportunities.",
  },
  {
    question: "How often do teams train per week?",
    answer:
      "Training schedules vary by group, but most squads train three to four times per week, with weekend match days. Our coaches will provide each player's personalised schedule upon enrolment.",
  },
];

/* ─────────── SECTION: Hero ─────────── */
function HeroSection() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] bg-[#0d0d0d] overflow-hidden flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/members/memberImage1.webp"
          alt="Island Allstars Sports Club hero"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="pl-4">
          {" "}
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            {" "}
            More Than a Club{" "}
          </p>{" "}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight mb-6">
            {" "}
            A Tradition of{" "}
            <span className="text-primaryColor"> Passion & Unity</span>{" "}
          </h1>{" "}
          <p className="text-zinc-300 text-[15px] leading-relaxed max-w-xl mb-8">
            {" "}
            ISLAND ALLSTARS SPORTS CLUB has grown from an initial group of five
            (5) men, playing football in a relatively obscure land setting
            somewhere in Abraham Adesanya Estate Ajah, to a large group of more
            than 400 active members. Our members are drawn from across various
            professions, tribes, and religions, playing football and other
            sports in a much more organized and urbane fashion within the
            premises of the prestigious Lagos Business School in Ajah, Lekki,
            Lagos.{" "}
          </p>{" "}
          <div className="flex items-center gap-4 flex-wrap">
            {" "}
            <Link
              href="/join-ifc"
              className="inline-flex items-center gap-2 bg-primaryColor text-white text-[11px] font-black uppercase tracking-widest px-7 py-3.5 hover:bg-white hover:text-primaryColor transition-all duration-300"
            >
              {" "}
              Join Island FC <ChevronRight size={14} />{" "}
            </Link>{" "}
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-[11px] font-black uppercase tracking-widest px-7 py-3.5 hover:border-primaryColor hover:text-primaryColor transition-all duration-300"
            >
              {" "}
              <Play size={13} className="fill-current" /> Watch Highlights{" "}
            </Link>{" "}
          </div>
        </div>

        {/* Right: Accent card */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-72 h-80 border-2 border-primaryColor/30">
            <Image
              src="/images/hero-bg-3.webp"
              alt="IFC in action"
              fill
              className="object-cover opacity-70"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-primaryColor mb-1">
                Founded
              </p>
              <p className="text-white text-4xl font-black">2008</p>
            </div>
            {/* corner accent */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-primaryColor" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── SECTION: Partners / Sponsors ─────────── */
function PartnersBar() {
  const partners = [
    "IASC",
    "ISLAND FC",
    "LAGOS FA",
    "NFF",
    "CAF PARTNERS",
    "NIKE",
  ];
  return (
    <div className="bg-[#f5f5f5] border-y border-zinc-200 py-5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
        {partners.map((p) => (
          <span
            key={p}
            className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 whitespace-nowrap hover:text-primaryColor transition-colors cursor-default shrink-0"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── SECTION: Mission + Team ─────────── */
function MissionSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-[#1a1a1a] mb-6">
            OUR MISSION
          </h2>
          <p className="text-zinc-500 text-[15px] leading-relaxed mb-6">
            To improve the quality of life for its members through fun,
            friendship, fitness, wealth creation and connection to our
            community.
          </p>
          <p className="text-zinc-500 text-[15px] leading-relaxed mb-8">
            Our Club has gradually progressed from an individualistic entity to
            a close-knit-family-oriented one, recognizing our African culture
            that an individual cannot be balanced and complete without his
            family.
          </p>
          <Link
            href="/join-ifc"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[11px] font-black uppercase tracking-widest px-7 py-3.5 hover:bg-primaryColor transition-all duration-300"
          >
            Get Started <ChevronRight size={14} />
          </Link>
        </div>

        {/* Right: Team photos */}
        <div className="grid grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-black text-sm uppercase">
                    {member.name}
                  </p>
                  <p className="text-primaryColor text-[10px] font-bold uppercase tracking-wider mt-0.5">
                    {member.role}
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

/* ─────────── SECTION: Scrolling Ticker ─────────── */
function MarqueeTicker() {
  const text =
    "DREAMS FOR EACH TEAM AND PLAYER — CLUBS, TALENT, AND TRUE FOOTBALL —";
  return (
    <div className="bg-primaryColor overflow-hidden py-4 relative">
      <div className="flex whitespace-nowrap animate-[marquee_18s_linear_infinite]">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-white text-2xl md:text-3xl font-black uppercase tracking-wide mr-16 shrink-0"
          >
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────── SECTION: Stats ─────────── */
function StatsSection() {
  return (
    <section className="bg-[#111111] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-3">
            Island Allstars Milestones
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">
            OUR NUMBERS SPEAK FOR THEMSELVES
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1a1a1a] px-6 py-10 text-center group hover:bg-primaryColor transition-colors duration-300"
            >
              <p className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-white">
                {stat.value}
              </p>
              <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest group-hover:text-white/70 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── SECTION: Quote / Mission Statement ─────────── */
function QuoteSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Large quote mark */}
        <div className="text-primaryColor text-[120px] leading-none font-serif select-none mb-[-40px] opacity-30">
          &ldquo;
        </div>
        <blockquote className="text-white text-xl md:text-2xl lg:text-3xl font-black uppercase leading-snug tracking-tight mb-8">
          VISION 2027: TO BE AMONG THE TOP 10 SPORTS CLUB IN LAGOS.
        </blockquote>
        <p className="text-primaryColor text-[11px] font-black uppercase tracking-[0.3em] mb-10">
          — Island Allstars Sports Club, Lagos
        </p>
        <Link
          href="/join-ifc"
          className="inline-flex items-center gap-2 bg-primaryColor text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-primaryColor transition-all duration-300"
        >
          Become a Member <ChevronRight size={14} />
        </Link>
      </div>
    </section>
  );
}

/* ─────────── SECTION: Anthem ─────────── */
function AnthemSection() {
  return (
    <section className="bg-[#f4f4f4] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Anthem Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Island All Stars Sports Club
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-[#1a1a1a] mb-8">
            CLUB ANTHEM: I LOVE THIS FAMILY
          </h2>

          <div className="space-y-6 text-zinc-600 text-[15px] leading-relaxed italic font-serif">
            <p>
              So closely knitted into one
              <br />
              Island Allstars, one great family,
              <br />
              together we do great things
            </p>

            <p>
              Together we do great things
              <br />
              Together we do mighty things
              <br />
              Island Allstars, one great family
              <br />
              Together we shall stand
            </p>

            <p>
              Since two thousand and eight (2008)
              <br />
              This club has come to stay
              <br />
              with love, we share, such sweet memories
              <br />
              And the true love must prevail…
            </p>

            <p>
              Together we do great things
              <br />
              Together we do mighty things
              <br />
              Island Allstars one great family
              <br />
              Together we shall stand
            </p>

            <p>
              Together we shall stand
              <br />
              Together we shall stand
              <br />
              Island Allstars, one great family
              <br />
              Together we shall stand
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-zinc-200">
            <Image
              src="/images/members/memberImage2.webp"
              alt="Club Anthem"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── SECTION: FAQ ─────────── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Heading */}
        <div className="lg:sticky lg:top-24">
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Got Questions?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-[#1a1a1a] mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-zinc-500 text-[15px] leading-relaxed mb-8 max-w-sm">
            Everything you need to know about joining Island Allstars Sports
            Club, our programmes, and how we develop players at every level.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] text-[#1a1a1a] text-[11px] font-black uppercase tracking-widest px-6 py-3 hover:bg-primaryColor hover:border-primaryColor hover:text-white transition-all duration-300"
          >
            Ask a Question <ChevronRight size={14} />
          </Link>
        </div>

        {/* Right: Accordion */}
        <div className="flex flex-col divide-y divide-zinc-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                id={`faq-btn-${idx}`}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-start justify-between gap-4 text-left group"
              >
                <span
                  className={`text-[15px] font-bold transition-colors ${
                    openIndex === idx
                      ? "text-primaryColor"
                      : "text-[#1a1a1a] group-hover:text-primaryColor"
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-zinc-400 transition-transform duration-300 mt-0.5 ${
                    openIndex === idx ? "rotate-180 text-primaryColor" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-btn-${idx}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx
                    ? "max-h-64 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-zinc-500 text-[15px] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── ROOT EXPORT ─────────── */
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <PartnersBar />
      <MissionSection />
      <MarqueeTicker />
      <StatsSection />
      <QuoteSection />
      <AnthemSection />
      <FAQSection />
    </>
  );
}
