import { prisma } from "./prisma";
import type { VideoItem } from "@/types"; // Using shared type
import { deleteCloudinaryImage } from "./cloudinary";

export async function getGalleryItems(): Promise<VideoItem[]> {
  const items = await prisma.galleryItem.findMany();

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description || undefined,
    isVideo: item.type === "video",
    type: item.type as "photo" | "video",
    category: item.category,
    thumbnail: item.thumbnail,
    src: item.src || undefined,
    year: item.year || undefined,
  }));
}

export async function addGalleryItem(data: any) {
  return await prisma.galleryItem.create({
    data,
  });
}

export async function updateGalleryItem(id: string, data: any) {
  return await prisma.galleryItem.update({
    where: { id },
    data,
  });
}

export async function deleteGalleryItem(id: string) {
  const item = await prisma.galleryItem.findUnique({
    where: { id },
  });

  if (item) {
    if (item.src) {
      await deleteCloudinaryImage(item.src);
    }
    if (item.thumbnail && item.thumbnail !== item.src) {
      await deleteCloudinaryImage(item.thumbnail);
    }
  }

  return await prisma.galleryItem.delete({
    where: { id },
  });
}
