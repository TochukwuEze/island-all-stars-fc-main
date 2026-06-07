import { MessageSquareText } from "lucide-react";

export function AboutSection() {
  return (
    <section className="relative w-full bg-[#001D3D] py-24 px-8 md:px-24">
      <div className="max-w-5xl">
        <p className="text-white text-2xl md:text-4xl font-medium leading-[1.4] opacity-90">
          The{" "}
          <span className="font-bold">Island AllStars Sports Club (IASC)</span>{" "}
          is the region&apos;s leading football academy and club provider for
          aspiring players and athletes at any stage of their journey,
          organizations, and communities looking to upskill and refine their
          sporting prowess in the ever-evolving world of professional football.
        </p>
      </div>

      {/* Floating Chat Icon */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#0056b3] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[60]">
        <MessageSquareText size={32} />
      </button>
    </section>
  );
}
