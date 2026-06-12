"use server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export interface Business {
  name: string;
  owner: string;
  description: string;
  location: string;
  tags: string[];
  isVerified: boolean;
  status?: string | null;
  phone?: string | null;
}

export async function getBusinesses(): Promise<Business[]> {
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return businesses as Business[];
}

export async function addBusiness(business: Business): Promise<boolean> {
  const existing = await prisma.business.findUnique({
    where: { name: business.name }
  });
  if (existing) return false;

  await prisma.business.create({
    data: {
      name: business.name,
      owner: business.owner,
      description: business.description,
      location: business.location,
      tags: business.tags,
      isVerified: business.isVerified ?? false,
      status: business.status ?? "active",
      phone: business.phone
    }
  });
  
  revalidatePath("/business-hub");
  revalidatePath("/admin");
  return true;
}

export async function deleteBusiness(name: string): Promise<void> {
  await prisma.business.delete({
    where: { name }
  });
  revalidatePath("/business-hub");
  revalidatePath("/admin");
}

export async function toggleSuspendBusiness(name: string): Promise<void> {
  const target = await prisma.business.findUnique({ where: { name } });
  if (target) {
    await prisma.business.update({
      where: { name },
      data: { status: target.status === "suspended" ? "active" : "suspended" }
    });
    revalidatePath("/business-hub");
    revalidatePath("/admin");
  }
}
