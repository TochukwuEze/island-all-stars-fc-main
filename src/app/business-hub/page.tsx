import React from "react";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Search,
  MapPin,
  Store,
  Building2,
  Phone,
  ChevronRight,
  TrendingUp,
  Filter,
  User,
} from "lucide-react";

const BusinessHubPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main>
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Island Club{" "}
              <span className="text-blue-600">Business Directory</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and support businesses owned by our esteemed members.
              Connect, trade, and grow within our exclusive community.
            </p>

            {/* Search Bar Container */}
            <div className="mt-10 bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search businesses, services, or member names"
                  className="w-full bg-transparent border-none outline-none px-3 text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                Search
              </button>
            </div>

            {/* Popular Searches */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
              <span>Popular Categories:</span>
              {[
                "Real Estate",
                "Legal Services",
                "Retail & Fashion",
                "Consulting",
              ].map((term) => (
                <span
                  key={term}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors border border-gray-200"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar / Filters */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-8">
                {/* Business Type */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    Business Model
                  </h4>
                  <div className="space-y-3">
                    {[
                      "B2B Services",
                      "Retail (B2C)",
                      "Wholesale & Trading",
                      "Manufacturing",
                    ].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                        />
                        <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Industry */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    Industry Category
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Real Estate & Property",
                      "Legal & Consulting",
                      "Healthcare & Medical",
                      "Technology & IT",
                      "Food & Hospitality",
                      "Logistics & Transport",
                    ].map((industry) => (
                      <label
                        key={industry}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                        />
                        <span className="text-gray-600 group-hover:text-gray-900 text-sm font-medium">
                          {industry}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Listings */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Store className="w-5 h-5" />
                </div>
                Member Businesses
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200">
                <span>Sort by:</span>
                <select className="bg-transparent border-none outline-none font-medium text-gray-900 cursor-pointer">
                  <option>Most Relevant</option>
                  <option>Recently Added</option>
                </select>
              </div>
            </div>

            {/* Business Cards */}
            <div className="space-y-5">
              {businesses.map((business, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                    <div className="flex gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        <Building2 className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                            {business.name}
                          </h3>
                          {business.isVerified && (
                            <span className="px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide">
                              Verified Member
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 max-w-2xl">
                          {business.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-4">
                          <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-gray-400" />
                            Owned by: {business.owner}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />{" "}
                            {business.location}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {business.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-4 shrink-0">
                      <button className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:text-blue-600 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all w-full justify-center">
                        View Profile
                      </button>
                      <button className="bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all w-full justify-center">
                        <Phone className="w-4 h-4" /> Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pt-10 flex items-center justify-center">
              <button className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                Load More Businesses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="bg-white border-t border-gray-200 py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Featured Member Businesses
              </h2>
              <p className="text-gray-600 text-lg">
                Discover standout enterprises driving growth within our club
                community.
              </p>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
              View all featured <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Apex Holdings", category: "Finance" },
              { name: "TechNova", category: "IT Services" },
              { name: "Sterling Partners", category: "Legal" },
              { name: "Global Trade Co", category: "Import/Export" },
              { name: "HealthPlus", category: "Healthcare" },
              { name: "Island Properties", category: "Real Estate" },
            ].map((company, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all cursor-pointer group shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                  <Building2 className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="font-bold text-gray-900">{company.name}</span>
                <span className="text-sm font-medium text-blue-600 mt-2 bg-blue-50 px-3 py-1 rounded-full">
                  {company.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

const businesses = [
  {
    name: "Sterling Legal Partners",
    owner: "Chief Adekunle Williams",
    description:
      "Premium legal consulting, corporate advisory, and dispute resolution services for enterprise clients and individuals.",
    location: "Ikoyi, Lagos",
    tags: ["Legal", "Consulting", "B2B"],
    isVerified: true,
  },
  {
    name: "TechNova Solutions Ltd",
    owner: "Mr. Chukwudi Eze",
    description:
      "End-to-end software development, IT infrastructure setup, and digital transformation consulting.",
    location: "Victoria Island, Lagos",
    tags: ["Technology", "IT Services", "B2B"],
    isVerified: true,
  },
  {
    name: "Island Prime Properties",
    owner: "Mrs. Folashade Ojo",
    description:
      "Luxury real estate brokerage, property management, and investment advisory on the Island.",
    location: "Lekki Phase 1, Lagos",
    tags: ["Real Estate", "Sales", "Management"],
    isVerified: false,
  },
  {
    name: "HealthPlus Diagnostics",
    owner: "Dr. Ibrahim Musa",
    description:
      "State-of-the-art medical laboratory and diagnostic center providing fast and accurate test results.",
    location: "Surulere, Lagos",
    tags: ["Healthcare", "Medical", "B2C"],
    isVerified: true,
  },
  {
    name: "Global Trade & Logistics",
    owner: "Alhaji Sani Danjuma",
    description:
      "International freight forwarding, customs clearance, and supply chain management services.",
    location: "Apapa, Lagos",
    tags: ["Logistics", "Import/Export", "B2B"],
    isVerified: false,
  },
];

export default BusinessHubPage;
