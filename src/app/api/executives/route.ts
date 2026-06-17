import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json(newExecutive, { status: 201 });
  } catch (error) {
    console.error("Error creating executive:", error);
    return NextResponse.json(
      { error: "Failed to create executive" },
      { status: 500 }
    );
  }
}
