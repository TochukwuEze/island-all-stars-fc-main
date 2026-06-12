"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/data/news";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { galleryItems } from "@/app/gallery/gallery-data";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

const News = () => {
  const combinedItems = [
    ...newsItems.map((item) => ({
      ...item,
      isVideo: false,
      description: item.content.split("\n")[0],
    })),
    ...galleryItems
      .filter((item) => item.type === "video")
      .map((video) => ({
        id: video.id,
        slug: video.id,
        title: video.title,
        category: "VIDEO",
        date: video.year.toString(),
        comments: 0,
        image: video.thumbnail,
        isVideo: true,
        description: video.description,
      })),
  ];

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="md:w-1/3">
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase">
              Elevate your social & sports life
            </p>
          </div>
          <div className="md:w-2/3 md:text-right">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1] ${sofiaSansCondensed.className}`}
            >
              Latest{" "}
              <span className="bg-[#2052DA] px-3 py-1 inline-block transform -skew-x-6">
                News
              </span>{" "}
              And Insights <br className="hidden lg:block" /> From The Club
            </h2>
          </div>
        </div>

        {/* News Carousel */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {combinedItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="group cursor-pointer block"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {item.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#2052DA] rounded-full flex items-center justify-center bg-opacity-80 transition-transform group-hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* News Content */}
                  <div className="mt-6 space-y-3">
                    <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-bold leading-tight uppercase group-hover:text-[#2052DA] transition-colors duration-300 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-[11px] font-medium uppercase">
                      <span>{item.date}</span>
                      {!item.isVideo && (
                        <>
                          <span className="w-1 h-1 bg-gray-700 rounded-full" />
                          <span>
                            {item.comments}{" "}
                            {item.comments === 1 ? "Comment" : "Comments"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end gap-4 mt-8">
            <CarouselPrevious className="static transform-none bg-transparent border-gray-800 hover:bg-zinc-800 hover:text-white hover:border-gray-700" />
            <CarouselNext className="static transform-none bg-transparent border-gray-800 hover:bg-zinc-800 hover:text-white hover:border-gray-700" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default News;
