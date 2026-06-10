"use client";

import React, { useState } from "react";
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { findMemberByEmail, setCurrentUser } from "@/lib/membersStore";
import FadeIn from "@/components/ui/FadeIn";
import { Inter, Sofia_Sans_Condensed } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

interface LoginPageProps {
  onLoginSuccess?: (user: any) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      const adminEmail = "detobisz@yahoo.com";
      const adminPassword = "123456";

      // 1. Check Admin Credentials
      if (normalizedEmail === adminEmail && password === adminPassword) {
        const adminUser = {
          name: "Admin",
          email: adminEmail,
          role: "admin",
          position: "Club Administrator",
          membershipType: "Club Admin",
          number: "IFC-01",
          joined: "June 2026",
        };
        setCurrentUser(adminUser);
        setIsSubmitting(false);
        if (onLoginSuccess) {
          onLoginSuccess(adminUser);
        }
        return;
      }

      // 2. Check Local Members DB
      const member = findMemberByEmail(normalizedEmail);
      if (member && member.password === password) {
        if (member.status === "suspended") {
          setError(
            "Your account has been suspended. Please contact the Club Administrator.",
          );
          setShouldShake(true);
          setIsSubmitting(false);
          setTimeout(() => {
            setShouldShake(false);
          }, 500);
          return;
        }
        // Exclude password from current user session data
        const { password: _, ...userSession } = member;
        setCurrentUser({ ...userSession, role: "member" });
        setIsSubmitting(false);
        if (onLoginSuccess) {
          onLoginSuccess({ ...userSession, role: "member" });
        }
        return;
      }

      // 3. Login Failed
      setError("Invalid email or password. Please try again.");
      setShouldShake(true);
      setIsSubmitting(false);

      // Reset shake animation
      setTimeout(() => {
        setShouldShake(false);
      }, 500);
    }, 1000);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#000a14] overflow-hidden">
      {/* CSS Animations style tag */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .bg-glow-orb {
          filter: blur(120px);
        }
      `,
        }}
      />

      {/* Decorative Premium Glow Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primaryColor/20 rounded-full bg-glow-orb -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full bg-glow-orb translate-x-1/2 translate-y-1/2" />

      <FadeIn className="max-w-md w-full relative z-10">
        <div
          className={`backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 mb-20 shadow-2xl transition-transform ${
            shouldShake
              ? "animate-shake border-red-500/50 shadow-red-500/5"
              : ""
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-16 bg-primaryColor/10 border border-primaryColor/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primaryColor font-black text-2xl tracking-tighter">
                IASC
              </span>
            </div>
            <h2
              className={`text-2xl font-black tracking-tight text-white uppercase ${sofiaSansCondensed.className}`}
            >
              Member Portal
            </h2>
            <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-semibold">
              Sign In to your Account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`space-y-6 `}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-xl flex items-start gap-3">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primaryColor transition-colors" />
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.02] border border-white/[0.08] rounded-xl focus:outline-none focus:border-primaryColor/60 focus:bg-white/[0.05] transition-all text-sm font-semibold text-white placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "Please contact the Club Secretariat to reset your password.",
                      );
                    }}
                    className="text-[10px] font-bold text-primaryColor hover:underline uppercase tracking-wider"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primaryColor transition-colors" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/[0.02] border border-white/[0.08] rounded-xl focus:outline-none focus:border-primaryColor/60 focus:bg-white/[0.05] transition-all text-sm font-semibold text-white placeholder-zinc-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primaryColor hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-blue-500/15 disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
            New to IASC?{" "}
            <a
              href="#join"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Only the Club Administrator can register new accounts. Please contact administration.",
                );
              }}
              className="text-primaryColor font-bold hover:underline"
            >
              Request Access
            </a>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
