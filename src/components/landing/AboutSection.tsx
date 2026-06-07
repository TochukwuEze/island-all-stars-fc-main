import { MessageSquareText } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="relative w-full py-28 px-8 md:px-24 overflow-hidden">
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0 bg-[#001D3D]">
        <Image
          src="/images/about-bg-illustration.png"
          alt="Sports Club Vector Background"
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001D3D] via-[#001D3D]/80 to-[#001D3D]/30" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <p className="text-white text-2xl md:text-4xl lg:text-[44px] font-medium leading-[1.4] tracking-tight opacity-95">
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            ISLAND ALLSTARS SPORTS CLUB
          </span>{" "}
          is a social, family, networking and physical fitness club, based in the
          Island part of Lagos. We are a close-knit-family-oriented club where
          professionals from all walks of life come together through a love for sports.
        </p>
      </div>

      {/* Floating Chat Icon */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#0056b3] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[60]">
        <MessageSquareText size={32} />
      </button>
    </section>
  );
}
