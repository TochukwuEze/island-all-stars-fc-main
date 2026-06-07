"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  LayoutDashboard, 
  MessageSquare, 
  LogOut, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Send,
  User,
  Mail,
  Phone,
  Hash,
  Lock,
  Download
} from "lucide-react";
import * as XLSX from "xlsx";
import { getMembers, addMember, clearCurrentUser, Member, saveMembers } from "@/lib/membersStore";
import Breadcrumb from "@/components/landing/Breadcrumb";
import FadeIn from "@/components/ui/FadeIn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AdminTab = "dashboard" | "directory" | "register" | "broadcast";

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [position, setPosition] = useState("Midfielder");
  const [role, setRole] = useState("Member");

  
  // Message Broadcast State
  const [msgRecipient, setMsgRecipient] = useState("all");
  const [msgSubject, setMsgSubject] = useState("");
  const [msgContent, setMsgContent] = useState("");

  // Notification states
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  const refreshMembers = () => {
    setMembers(getMembers());
  };

  const showToast = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const formattedJersey = jerseyNumber.startsWith("#") ? jerseyNumber : `#${jerseyNumber}`;
    
    // Structure new member details
    const newMember: Member = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password || "password123", // default password if none provided
      role,
      number: formattedJersey,
      position,
      joined: new Date().toLocaleString("default", { month: "long", year: "numeric" }),
      membershipType: "Member",
      membershipExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toLocaleString("default", { month: "long", year: "numeric" }),
      avatar: null,
      stats: {
        matches: 0,
        goals: 0,
        assists: 0,
        rating: 6.0,
      },
      activity: [
        { type: "system", label: "Account created by Admin", time: "Just now" }
      ],
      messages: [
        {
          from: "Club Admin",
          subject: "Welcome to Island All Stars FC!",
          time: "Just now",
          read: false
        }
      ],
      status: "active"
    };

    const added = addMember(newMember);

    if (added) {
      showToast("success", `Successfully registered ${name.trim()}! Log-in password is "${newMember.password}"`);
      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDob("");
      setJerseyNumber("");
      refreshMembers();
      setActiveTab("directory");
    } else {
      showToast("error", "Failed to register user. An account with this email already exists.");
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!msgSubject.trim() || !msgContent.trim()) {
      showToast("error", "Subject and message content are required.");
      return;
    }

    const currentMembers = getMembers();
    const newMessage = {
      from: "Club Admin",
      subject: msgSubject.trim(),
      time: "Just now",
      read: false,
    };

    let updatedCount = 0;

    if (msgRecipient === "all") {
      currentMembers.forEach((member) => {
        member.messages = [newMessage, ...member.messages];
        member.activity = [
          { type: "system", label: `Received admin message: ${msgSubject.trim()}`, time: "Just now" },
          ...member.activity
        ];
      });
      updatedCount = currentMembers.length;
    } else {
      const target = currentMembers.find(m => m.email === msgRecipient);
      if (target) {
        target.messages = [newMessage, ...target.messages];
        target.activity = [
          { type: "system", label: `Received admin message: ${msgSubject.trim()}`, time: "Just now" },
          ...target.activity
        ];
        updatedCount = 1;
      }
    }

    saveMembers(currentMembers);
    refreshMembers();
    showToast("success", `Successfully sent broadcast to ${updatedCount} recipient(s).`);
    setMsgSubject("");
    setMsgContent("");
  };

  const handleDeleteMember = (emailToDelete: string) => {
    const currentMembers = getMembers();
    const filtered = currentMembers.filter(m => m.email.toLowerCase() !== emailToDelete.toLowerCase());
    saveMembers(filtered);
    refreshMembers();
    showToast("success", "Member successfully deleted.");
  };

  const handleToggleSuspend = (email: string, currentStatus?: "active" | "suspended") => {
    const newStatus = currentStatus === "suspended" ? "active" : "suspended";
    const statusText = newStatus === "suspended" ? "suspended" : "reactivated";
    
    const currentMembers = getMembers();
    const target = currentMembers.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (target) {
      target.status = newStatus;
      target.activity = [
        { type: "system", label: `Account ${statusText} by Admin`, time: "Just now" },
        ...target.activity
      ];
      saveMembers(currentMembers);
      refreshMembers();
      showToast("success", `Successfully ${statusText} account for ${target.name}`);
    }
  };

  // Dashboard calculations
  const totalMembers = members.length;
  const activeMembersCount = members.filter(m => m.status !== "suspended").length;
  const suspendedMembersCount = members.filter(m => m.status === "suspended").length;
  
  // Calculate mock income based on fee of N50,000 per member
  const totalFeesCollected = members.length * 50000;

  // Search and filter directory
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      statusFilter === "all" || 
      (statusFilter === "suspended" && m.status === "suspended") ||
      (statusFilter === "active" && m.status !== "suspended");

    return matchesSearch && matchesFilter;
  });

  const handleExportToExcel = () => {
    const exportData = filteredMembers.map(m => ({
      "Name": m.name,
      "Email": m.email,
      "Role": m.role,
      "Position": m.position,
      "Jersey Number": m.number,
      "Membership Tier": m.membershipType,
      "Joined Date": m.joined,
      "Status": m.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members Directory");
    XLSX.writeFile(workbook, "IslandFC_Members_Directory.xlsx");
    
    showToast("success", "Members directory exported successfully.");
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "directory", label: "Members Directory", icon: <Users size={18} />, badge: totalMembers },
    { id: "register", label: "Register New Member", icon: <UserPlus size={18} /> },
    { id: "broadcast", label: "Broadcast message", icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <Breadcrumb title="Admin Portal" />

      {/* Toast System */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
        {successMsg && (
          <div className="p-4 bg-green-600 text-white shadow-xl rounded-xl flex items-start gap-3 border border-green-500 animate-slide-in">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-xs font-semibold">{successMsg}</div>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-red-600 text-white shadow-xl rounded-xl flex items-start gap-3 border border-red-500 animate-slide-in">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-xs font-semibold">{errorMsg}</div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">
        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 gap-2 sticky top-8">
          {/* Admin Tag Card */}
          <div className="bg-gradient-to-br from-[#001429] to-primaryColor border border-gray-100 rounded-2xl p-5 shadow-lg text-white mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="min-w-0">
                <p className="font-black text-sm uppercase tracking-wide">
                  Club Admin
                </p>
                <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest mt-0.5">
                  detobisz@yahoo.com
                </p>
              </div>
            </div>
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                activeTab === item.id
                  ? "bg-primaryColor text-white shadow-[0_4px_14px_rgba(32,82,218,0.25)]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-[#001429]"
              }`}
            >
              <span className={activeTab === item.id ? "text-white" : "text-gray-400"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className={`ml-auto text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                  activeTab === item.id ? "bg-white text-primaryColor" : "bg-gray-200 text-gray-700"
                }`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={clearCurrentUser}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Mobile Dropdown ───────────────────────────────────── */}
        <div className="lg:hidden w-full flex justify-between items-center relative z-40 mb-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primaryColor/10 flex items-center justify-center text-primaryColor">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-bold text-xs text-[#001429] uppercase tracking-wide">Club Admin</p>
              <p className="text-[9px] font-bold text-gray-400">detobisz@yahoo.com</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-[#001429] hover:bg-gray-100 transition-all"
            >
              <span className="uppercase">{activeTab}</span>
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {sidebarOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as AdminTab);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold transition-all border-b border-gray-50 last:border-0 ${
                      activeTab === item.id
                        ? "bg-primaryColor/5 text-primaryColor border-l-4 border-primaryColor"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className={activeTab === item.id ? "text-primaryColor" : "text-gray-400"}>
                      {item.icon}
                    </span>
                    <span className="uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
                <div className="bg-red-50 p-2">
                  <button
                    onClick={clearCurrentUser}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-white text-red-500 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-50 transition-all shadow-sm"
                  >
                    <LogOut size={14} />
                    SIGN OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────── */}
        <main className="w-full lg:flex-1 min-w-0">
          <FadeIn>
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-8">
                {/* Welcome & Overview Banner */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#001429] to-[#2052DA] p-8 text-white shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
                      Control Panel
                    </p>
                    <h2 className="text-3xl font-black uppercase">
                      Welcome, Club Administrator
                    </h2>
                    <p className="text-white/70 text-sm mt-1">
                      Manage registered members, review directory list, invite new players, and broadcast notifications.
                    </p>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Total Members Card */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 text-primaryColor/5 group-hover:scale-110 transition-transform duration-300">
                      <Users size={120} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Total Members
                    </p>
                    <p className="text-4xl font-black text-[#001429]">{totalMembers}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">{activeMembersCount} Active</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">{suspendedMembersCount} Suspended</span>
                    </div>
                  </div>

                  {/* Financial Collections Card */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 text-green-500/5 group-hover:scale-110 transition-transform duration-300">
                      <DollarSign size={120} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Total Subscription Value
                    </p>
                    <p className="text-4xl font-black text-green-600">
                      ₦{totalFeesCollected.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 text-xs text-green-600 font-bold">
                      <TrendingUp size={14} />
                      <span>Based on active tiers</span>
                    </div>
                  </div>

                  {/* Settings status */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group col-span-1 sm:col-span-2 lg:col-span-1">
                    <div className="absolute -right-4 -bottom-4 text-blue-500/5 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck size={120} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Security Status
                    </p>
                    <p className="text-4xl font-black text-[#001429]">Strict</p>
                    <p className="text-xs text-gray-400 mt-4 font-semibold">
                      Public self-registration: <span className="text-red-500 font-bold uppercase">Disabled</span>
                    </p>
                  </div>
                </div>

                {/* Quick actions & stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* System Log */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#001429] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                      Recent Member Actions
                    </h3>
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[250px]">
                      {members.flatMap(m => m.activity.map(act => ({ name: m.name, ...act })))
                        .sort((a,b) => b.time.localeCompare(a.time))
                        .slice(0, 5)
                        .map((act, i) => (
                          <div key={i} className="flex gap-3 text-xs border-b border-gray-50 pb-2 last:border-0">
                            <div className="w-2 h-2 rounded-full bg-primaryColor mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="font-bold text-gray-700">{act.name}</span>: {act.label}
                            </div>
                            <span className="text-gray-400 font-semibold">{act.time}</span>
                          </div>
                      ))}
                      {totalMembers === 0 && (
                        <p className="text-center text-xs text-gray-400 py-6">No member actions recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Admin Shortcuts */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black text-[#001429] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                        Admin Quick Actions
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-6">
                        Instantly deploy system notifications to players, create new user credentials, or review player metrics.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setActiveTab("register")}
                        className="py-3 px-4 bg-gray-50 hover:bg-primaryColor hover:text-white rounded-xl border border-gray-100 hover:border-transparent text-xs font-bold text-primaryColor transition-all text-center flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <UserPlus size={16} />
                        <span>Register Member</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab("broadcast")}
                        className="py-3 px-4 bg-gray-50 hover:bg-primaryColor hover:text-white rounded-xl border border-gray-100 hover:border-transparent text-xs font-bold text-primaryColor transition-all text-center flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <MessageSquare size={16} />
                        <span>Send Broadcast</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "directory" && (
              <div className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-black text-[#001429] uppercase">Registered Members</h2>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                      View, search, or delete registered club users
                    </p>
                  </div>
                  <button
                    onClick={handleExportToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Download size={16} />
                    Export to Excel
                  </button>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm items-center justify-between">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search members by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-gray-500 appearance-none pr-8 relative cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active Only</option>
                      <option value="suspended">Suspended Only</option>
                    </select>
                  </div>
                </div>

                {/* Table Container */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Member Details</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Role & Position</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Jersey #</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Membership Tier</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Joined Date</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs">
                        {filteredMembers.map((m) => (
                          <tr key={m.email} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primaryColor to-[#001429] flex items-center justify-center text-white font-black text-xs uppercase">
                                  {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                  <p className="font-bold text-[#001429]">{m.name}</p>
                                  <p className="text-[10px] text-gray-400">{m.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-600">
                              <p className="text-[#001429]">{m.role}</p>
                              <p className="text-[10px] text-gray-400">{m.position}</p>
                            </td>
                            <td className="px-6 py-4 font-bold text-primaryColor">
                              {m.number}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1 items-start">
                                <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                                  {m.membershipType}
                                </span>
                                {m.status === "suspended" && (
                                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase bg-red-55 text-red-600 border border-red-100">
                                    Suspended
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-semibold">
                              {m.joined}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button 
                                      className={`font-bold px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                        m.status === "suspended"
                                          ? "text-green-600 hover:bg-green-50"
                                          : "text-amber-600 hover:bg-amber-50"
                                      }`}
                                    >
                                      {m.status === "suspended" ? "Unsuspend" : "Suspend"}
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-white border-gray-100 rounded-xl">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-xl font-black text-[#001429] uppercase">Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription className="text-sm font-semibold text-gray-500">
                                        This action will {m.status === "suspended" ? "unsuspend" : "suspend"} the member <strong className="text-[#001429]">{m.name}</strong> ({m.email}).
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer">Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleToggleSuspend(m.email, m.status)} className="font-bold uppercase tracking-wider text-xs rounded-xl bg-primaryColor hover:bg-blue-600 text-white cursor-pointer">
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button 
                                      className="text-red-500 hover:text-red-750 font-bold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer text-xs"
                                    >
                                      Delete
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-white border-gray-100 rounded-xl">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-xl font-black text-red-600 uppercase">Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription className="text-sm font-semibold text-gray-500">
                                        This action cannot be undone. This will permanently delete <strong className="text-[#001429]">{m.name}</strong> from the directory.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="font-bold uppercase tracking-wider text-xs rounded-xl cursor-pointer">Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteMember(m.email)} className="font-bold uppercase tracking-wider text-xs rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {filteredMembers.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center text-gray-400 py-10 font-medium bg-white">
                              No members match the search query or tier filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "register" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-black text-[#001429] uppercase">Register Member</h2>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                    Create a new secure account for an Island FC member
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl">
                  <form onSubmit={handleRegister} className="space-y-6">
                    {/* General details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            required
                            type="text"
                            placeholder="e.g. John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Temporary Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            required
                            type="text"
                            placeholder="Enter password (e.g. pass123)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            required
                            type="tel"
                            placeholder="+234..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
                          />
                        </div>
                      </div>

                      {/* DOB */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Date of Birth</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            required
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Jersey Number */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Jersey Number</label>
                        <div className="relative">
                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            required
                            type="text"
                            placeholder="e.g. 14"
                            value={jerseyNumber}
                            onChange={(e) => setJerseyNumber(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferences & Tier */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                      {/* Position */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Position</label>
                        <select 
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-gray-500 appearance-none cursor-pointer"
                        >
                          <option>Midfielder</option>
                          <option>Forward</option>
                          <option>Defender</option>
                          <option>Goalkeeper</option>
                        </select>
                      </div>

                      {/* Role */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Role</label>
                        <select 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-gray-500 appearance-none cursor-pointer"
                        >
                          <option>President</option>
                          <option>Vice President</option>
                          <option>Executive</option>
                          <option>Member</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/10 cursor-pointer"
                    >
                      Complete Registration
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "broadcast" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-black text-[#001429] uppercase">Broadcast Message</h2>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                    Send a system notification to a specific player inbox or all members
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm max-w-xl">
                  <form onSubmit={handleBroadcast} className="space-y-5">
                    {/* Recipient selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Recipient</label>
                      <select 
                        value={msgRecipient}
                        onChange={(e) => setMsgRecipient(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-gray-500 appearance-none cursor-pointer"
                      >
                        <option value="all">All Registered Members (Broadcast)</option>
                        {members.map(m => (
                          <option key={m.email} value={m.email}>{m.name} ({m.email})</option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Schedule Update for training session"
                        value={msgSubject}
                        onChange={(e) => setMsgSubject(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429]"
                      />
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Message Content</label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Type notification text here..."
                        value={msgContent}
                        onChange={(e) => setMsgContent(e.target.value)}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primaryColor focus:bg-white transition-all text-xs font-semibold text-[#001429] resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-primaryColor text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={14} />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </FadeIn>
        </main>
      </div>
    </div>
  );
}
