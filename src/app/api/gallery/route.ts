import { NextResponse } from 'next/server';
import { getGalleryItems } from '@/lib/galleryStore';

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json(items);
}
