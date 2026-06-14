import { NextResponse } from 'next/server';
import { newsItems } from '@/data/news';

export async function GET() {
  const items = newsItems.map(item => ({
    ...item,
    description: item.content,
  }));
  return NextResponse.json(items);
}
