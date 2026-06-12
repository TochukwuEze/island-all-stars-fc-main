"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export interface MemberStats {
  matches: number;
  goals: number;
  assists: number;
  rating: number;
}

export interface MemberActivity {
  type: "match" | "training" | "social" | "payment" | "system";
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
  status?: "active" | "suspended";
  stats: MemberStats;
  activity: MemberActivity[];
  messages: MemberMessage[];
}

export async function getMembers(): Promise<Member[]> {
  const data = await prisma.member.findMany({
    include: {
      stats: true,
      activity: true,
      messages: true
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return data.map(d => ({
    ...d,
    password: d.password || undefined,
    status: d.status as "active" | "suspended" | undefined,
    stats: d.stats ? {
      matches: d.stats.matches,
      goals: d.stats.goals,
      assists: d.stats.assists,
      rating: d.stats.rating
    } : { matches: 0, goals: 0, assists: 0, rating: 0 },
    activity: d.activity.map(a => ({
      type: a.type as "match" | "training" | "social" | "payment" | "system",
      label: a.label,
      time: a.time
    })),
    messages: d.messages.map(m => ({
      from: m.from,
      subject: m.subject,
      time: m.time,
      read: m.read
    }))
  }));
}

export async function findMemberByEmail(email: string): Promise<Member | undefined> {
  const members = await getMembers();
  return members.find(m => m.email.toLowerCase() === email.toLowerCase());
}

export async function addMember(member: Member): Promise<boolean> {
  const existing = await prisma.member.findUnique({
    where: { email: member.email }
  });
  if (existing) return false;

  await prisma.member.create({
    data: {
      name: member.name,
      email: member.email,
      password: member.password || "password123",
      role: member.role,
      number: member.number,
      position: member.position,
      joined: member.joined,
      membershipType: member.membershipType,
      membershipExpiry: member.membershipExpiry,
      avatar: member.avatar,
      status: member.status || "active",
      stats: {
        create: member.stats
      },
      activity: {
        create: member.activity.map(a => ({
          type: a.type,
          label: a.label,
          time: a.time
        }))
      },
      messages: {
        create: member.messages.map(m => ({
          from: m.from,
          subject: m.subject,
          time: m.time,
          read: m.read
        }))
      }
    }
  });

  revalidatePath("/admin");
  return true;
}

export async function updateMemberProfile(email: string, updatedFields: Partial<Member>): Promise<boolean> {
  const existing = await prisma.member.findUnique({ where: { email } });
  if (!existing) return false;

  const dataToUpdate: any = {};
  if (updatedFields.name) dataToUpdate.name = updatedFields.name;
  if (updatedFields.role) dataToUpdate.role = updatedFields.role;
  if (updatedFields.number) dataToUpdate.number = updatedFields.number;
  if (updatedFields.position) dataToUpdate.position = updatedFields.position;
  if (updatedFields.status) dataToUpdate.status = updatedFields.status;

  await prisma.member.update({
    where: { email },
    data: dataToUpdate
  });

  revalidatePath("/admin");
  revalidatePath("/member-portal");
  return true;
}

export async function deleteMember(email: string): Promise<void> {
  await prisma.member.delete({
    where: { email }
  });
  revalidatePath("/admin");
}

export async function broadcastMessage(subject: string, content: string, recipientEmail?: string): Promise<number> {
  const newMessage = {
    from: "Club Admin",
    subject,
    time: "Just now",
    read: false
  };

  if (recipientEmail && recipientEmail !== "all") {
    const member = await prisma.member.findUnique({ where: { email: recipientEmail } });
    if (member) {
      await prisma.memberMessage.create({
        data: {
          memberId: member.id,
          ...newMessage
        }
      });
      await prisma.memberActivity.create({
        data: {
          memberId: member.id,
          type: "system",
          label: `Received admin message: ${subject}`,
          time: "Just now"
        }
      });
      revalidatePath("/admin");
      return 1;
    }
    return 0;
  } else {
    const members = await prisma.member.findMany();
    let count = 0;
    for (const m of members) {
      await prisma.memberMessage.create({
        data: {
          memberId: m.id,
          ...newMessage
        }
      });
      await prisma.memberActivity.create({
        data: {
          memberId: m.id,
          type: "system",
          label: `Received admin message: ${subject}`,
          time: "Just now"
        }
      });
      count++;
    }
    revalidatePath("/admin");
    return count;
  }
}

export async function toggleSuspend(email: string): Promise<void> {
  const member = await prisma.member.findUnique({ where: { email } });
  if (member) {
    const newStatus = member.status === "suspended" ? "active" : "suspended";
    await prisma.member.update({
      where: { email },
      data: { status: newStatus }
    });
    await prisma.memberActivity.create({
      data: {
        memberId: member.id,
        type: "system",
        label: `Account ${newStatus === "suspended" ? "suspended" : "reactivated"} by Admin`,
        time: "Just now"
      }
    });
    revalidatePath("/admin");
  }
}
