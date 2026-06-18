import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blogItems = await prisma.blogItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(blogItems);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, date, excerpt, content, image, videoUrl, slug } = body;

    const newBlog = await prisma.blogItem.create({
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

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
