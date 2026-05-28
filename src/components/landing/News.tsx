"use client";

import React from "react";
import Image from "next/image";

const newsItems = [
  {
    title: "FAMOUS SOCCER RIVALRIES THAT CAPTURED GLOBAL ATTENTION",
    category: "FOOTBALL NEWS",
    date: "Nov 4, 2025",
    comments: 2,
    image: "/images/news/rivalries.png",
  },
  {
    title: "COMMON INJURIES IN SOCCER AND HOW TO PREVENT THEM",
    category: "FOOTBALL NEWS",
    date: "Nov 4, 2025",
    comments: 0,
    image: "/images/news/injuries.png",
  },
  {
    title: "WHY GRASSROOTS FOOTBALL SHAPES FUTURE STARS",
    category: "FOOTBALL NEWS",
    date: "Nov 4, 2025",
    comments: 0,
    image: "/images/news/grassroots.png",
  },
  {
    title: "HOW SOCCER UNITES FANS AND PLAYERS AROUND THE WORLD",
    category: "FOOTBALL NEWS",
    date: "Nov 4, 2025",
    comments: 0,
    image: "/images/news/unites.png",
  },
];

const News = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="md:w-1/3">
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase">
              Elevate your football journey
            </p>
          </div>
          <div className="md:w-2/3 md:text-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.1]">
              Latest <span className="bg-[#2052DA] px-3 py-1 inline-block transform -skew-x-6">News</span> And Insights <br className="hidden lg:block" /> From The Industry
            </h2>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {newsItems.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* News Content */}
              <div className="mt-6 space-y-3">
                <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold leading-tight uppercase group-hover:text-[#2052DA] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-[11px] font-medium uppercase">
                  <span>{item.date}</span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full" />
                  <span>{item.comments} {item.comments === 1 ? "Comment" : "Comments"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
