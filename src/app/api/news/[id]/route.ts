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
    const { title, category, date, content, image, videoUrl, slug } = body;

    const updatedNews = await prisma.newsItem.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        date,
        content,
        image,
        videoUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/news");
    revalidatePath("/news");

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
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
    
    const newsItem = await prisma.newsItem.findUnique({
      where: { id },
    });

    if (newsItem?.image) {
      await deleteCloudinaryImage(newsItem.image);
    }

    await prisma.newsItem.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/news");
    revalidatePath("/news");

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
