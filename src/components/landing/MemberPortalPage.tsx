"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/landing/Breadcrumb";
import Link from "next/link";
import { constitutionSections } from "@/data/constitution";

// ── Types ──────────────────────────────────────────────────────────────────

type Tab = "dashboard" | "profile" | "matches" | "membership" | "messages" | "constitution";

// ── Mock Data ──────────────────────────────────────────────────────────────

const member = {
  name: "Emeka Okafor",
  role: "Senior Player",
  number: "#14",
  position: "Midfielder",
  joined: "January 2023",
  membershipType: "Premium",
  membershipExpiry: "December 2025",
  avatar: null,
  stats: {
    matches: 32,
    goals: 7,
    assists: 11,
    rating: 7.8,
  },
};

const upcomingMatches = [
  {
    date: "May 18, 2026",
    opponent: "Lagos United FC",
    venue: "Home",
    time: "4:00 PM",
  },
  {
    date: "May 25, 2026",
    opponent: "Victoria Island Stars",
    venue: "Away",
    time: "3:30 PM",
  },
  {
    date: "Jun 1, 2026",
    opponent: "Lekki Rovers",
    venue: "Home",
    time: "5:00 PM",
  },
];

const recentActivity = [
  { type: "match", label: "Match vs Apapa FC — Won 3-1", time: "2 days ago" },
  {
    type: "training",
    label: "Training Session — Tactical Drills",
    time: "4 days ago",
  },
  {
    type: "payment",
    label: "Membership Renewed — ₦50,000",
    time: "1 week ago",
  },
  {
    type: "match",
    label: "Match vs Bar Beach Boys — Draw 1-1",
    time: "2 weeks ago",
  },
];

const messages = [
  {
    from: "Coach Tunde",
    subject: "Training update for next week",
    time: "2h ago",
    read: false,
  },
  {
    from: "Club Admin",
    subject: "Membership renewal confirmation",
    time: "1d ago",
    read: true,
  },
  {
    from: "Coach Tunde",
    subject: "Team selection for Saturday",
    time: "3d ago",
    read: true,
  },
  {
    from: "IFC Events",
    subject: "Annual Club Gala — RSVP Required",
    time: "5d ago",
    read: false,
  },
];

// ── Sidebar Nav Item ───────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200 relative ${
        active
          ? "bg-primaryColor text-white shadow-[0_4px_14px_rgba(32,82,218,0.35)]"
          : "text-gray-500 hover:bg-gray-50 hover:text-[#001429]"
      }`}
    >
      <span
        className={`flex-shrink-0 ${active ? "text-white" : "text-gray-400"}`}
      >
        {icon}
      </span>
      <span>{label}</span>
      {badge && badge > 0 ? (
        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
        {label}
      </p>
      <p className="text-4xl font-black text-[#001429]">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── Dashboard Tab ──────────────────────────────────────────────────────────

function DashboardTab() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="relative rounded-md overflow-hidden bg-gradient-to-r from-[#001429] to-[#2052DA] p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/5 translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
            Welcome back
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase">
            {member.name}
          </h2>
          <p className="text-white/70 text-sm mt-1">
            {member.position} · {member.role} · Jersey {member.number}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
              {member.membershipType} Member
            </span>
            <span className="px-3 py-1 bg-green-400/20 text-green-300 rounded-full text-xs font-bold">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mb-4">
          Season Stats
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Matches"
            value={member.stats.matches}
            sub="This season"
          />
          <StatCard
            label="Goals"
            value={member.stats.goals}
            sub="All competitions"
          />
          <StatCard
            label="Assists"
            value={member.stats.assists}
            sub="All competitions"
          />
          <StatCard
            label="Avg Rating"
            value={member.stats.rating}
            sub="Out of 10"
          />
        </div>
      </div>

      {/* Upcoming Matches */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mb-4">
          Upcoming Matches
        </p>
        <div className="flex flex-col gap-3">
          {upcomingMatches.map((m, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-md p-4 flex items-center justify-between gap-4 shadow-sm hover:border-primaryColor/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primaryColor/10 flex items-center justify-center">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2052DA"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#001429] text-sm">
                    vs {m.opponent}
                  </p>
                  <p className="text-xs text-gray-400">
                    {m.date} · {m.time}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${m.venue === "Home" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"}`}
              >
                {m.venue}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mb-4">
          Recent Activity
        </p>
        <div className="bg-white border border-gray-100 rounded-md divide-y divide-gray-50 shadow-sm">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${a.type === "match" ? "bg-primaryColor" : a.type === "training" ? "bg-green-400" : "bg-amber-400"}`}
              />
              <p className="text-sm text-gray-700 flex-1">{a.label}</p>
              <p className="text-xs text-gray-400 flex-shrink-0">{a.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Profile Tab ────────────────────────────────────────────────────────────

function ProfileTab() {
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-100 rounded-md p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primaryColor to-[#001429] flex items-center justify-center text-white text-3xl font-black">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="text-xl font-black text-[#001429] uppercase">
              {member.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {member.position} · {member.role}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Member since {member.joined}
            </p>
          </div>
          <button
            onClick={() => setEditing((e) => !e)}
            className="ml-auto px-5 py-2.5 border border-primaryColor text-primaryColor text-xs font-bold uppercase tracking-widest rounded-md hover:bg-primaryColor hover:text-white transition-all"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Full Name", value: member.name },
            { label: "Position", value: member.position },
            { label: "Jersey Number", value: member.number },
            { label: "Role", value: member.role },
            { label: "Email", value: "emeka.okafor@email.com" },
            { label: "Phone", value: "+234 812 345 6789" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {label}
              </label>
              {editing ? (
                <input
                  defaultValue={value}
                  className="border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all"
                />
              ) : (
                <p className="text-sm font-semibold text-[#001429] bg-gray-50 px-4 py-2.5 rounded-md">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <button
            onClick={() => setEditing(false)}
            className="mt-6 px-8 py-3 bg-primaryColor text-white font-bold uppercase tracking-widest text-xs rounded-md hover:bg-[#0f55a0] transition-colors"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

// ── Matches Tab ────────────────────────────────────────────────────────────

function MatchesTab() {
  const history = [
    {
      date: "May 3, 2026",
      opponent: "Apapa FC",
      result: "W 3-1",
      contribution: "1 Goal, 1 Assist",
    },
    {
      date: "Apr 26, 2026",
      opponent: "Bar Beach Boys",
      result: "D 1-1",
      contribution: "1 Assist",
    },
    {
      date: "Apr 19, 2026",
      opponent: "Marina Strikers",
      result: "W 2-0",
      contribution: "MOTM",
    },
    {
      date: "Apr 12, 2026",
      opponent: "Ikoyi United",
      result: "L 0-1",
      contribution: "—",
    },
    {
      date: "Apr 5, 2026",
      opponent: "Dolphin Estate FC",
      result: "W 4-2",
      contribution: "2 Goals",
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-bold uppercase tracking-widest text-primaryColor">
        Match History
      </p>
      <div className="bg-white border border-gray-100 rounded-md overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Date
              </th>
              <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Opponent
              </th>
              <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                Result
              </th>
              <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:table-cell">
                Contribution
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {history.map((m, i) => (
              <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 text-gray-500">{m.date}</td>
                <td className="px-5 py-4 font-semibold text-[#001429]">
                  {m.opponent}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      m.result.startsWith("W")
                        ? "bg-green-50 text-green-600"
                        : m.result.startsWith("D")
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-500"
                    }`}
                  >
                    {m.result}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                  {m.contribution}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mt-2">
        Upcoming Fixtures
      </p>
      <div className="flex flex-col gap-3">
        {upcomingMatches.map((m, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-md p-4 flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="font-bold text-[#001429] text-sm">
                IFC vs {m.opponent}
              </p>
              <p className="text-xs text-gray-400">
                {m.date} at {m.time}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${m.venue === "Home" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"}`}
            >
              {m.venue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Membership Tab ─────────────────────────────────────────────────────────

function MembershipTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative bg-gradient-to-r from-[#001429] to-[#2052DA] rounded-md p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
          Your Membership
        </p>
        <h3 className="text-3xl font-black uppercase">
          {member.membershipType}
        </h3>
        <p className="text-white/70 text-sm mt-1">
          Expires: {member.membershipExpiry}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-md p-4">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
              Member Since
            </p>
            <p className="font-bold">{member.joined}</p>
          </div>
          <div className="bg-white/10 rounded-md p-4">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
              Status
            </p>
            <p className="font-bold text-green-300">Active ✓</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-md p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mb-5">
          Premium Benefits
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Priority match ticket access",
            "Exclusive training sessions with coaches",
            "Access to IFC member lounge",
            "Monthly performance reports",
            "Club merchandise discount (20%)",
            "Invitation to exclusive club events & galas",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primaryColor/10 flex items-center justify-center flex-shrink-0">
                <svg
                  width={10}
                  height={10}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2052DA"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-md p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mb-5">
          Payment History
        </p>
        <div className="flex flex-col divide-y divide-gray-50">
          {[
            {
              desc: "Premium Renewal – 2025/2026",
              amount: "₦50,000",
              date: "Jan 10, 2026",
              status: "Paid",
            },
            {
              desc: "Premium Renewal – 2024/2025",
              amount: "₦45,000",
              date: "Jan 8, 2025",
              status: "Paid",
            },
            {
              desc: "Registration Fee",
              amount: "₦10,000",
              date: "Jan 5, 2023",
              status: "Paid",
            },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-[#001429]">{p.desc}</p>
                <p className="text-xs text-gray-400">{p.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#001429]">{p.amount}</p>
                <span className="text-xs text-green-600 font-semibold">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Messages Tab ───────────────────────────────────────────────────────────

function MessagesTab() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold uppercase tracking-widest text-primaryColor">
        Inbox
      </p>
      <div className="bg-white border border-gray-100 rounded-md overflow-hidden shadow-sm divide-y divide-gray-50">
        {messages.map((msg, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`w-full flex items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50/80 ${selected === i ? "bg-blue-50/50" : ""}`}
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read ? "bg-gray-200" : "bg-primaryColor"}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p
                  className={`text-sm ${msg.read ? "font-medium text-gray-600" : "font-bold text-[#001429]"}`}
                >
                  {msg.from}
                </p>
                <p className="text-xs text-gray-400 flex-shrink-0">
                  {msg.time}
                </p>
              </div>
              <p
                className={`text-sm truncate ${msg.read ? "text-gray-400" : "text-gray-700 font-medium"}`}
              >
                {msg.subject}
              </p>
              {selected === i && (
                <p className="mt-3 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                  Hello {member.name.split(" ")[0]}, this is a message from{" "}
                  {msg.from} regarding: {msg.subject}. Please check your IFC app
                  or contact the club office for full details.
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Constitution Tab ────────────────────────────────────────────────────────
function ConstitutionTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-100 rounded-md p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
          <div className="w-12 h-12 bg-primaryColor/10 rounded-xl flex items-center justify-center text-primaryColor">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#001429] uppercase">Club Constitution</h2>
            <p className="text-sm text-gray-400">Official governing documents of Island Football Club</p>
          </div>
        </div>

        <div className="space-y-8">
          {constitutionSections.map((section, idx) => (
            <div key={idx} className="group">
              <h3 className="text-lg font-bold text-[#001429] mb-3 flex items-center gap-3">
                <span className="w-1 h-6 bg-primaryColor rounded-full" />
                {section.title}
              </h3>
              <p className="text-gray-500 leading-relaxed pl-4">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-xs text-gray-400 leading-relaxed italic text-center">
            Last updated: January 15, 2026. For the full legal document, please contact the Club Secretariat.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function MemberPortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadMessages = messages.filter((m) => !m.read).length;

  const navItems: {
    id: Tab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "My Profile",
      icon: (
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      id: "matches",
      label: "Matches",
      icon: (
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
    },
    {
      id: "membership",
      label: "Membership",
      icon: (
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      badge: unreadMessages,
    },
    {
      id: "constitution",
      label: "Constitution",
      icon: (
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  const tabContent: Record<Tab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    profile: <ProfileTab />,
    matches: <MatchesTab />,
    membership: <MembershipTab />,
    messages: <MessagesTab />,
    constitution: <ConstitutionTab />,
  };

  return (
    <div>
      <Breadcrumb title="Member Portal" />

      <div className="bg-[#f7f9fc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 gap-2 sticky top-8">
            {/* Member card */}
            <div className="bg-white border border-gray-100 rounded-md p-5 shadow-sm mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primaryColor to-[#001429] flex items-center justify-center text-white font-black text-lg">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#001429] text-sm truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-bold text-primaryColor uppercase tracking-wide">
                  {member.membershipType}
                </span>
                <span
                  className="w-2 h-2 rounded-full bg-green-400 inline-block"
                  title="Active"
                />
              </div>
            </div>

            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                badge={item.badge}
              />
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/contact"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-red-500 transition-all"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </Link>
            </div>
          </aside>

          {/* ── Mobile Dropdown ───────────────────────────────────── */}
          <div className="lg:hidden w-full flex justify-end relative z-40 mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-md px-5 py-3.5 shadow-sm hover:border-primaryColor/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-primaryColor">
                  {navItems.find((i) => i.id === activeTab)?.icon}
                </span>
                <span className="font-bold text-[#001429] uppercase tracking-wide text-sm">
                  {navItems.find((i) => i.id === activeTab)?.label}
                </span>
              </div>
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`text-gray-400 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {sidebarOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-100 rounded-md shadow-xl overflow-hidden">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors border-b border-gray-50 last:border-0 ${
                      activeTab === item.id
                        ? "bg-primaryColor/5 text-primaryColor"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={
                        activeTab === item.id
                          ? "text-primaryColor"
                          : "text-gray-400"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      {item.label}
                    </span>
                    {item.badge ? (
                      <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
                <div className="bg-gray-50 p-2">
                  <Link
                    href="/contact"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold text-gray-500 hover:bg-white hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-gray-200"
                  >
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    SIGN OUT
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Main Content ─────────────────────────────────────── */}
          <main className="w-full lg:flex-1 min-w-0">
            {tabContent[activeTab]}
          </main>
        </div>
      </div>
    </div>
  );
}
