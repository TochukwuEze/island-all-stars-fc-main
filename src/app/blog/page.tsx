import type { Metadata } from "next";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogPage from "@/components/blog/BlogPage";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});

export const metadata: Metadata = {
  title: "Blog | Island Allstars Sports Club",
  description:
    "Read the latest news, match updates, wellness tips, and club stories from Island Allstars Sports Club — Lagos.",
};

/* ✨✨✨✨✨✨✨✨✨✨✨ Page Hero / Breadcrumb ✨✨✨✨✨✨✨✨✨✨✨ */
function BlogHero() {
  return (
    <div className="relative w-full bg-[#1a1a1a] py-16 md:py-20 overflow-hidden">
      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primaryColor" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-primaryColor text-[10px] font-black uppercase tracking-[0.4em] mb-2">
            Island Allstars Sports Club
          </p>
          <h1 className={`text-white text-3xl md:text-4xl font-black uppercase tracking-tight ${sofiaSansCondensed.className}`}>
            Blog
          </h1>
        </div>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          <a href="/" className="hover:text-primaryColor transition-colors">
            Home
          </a>
          <span className="text-zinc-600">/</span>
          <span className="text-white">Blog</span>
        </nav>
      </div>
    </div>
  );
}

export default function BlogRoute() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <BlogHero />
        <BlogPage />
      </main>
      <Footer />
    </div>
  );
}
