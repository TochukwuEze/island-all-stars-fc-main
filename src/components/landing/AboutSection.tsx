import { MessageSquareText } from "lucide-react";

export function AboutSection() {
  return (
    <section className="relative w-full bg-[#001D3D] py-24 px-8 md:px-24">
      <div className="max-w-5xl">
        <p className="text-white text-2xl md:text-4xl font-medium leading-[1.4] opacity-90">
          <span className="font-bold">ISLAND ALLSTARS SPORTS CLUB</span> is a
          social, family, networking and physical fitness club, based in the
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
