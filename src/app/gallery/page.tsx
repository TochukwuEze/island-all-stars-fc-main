"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { Play, X, ImageIcon, VideoIcon, Maximize2 } from "lucide-react";
import { galleryItems } from "./gallery-data";

type MediaTab = "all" | "photo" | "video";

const VIDEO_CATEGORIES = [
  "All Videos",
  "Tournament 2016",
  "Soccer May 2015",
] as const;
type VideoCategory = (typeof VIDEO_CATEGORIES)[number];



/** Returns a human-readable relative time string from a year, e.g. "9 years ago" */
function timeAgo(year: number): string {
  const diff = new Date().getFullYear() - year;
  if (diff <= 0) return "This year";
  if (diff === 1) return "1 year ago";
  return `${diff} years ago`;
}

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState<MediaTab>("all");
  const [videoCategory, setVideoCategory] =
    useState<VideoCategory>("All Videos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "photo") return item.type === "photo";
    if (activeTab === "video") {
      if (videoCategory === "All Videos") return item.type === "video";
      return item.type === "video" && item.category === videoCategory;
    }
    return true; // "all"
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <TopBar />
      <MainHeader />
      <Navbar />

      <div className="flex-1">
        <Breadcrumb title="Gallery" />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Capturing Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the moments that define Island Football Club. From
              matchday thrills to community outreach, we share our story through
              every frame.
            </p>
          </div>

          {/* Primary tabs: All / Photos / Videos */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {(["all", "photo", "video"] as MediaTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setVideoCategory("All Videos");
                }}
                className={`px-5 md:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeTab === tab
                    ? "bg-[#2052DA] text-white border-[#2052DA] shadow-lg shadow-[#2052DA]/30"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#2052DA] hover:text-[#2052DA]"
                }`}
              >
                {tab === "all"
                  ? "All Media"
                  : tab === "photo"
                    ? "Photos"
                    : "Videos"}
              </button>
            ))}
          </div>

          {/* Secondary tabs: video event categories (only when Videos tab is active) */}
          {activeTab === "video" && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {VIDEO_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVideoCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                    videoCategory === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-500 hover:text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Spacer when no secondary tabs */}
          {activeTab !== "video" && <div className="mb-10" />}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isVideo = item.type === "video";
              const cardContent = (
                <>
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/2.5] overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {item.type === "video" ? (
                        <div className="w-16 h-16 bg-[#2052DA] rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <Play className="text-white fill-current w-8 h-8 ml-1" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <Maximize2 className="text-white w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Icon Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                        {item.type === "video" ? (
                          <VideoIcon className="w-5 h-5 text-[#2052DA]" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-[#2052DA]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs font-bold text-primaryColor uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                    <h3
                      title={item.title}
                      className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-primaryColor transition-colors mb-2"
                    >
                      {item.title}
                    </h3>
                    <p
                      title={item.description}
                      className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1"
                    >
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-auto">
                      {timeAgo(item.year)}
                    </p>
                  </div>
                </>
              );

              if (isVideo) {
                return (
                  <Link
                    key={item.id}
                    href={`/gallery/${item.id}`}
                    className="group relative overflow-hidden rounded-md bg-white shadow hover:shadow-lg transition-all duration-500 flex flex-col"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item.src)}
                  className="group relative overflow-hidden rounded-md bg-white shadow hover:shadow-lg transition-all duration-500 flex flex-col cursor-pointer"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </div>



      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-transparent rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Selected Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
