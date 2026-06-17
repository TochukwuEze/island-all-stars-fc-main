import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const executives = await prisma.executive.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(executives);
  } catch (error) {
    console.error("Error fetching executives:", error);
    return NextResponse.json(
      { error: "Failed to fetch executives" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, slug, image, description, order } = body;

    const newExecutive = await prisma.executive.create({
      data: {
        name,
        role,
        slug,
        image,
        description,
        order: order || 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/excos");

    return NextResponse.json(newExecutive, { status: 201 });
  } catch (error) {
    console.error("Error creating executive:", error);
    return NextResponse.json(
      { error: "Failed to create executive" },
      { status: 500 }
    );
  }
}
