"use client";
import React, { useEffect, useState, use } from "react";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin, User, Phone, CheckCircle } from "lucide-react";
import { getBusinesses, Business } from "@/lib/businessStore";

export default function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiz = async () => {
      const allBusinesses = await getBusinesses();
      const found = allBusinesses.find(
        (b: Business) => encodeURIComponent(b.name.toLowerCase().replace(/\s+/g, "-")) === slug && b.status !== "suspended"
      );
      setBusiness(found || null);
      setLoading(false);
    };
    fetchBiz();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50/50 items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TopBar />
        <MainHeader />
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <Link href="/business-hub" className="text-blue-600 hover:underline">
            ← Back to Business Hub
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1 pb-20">
        <div className="bg-white border-b border-gray-200 pt-8 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href="/business-hub" className="inline-flex items-center text-gray-500 hover:text-blue-600 font-medium mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
            </Link>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Building2 className="w-16 h-16 text-gray-300" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight">{business.name}</h1>
                  {business.isVerified && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-sm font-bold uppercase tracking-wide rounded-lg">
                      <CheckCircle className="w-4 h-4" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xl text-gray-600 mb-6 max-w-2xl">{business.description}</p>
                <div className="flex flex-wrap gap-2">
                  {business.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Business</h2>
              <p className="text-gray-600 leading-relaxed">
                {business.description} This business is a proud member of the Island Allstars Sports Club community, committed to excellence and service. Contact them directly to learn more about their offerings and potential member discounts.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Owner</p>
                    <p className="font-medium text-gray-900">{business.owner}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</p>
                    <p className="font-medium text-gray-900">{business.location}</p>
                  </div>
                </div>
                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                      <p className="font-medium text-gray-900">{business.phone}</p>
                    </div>
                  </div>
                )}
              </div>
              {business.phone ? (
                <a href={`tel:${business.phone}`} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Business
                </a>
              ) : (
                <button disabled className="w-full py-3 bg-gray-100 text-gray-400 font-semibold rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                  No Contact Info
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
