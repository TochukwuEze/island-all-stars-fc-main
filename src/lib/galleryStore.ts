import { prisma } from "./prisma";
import type { GalleryItem } from "@/types"; // Using shared type

export async function getGalleryItems() {
  const items = await prisma.galleryItem.findMany();

  return items.map((item: GalleryItem) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    isVideo: item.type === "video",
    type: item.type as "photo" | "video",
    category: item.category,
    thumbnail: item.thumbnail,
    src: item.src || undefined,
    year: item.year,
  }));
}
