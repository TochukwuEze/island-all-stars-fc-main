"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Trophy,
  Users,
  AlertTriangle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { Inter, Sofia_Sans_Condensed } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

export default function JoinIascPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Side: Branding/Info */}
      <FadeIn
        direction="right"
        className="hidden lg:flex lg:w-1/2 bg-[#001429] relative overflow-hidden flex-col justify-center p-20 text-white"
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-bg-2.webp"
            alt="Sports Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#001429] via-[#001429]/90 to-primaryColor/40" />

        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12">
            <div className="flex items-center gap-3">
              <div className="w-20 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primaryColor font-black text-2xl">
                  IASC
                </span>
              </div>
              <span
                className={`text-xl font-bold uppercase tracking-tighter ${inter.className}`}
              >
                Island Allstars Sports Club
              </span>
            </div>
          </Link>

          <h1 className="text-5xl font-black uppercase leading-tight mb-8">
            The Journey <br />{" "}
            <span className="text-primaryColor">Starts Here.</span>
          </h1>

          <div className="space-y-8">
            {[
              {
                icon: <Shield className="w-6 h-6 text-primaryColor" />,
                title: "Elite Community",
                desc: "Access to Lagos' most exclusive sports network.",
              },
              {
                icon: <Trophy className="w-6 h-6 text-primaryColor" />,
                title: "World Class Training",
                desc: "Learn from professional UEFA-licensed coaches.",
              },
              {
                icon: <Users className="w-6 h-6 text-primaryColor" />,
                title: "Member Events",
                desc: "Exclusive access to matches, galas, and tours.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Right Side: Informational Message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 md:p-20 bg-white">
        <FadeIn direction="left" className="max-w-md w-full mx-auto">
          {/* Restriction Alert Icon */}
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#001429] uppercase mb-3">
              Registration Restricted
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Self-registration is currently disabled for Island Allstars Sports
              Club. To maintain the exclusivity of our network, accounts are
              strictly managed and created by the Club Secretariat.
            </p>
          </div>

          {/* Action Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8 space-y-4">
            <h3 className="font-bold uppercase text-xs tracking-wider text-[#001429]">
              How to Join IASC
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              If you have applied for membership and your application has been
              approved, your account details will be sent to your email. If you
              need a new account, please contact the Club Administrator.
            </p>

            {/* Club contact information */}
            <div className="pt-2 space-y-2.5 text-xs text-gray-600 font-semibold border-t border-gray-200/50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primaryColor" />
                <span>info@iasc.com.ng</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primaryColor" />
                <span>+234 803 325 3625</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primaryColor" />
                <span>Lekki, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <Link href="/member-portal" className="block w-full">
              <button className="w-full py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 group cursor-pointer">
                <span>Go to Portal Login</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <p className="text-center text-xs text-gray-400 font-semibold">
              Already have credentials?{" "}
              <Link
                href="/member-portal"
                className="text-primaryColor font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
