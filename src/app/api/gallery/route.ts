import { NextResponse } from 'next/server';
import { getGalleryItems, addGalleryItem } from '@/lib/galleryStore';

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const item = await addGalleryItem(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}
