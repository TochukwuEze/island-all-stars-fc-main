"use server";

import { prisma } from "./prisma";

export async function getGalleryItems() {
  const items = await prisma.galleryItem.findMany();
  
  return items.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type as "photo" | "video",
    category: item.category,
    thumbnail: item.thumbnail,
    src: item.src || undefined,
    year: item.year
  }));
}
