import React from "react";
import Image from "next/image";
import ExpertImage from "./ExpertImage";
import {
  Montserrat,
  Playfair_Display,
  Sofia_Sans_Condensed,
} from "next/font/google";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export default async function OurExpertsLead() {
  const experts = await prisma.executive.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-3">
            Meet the Team
          </p>
          <h2
            className={`${sofiaSansCondensed.className} text-4xl md:text-5xl font-bold text-black tracking-tight uppercase leading-tight`}
          >
            Our Club Executive Council (EXCOS)
          </h2>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {experts.map((expert, index) => (
            <Link
              href={`/experts/${expert.slug}`}
              className="group cursor-pointer block"
              key={expert.id}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <ExpertImage
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Expert Info */}
              <div className="mt-6">
                <h3
                  className={`${montserrat.className} text-base font-medium text-black uppercase tracking-tight`}
                >
                  {expert.name}
                </h3>
                <p className={`text-gray-400 text-sm font-medium mt-1`}>
                  {expert.role}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
