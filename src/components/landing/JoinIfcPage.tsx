"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Phone, Calendar, Shield, Trophy, Users, CheckCircle2, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function JoinIfcPage() {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1) {
      setFormStep(2);
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <FadeIn className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[#001429] uppercase mb-4">Registration Successful!</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Welcome to the Island Football Club family. Your membership application has been received. Please check your email for the next steps.
          </p>
          <button 
            onClick={() => window.location.href = "/member-portal"}
            className="w-full py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
          >
            Go to Portal
          </button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Branding/Info */}
      <FadeIn direction="right" className="hidden lg:flex lg:w-1/2 bg-[#001429] relative overflow-hidden flex-col justify-center p-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-bg-2.webp"
            alt="Football Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#001429] via-[#001429]/90 to-primaryColor/40" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primaryColor font-black text-2xl">IFC</span>
              </div>
              <span className="text-xl font-black uppercase tracking-tighter">Island Football Club</span>
            </div>
          </Link>

          <h1 className="text-5xl font-black uppercase leading-tight mb-8">
            The Journey <br /> <span className="text-primaryColor">Starts Here.</span>
          </h1>
          
          <div className="space-y-8">
            {[
              { icon: <Shield className="w-6 h-6 text-primaryColor" />, title: "Elite Community", desc: "Access to Lagos' most exclusive football network." },
              { icon: <Trophy className="w-6 h-6 text-primaryColor" />, title: "World Class Training", desc: "Learn from professional UEFA-licensed coaches." },
              { icon: <Users className="w-6 h-6 text-primaryColor" />, title: "Member Events", desc: "Exclusive access to matches, galas, and tours." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-wide mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 md:p-20 bg-white overflow-y-auto">
        <FadeIn direction="left" className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#001429] uppercase mb-2">Create Account</h2>
            <p className="text-gray-400">Step {formStep} of 2: {formStep === 1 ? "Personal Details" : "Membership Preferences"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 1 ? (
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold text-[#001429]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold text-[#001429]"
                    />
                  </div>
                </div>

                {/* Phone & DOB Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="tel"
                        placeholder="+234..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold text-[#001429]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="date"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold text-[#001429]"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setFormStep(2)}
                  className="w-full py-4 bg-[#001429] text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-primaryColor transition-all shadow-lg"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Tier Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Membership Tier</label>
                  <select className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-sm font-semibold text-[#001429] appearance-none">
                    <option>Basic Member</option>
                    <option>Premium Member</option>
                    <option>Platinum Member</option>
                    <option>Youth Academy Player</option>
                  </select>
                </div>

                {/* Interest Category */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Primary Interest</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Playing", "Supporting", "Networking", "Academy"].map((cat) => (
                      <button 
                        key={cat}
                        type="button"
                        className="py-3 px-4 rounded-xl border border-gray-100 text-xs font-bold text-gray-500 hover:border-primaryColor hover:text-primaryColor transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="flex-1 py-4 bg-gray-100 text-[#001429] font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-xs text-gray-400 font-medium">
            Already have an account? <Link href="/login" className="text-primaryColor font-bold hover:underline">Sign In</Link>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
