// src/lib/newsStore.ts
"use server";

import { prisma } from "./prisma";
import type { NewsItem } from "@/types"; // Using shared type

/**
 * Fetch news items from the database and map them to the shared `NewsItem` type.
 * The Prisma model still stores the original `content` field, which we expose as
 * `description` for the UI. The deprecated `content` field is retained for backward
 * compatibility but set to `undefined`.
 */
export async function getNewsItems(): Promise<NewsItem[]> {
  // Retrieve raw rows from Prisma
  const items = await prisma.newsItem.findMany();

  // Transform each row to match the `NewsItem` interface defined in src/types.ts
  return items.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category,
    date: item.date,
    comments: item.comments,
    image: item.image,
    // Prisma uses `content`; our UI expects `description`
    description: item.content,
    isVideo: false,
    // Preserve deprecated field for any legacy consumers
    content: undefined,
  }));
}
