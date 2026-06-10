"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  MessageCircle,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});

const blogPosts = [
  {
    id: 1,
    slug: "ways-to-improve-communication-on-the-soccer-field",
    title: "WAYS TO IMPROVE COMMUNICATION ON THE SOCCER FIELD",
    category: "CLUB NEWS",
    date: "May 2, 2025",
    comments: 3,
    excerpt:
      "Effective communication on the soccer field is the backbone of successful teamwork. Whether you are directing a teammate, calling for the ball, or alerting your defence, clear and decisive communication can change the outcome of a match.",
    image: "/images/news/rivalries.png",
  },
  {
    id: 2,
    slug: "what-makes-a-great-football-coach-stand-out",
    title: "WHAT MAKES A GREAT FOOTBALL COACH STAND OUT",
    category: "TRAINING",
    date: "Apr 28, 2025",
    comments: 5,
    excerpt:
      "Great football coaches possess a unique blend of tactical knowledge, motivational skill, and emotional intelligence. They know how to read players, adapt strategies mid-game, and inspire a winning mentality that extends beyond the pitch.",
    image: "/images/news/injuries.png",
  },
  {
    id: 3,
    slug: "tips-for-balancing-career-and-club-commitments",
    title: "TIPS FOR BALANCING CAREER AND CLUB COMMITMENTS",
    category: "WELLNESS & FITNESS",
    date: "Apr 15, 2025",
    comments: 0,
    excerpt:
      "Juggling professional work obligations with a rigorous sporting schedule is one of the most common challenges adult athletes face. With smart time management and the right support, it is entirely possible to thrive in both arenas.",
    image: "/images/news/grassroots.png",
  },
  {
    id: 4,
    slug: "innovative-technology-shaping-football-training-today",
    title: "INNOVATIVE TECHNOLOGY SHAPING FOOTBALL TRAINING TODAY",
    category: "FOOTBALL NEWS",
    date: "Apr 10, 2025",
    comments: 8,
    excerpt:
      "From GPS tracking vests to AI-powered video analysis platforms, technology is revolutionising the way footballers train and coaches strategise. Modern football is as much a science as it is an art form.",
    image: "/images/news/unites.png",
  },
  {
    id: 5,
    slug: "the-psychology-behind-penalty-shootouts-in-soccer",
    title: "THE PSYCHOLOGY BEHIND PENALTY SHOOTOUTS IN SOCCER",
    category: "FOOTBALL NEWS",
    date: "Mar 30, 2025",
    comments: 12,
    excerpt:
      "Penalty shootouts are as much a mental battle as a physical one. Understanding the psychology of pressure, focus, and confidence can be the deciding factor between victory and heartbreak when everything is on the line.",
    image: "/images/news/rivalries.png",
  },
  {
    id: 6,
    slug: "how-nutrition-impacts-veteran-athlete-performance",
    title: "HOW NUTRITION IMPACTS VETERAN ATHLETE PERFORMANCE",
    category: "WELLNESS & FITNESS",
    date: "Mar 18, 2025",
    comments: 2,
    excerpt:
      "An adult player's diet directly influences their speed, stamina, and recovery. Proper nutrition — from pre-match meals to post-training hydration — is the foundation of peak athletic performance on and off the field.",
    image: "/images/news/injuries.png",
  },
];

const categories = [
  { name: "Club News", count: 8 },
  { name: "Football News", count: 14 },
  { name: "Activities", count: 6 },
  { name: "Wellness & Fitness", count: 4 },
  { name: "Matches", count: 10 },
  { name: "Community", count: 3 },
];

const recentPosts = [
  {
    title: "Ways to improve communication on the soccer field",
    date: "May 2, 2025",
    image: "/images/news/rivalries.png",
    slug: "ways-to-improve-communication-on-the-soccer-field",
  },
  {
    title: "What makes a great football coach stand out",
    date: "Apr 28, 2025",
    image: "/images/news/injuries.png",
    slug: "what-makes-a-great-football-coach-stand-out",
  },
  {
    title: "Tips for balancing career and club commitments",
    date: "Apr 15, 2025",
    image: "/images/news/grassroots.png",
    slug: "tips-for-balancing-career-and-club-commitments",
  },
];

const POSTS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === null ||
      post.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const totalFilteredPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );

  const handleCategoryClick = (name: string) => {
    setActiveCategory((prev) => (prev === name ? null : name));
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl md:text-4xl font-black uppercase tracking-widest text-[#1a1a1a] ${sofiaSansCondensed.className}`}>
            BLOG{" "}
            <span className="relative inline-block">
              <span className="relative z-10">— STANDARD</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col divide-y divide-zinc-100">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group py-10 first:pt-0 last:pb-0"
                >
                  {/* Thumbnail */}
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-100 mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      {/* Category badge */}
                      <span className="absolute top-4 left-0 bg-primaryColor text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={12} />
                      {post.comments}{" "}
                      {post.comments === 1 ? "Comment" : "Comments"}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl md:text-2xl font-black uppercase leading-snug tracking-tight text-[#1a1a1a] group-hover:text-primaryColor transition-colors duration-300 mb-4">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-zinc-500 text-[15px] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primaryColor border border-primaryColor px-5 py-2.5 hover:bg-primaryColor hover:text-white transition-all duration-300"
                  >
                    Read More <ChevronRight size={14} />
                  </Link>
                </article>
              ))}

              {paginatedPosts.length === 0 && (
                <div className="py-20 text-center text-zinc-400">
                  No posts found matching your search.
                </div>
              )}
            </div>

            {/* ── Pagination ── */}
            {totalFilteredPages > 1 && (
              <div className="mt-12 flex items-center gap-2 border-t border-zinc-100 pt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-zinc-200 text-zinc-500 hover:border-primaryColor hover:text-primaryColor disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from(
                  { length: totalFilteredPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-bold border transition-all ${
                      currentPage === page
                        ? "bg-primaryColor text-white border-primaryColor"
                        : "border-zinc-200 text-zinc-500 hover:border-primaryColor hover:text-primaryColor"
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalFilteredPages, p + 1))
                  }
                  disabled={currentPage === totalFilteredPages}
                  className="w-10 h-10 flex items-center justify-center border border-zinc-200 text-zinc-500 hover:border-primaryColor hover:text-primaryColor disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-10">
            {/* Search */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-800 mb-4 pb-3 border-b-2 border-primaryColor inline-block pr-6">
                Search
              </h3>
              <div className="relative mt-4">
                <input
                  type="text"
                  id="blog-search"
                  placeholder="Search posts…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full border border-zinc-200 bg-zinc-50 text-sm text-zinc-700 placeholder-zinc-400 px-4 pr-12 py-3 focus:outline-none focus:border-primaryColor transition-colors"
                />
                <button
                  className="absolute right-0 top-0 h-full w-12 bg-primaryColor flex items-center justify-center text-white hover:bg-[#0d58a0] transition-colors"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-800 mb-4 pb-3 border-b-2 border-primaryColor inline-block pr-6">
                Categories
              </h3>
              <ul className="mt-4 space-y-1">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-all group/cat ${
                        activeCategory === cat.name
                          ? "bg-primaryColor text-white"
                          : "text-zinc-600 hover:text-primaryColor hover:bg-zinc-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight
                          size={12}
                          className={`transition-transform ${
                            activeCategory === cat.name ? "rotate-90" : ""
                          }`}
                        />
                        {cat.name}
                      </span>
                      <span
                        className={`text-xs font-black ${
                          activeCategory === cat.name
                            ? "text-white/80"
                            : "text-zinc-400"
                        }`}
                      >
                        ({cat.count})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-800 mb-4 pb-3 border-b-2 border-primaryColor inline-block pr-6">
                Recent Posts
              </h3>
              <div className="mt-4 space-y-5">
                {recentPosts.map((post, idx) => (
                  <Link
                    key={idx}
                    href={`/blog/${post.slug}`}
                    className="flex gap-4 group/recent"
                  >
                    <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-zinc-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/recent:scale-110"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-zinc-700 leading-snug line-clamp-2 group-hover/recent:text-primaryColor transition-colors">
                        {post.title}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-1.5 flex items-center gap-1">
                        <Calendar size={10} />
                        {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
