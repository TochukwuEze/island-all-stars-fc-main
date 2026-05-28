"use client";

import React, { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/hero-bg.webp",
    title1: "Get Empowered With",
    title2: "Your Football Skills",
    tags: ["Learn", "Accelerate", "Scale"],
  },
  {
    image: "/images/hero-bg-2.webp",
    title1: "Professional Academy",
    title2: "Training Programs",
    tags: ["Develop", "Compete", "Succeed"],
  },
  {
    image: "/images/hero-bg-3.webp",
    title1: "Join Our Elite",
    title2: "Football Community",
    tags: ["Connect", "Play", "Grow"],
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] flex items-center px-16 overflow-hidden bg-[#111]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-5000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 md:to-transparent" />
          </div>

          <div className="relative z-10 h-full max-w-6xl mx-auto flex flex-col justify-center gap-8 pt-10 px-6 md:px-10">
            <h1 className="text-white text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter leading-[1.2]">
              {slide.title1} <br />
              <span className="text-white/95">{slide.title2}</span>
            </h1>

            <div className="flex items-center gap-2 md:gap-4 text-2xl md:text-3xl font-semibold italic flex-wrap">
              <span className="text-primaryColor">{slide.tags[0]}</span>
              <span className="text-white/40">|</span>
              <span className="text-primaryColor">{slide.tags[1]}</span>
              <span className="text-white/40">|</span>
              <span className="text-primaryColor">{slide.tags[2]}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative vertical lines like in the original */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-50 z-20 pointer-events-none" />

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primaryColor scale-125 shadow-[0_0_10px_rgba(32,82,218,0.8)]"
                : "bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
