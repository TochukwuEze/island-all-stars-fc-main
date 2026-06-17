import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await prisma.newsItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Add description alias for frontend compatibility
    const items = news.map(item => ({
      ...item,
      description: item.content,
    }));
    
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, date, content, image, videoUrl, slug } = body;

    const newNews = await prisma.newsItem.create({
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

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
