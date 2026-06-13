export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  comments: number;
  image: string;
  description?: string; // optional description for videos
  isVideo: boolean; // true for video items, false for photos
  type: "photo" | "video"; // distinguishes media type
  thumbnail: string; // video thumbnail image URL
  src?: string; // source URL for photos
  year?: number; // year for videos

}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  comments: number;
  image: string;
  isVideo: false;
  description: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  isVideo: boolean;
  type: "photo" | "video";
  category: string;
  thumbnail: string;
  src?: string;
  year?: number;
}

export type CombinedItem = GalleryItem | NewsItem;
