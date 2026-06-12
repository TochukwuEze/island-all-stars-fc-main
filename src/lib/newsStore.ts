"use server";

import { prisma } from "./prisma";

export async function getNewsItems() {
  const items = await prisma.newsItem.findMany();
  
  return items.map(item => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category,
    date: item.date,
    comments: item.comments,
    image: item.image,
    content: item.content
  }));
}
