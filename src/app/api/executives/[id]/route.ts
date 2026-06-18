import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

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

    revalidatePath("/");
    revalidatePath("/admin/excos");

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
    
    const executive = await prisma.executive.findUnique({
      where: { id },
    });

    if (executive?.image) {
      await deleteCloudinaryImage(executive.image);
    }

    await prisma.executive.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/excos");

    return NextResponse.json({ message: "Executive deleted successfully" });
  } catch (error) {
    console.error("Error deleting executive:", error);
    return NextResponse.json(
      { error: "Failed to delete executive" },
      { status: 500 }
    );
  }
}
