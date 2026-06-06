"use client";

export interface MemberStats {
  matches: number;
  goals: number;
  assists: number;
  rating: number;
}

export interface MemberActivity {
  type: "match" | "training" | "payment" | "system";
  label: string;
  time: string;
}

export interface MemberMessage {
  from: string;
  subject: string;
  time: string;
  read: boolean;
}

export interface Member {
  name: string;
  email: string;
  password?: string;
  role: string;
  number: string;
  position: string;
  joined: string;
  membershipType: string;
  membershipExpiry: string;
  avatar: string | null;
  stats: MemberStats;
  activity: MemberActivity[];
  messages: MemberMessage[];
}

const DEFAULT_MEMBERS: Member[] = [
  {
    name: "Emeka Okafor",
    email: "emeka.okafor@email.com",
    password: "password123",
    role: "Senior Player",
    number: "#14",
    position: "Midfielder",
    joined: "January 2023",
    membershipType: "Premium",
    membershipExpiry: "December 2026",
    avatar: null,
    stats: {
      matches: 32,
      goals: 7,
      assists: 11,
      rating: 7.8,
    },
    activity: [
      { type: "match", label: "Match vs Apapa FC — Won 3-1", time: "2 days ago" },
      { type: "training", label: "Training Session — Tactical Drills", time: "4 days ago" },
      { type: "payment", label: "Membership Renewed — ₦50,000", time: "1 week ago" },
      { type: "match", label: "Match vs Bar Beach Boys — Draw 1-1", time: "2 weeks ago" },
    ],
    messages: [
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
    ],
  },
  {
    name: "John Doe",
    email: "john.doe@email.com",
    password: "password123",
    role: "Junior Player",
    number: "#9",
    position: "Forward",
    joined: "March 2024",
    membershipType: "Basic",
    membershipExpiry: "March 2027",
    avatar: null,
    stats: {
      matches: 12,
      goals: 8,
      assists: 2,
      rating: 7.2,
    },
    activity: [
      { type: "match", label: "Match vs Marina Strikers — Won 2-0", time: "5 days ago" },
      { type: "training", label: "Fitness Drills Session", time: "1 week ago" },
    ],
    messages: [
      {
        from: "Coach Tunde",
        subject: "Tactical briefing agenda",
        time: "1d ago",
        read: false,
      },
    ],
  },
];

export const isClient = typeof window !== "undefined";

export function getMembers(): Member[] {
  if (!isClient) return DEFAULT_MEMBERS;
  
  const stored = localStorage.getItem("ifc_members");
  if (!stored) {
    localStorage.setItem("ifc_members", JSON.stringify(DEFAULT_MEMBERS));
    return DEFAULT_MEMBERS;
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse members from storage", e);
    return DEFAULT_MEMBERS;
  }
}

export function saveMembers(members: Member[]) {
  if (!isClient) return;
  localStorage.setItem("ifc_members", JSON.stringify(members));
}

export function findMemberByEmail(email: string): Member | undefined {
  const members = getMembers();
  return members.find((m) => m.email.toLowerCase() === email.toLowerCase());
}

export function addMember(member: Member): boolean {
  if (findMemberByEmail(member.email)) {
    return false; // already exists
  }
  const members = getMembers();
  members.push(member);
  saveMembers(members);
  return true;
}

export function getCurrentUser() {
  if (!isClient) return null;
  const userStr = localStorage.getItem("ifc_current_user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user: any) {
  if (!isClient) return;
  localStorage.setItem("ifc_current_user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
}

export function clearCurrentUser() {
  if (!isClient) return;
  localStorage.removeItem("ifc_current_user");
  window.dispatchEvent(new Event("auth-change"));
}

export function updateMemberProfile(email: string, updatedFields: Partial<Member>): boolean {
  const members = getMembers();
  const index = members.findIndex((m) => m.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;
  
  members[index] = {
    ...members[index],
    ...updatedFields,
    // Ensure nested objects aren't accidentally wiped if they aren't part of update
    stats: { ...members[index].stats, ...(updatedFields.stats || {}) },
  };
  
  saveMembers(members);
  
  // If this is the current user, update their session too
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
    const updatedUser = {
      ...currentUser,
      ...updatedFields,
    };
    // Don't leak password in session state
    delete updatedUser.password;
    setCurrentUser(updatedUser);
  }
  
  return true;
}
