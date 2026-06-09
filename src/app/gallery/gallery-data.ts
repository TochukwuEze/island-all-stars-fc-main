export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  year: number;
};

export const galleryItems: GalleryItem[] = [
  // -- Photos ------------------------------------------------------------------
  {
    id: "photo-1",
    type: "photo",
    src: "/images/members/memberImage11.webp",
    thumbnail: "/images/members/memberImage11.webp",
    title: "Match Day Intensity",
    category: "Match",
    year: 2024,
  },
  {
    id: "photo-2",
    type: "photo",
    src: "/images/hero-bg-2.webp",
    thumbnail: "/images/hero-bg-2.webp",
    title: "Team Training Session",
    category: "Training",
    year: 2024,
  },
  {
    id: "photo-3",
    type: "photo",
    src: "/images/hero-bg-3.webp",
    thumbnail: "/images/hero-bg-3.webp",
    title: "Stadium Atmosphere",
    category: "Fans",
    year: 2024,
  },
  {
    id: "photo-4",
    type: "photo",
    src: "/images/members/memberImage6.webp",
    thumbnail: "/images/members/memberImage6.webp",
    title: "Grassroots Development",
    category: "Community",
    year: 2024,
  },
  {
    id: "photo-5",
    type: "photo",
    src: "/images/news/unites.png",
    thumbnail: "/images/news/unites.png",
    title: "Football Unites Everyone",
    category: "Community",
    year: 2024,
  },

  // -- IASC Lekki 8 Aside Tournament 2016 --------------------------------------

  {
    id: "t16-1",
    type: "video",
    src: "https://www.youtube.com/embed/Pfl76o_jTQM",
    thumbnail: "https://img.youtube.com/vi/Pfl76o_jTQM/hqdefault.jpg",
    title: "Arise TV awarded at IASC End of Year Party 2024",
    category: "Others",
    year: 2024,
  },
  {
    id: "t16-2",
    type: "video",
    src: "https://www.youtube.com/embed/Dh0JCODTtPk",
    thumbnail: "https://img.youtube.com/vi/Dh0JCODTtPk/maxresdefault.jpg",
    title:
      "Island All Stars SC vs All Stars International FC - Saturday, July 26, 2025",
    category: "Match",
    year: 2025,
  },
];
