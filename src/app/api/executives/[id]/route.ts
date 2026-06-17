import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, slug, image, description, order } = body;

    const updatedExecutive = await prisma.executive.update({
      where: { id },
      data: {
        name,
        role,
        slug,
        image,
        description,
        order,
      },
    });

    return NextResponse.json(updatedExecutive);
  } catch (error) {
    console.error("Error updating executive:", error);
    return NextResponse.json(
      { error: "Failed to update executive" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.executive.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Executive deleted successfully" });
  } catch (error) {
    console.error("Error deleting executive:", error);
    return NextResponse.json(
      { error: "Failed to delete executive" },
      { status: 500 }
    );
  }
}
