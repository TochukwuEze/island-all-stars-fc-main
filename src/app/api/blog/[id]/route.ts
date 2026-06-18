import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, category, date, excerpt, content, image, videoUrl, slug } = body;

    const updatedBlog = await prisma.blogItem.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        date,
        excerpt,
        content,
        image,
        videoUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
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
    await prisma.blogItem.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
