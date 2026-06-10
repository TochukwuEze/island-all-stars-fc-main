import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { newsItems } from "@/data/news";
import { galleryItems } from "@/app/gallery/gallery-data";
import { Inter, Sofia_Sans_Condensed } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  const videoItem = galleryItems.find(
    (item) => item.id === slug && item.type === "video",
  );

  if (!article && !videoItem)
    return { title: "Article Not Found | Island Football Club" };

  return {
    title: `${article ? article.title : videoItem?.title} | Island Football Club`,
    description: article
      ? article.content.substring(0, 160) + "..."
      : videoItem?.description || videoItem?.title || "",
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);
  const videoItem = galleryItems.find(
    (item) => item.id === slug && item.type === "video",
  );

  if (!article && !videoItem) {
    notFound();
  }

  const title = article ? article.title : videoItem?.title;
  const category = article ? article.category : "VIDEO";
  const date = article ? article.date : videoItem?.year.toString();
  const comments = article ? article.comments : 0;
  const isVideo = !!videoItem;

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1 bg-black text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-gray-400 hover:text-[#2052DA] transition-colors mb-12 text-xs font-bold uppercase tracking-widest group ${inter.className}`}
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>{" "}
            Back to Home
          </Link>

          <header className="mb-12">
            <p className="text-[#2052DA] text-[12px] font-bold tracking-widest uppercase mb-4">
              {category}
            </p>

            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.1] mb-6 ${sofiaSansCondensed.className}`}
            >
              {title}
            </h1>

            <div className="flex items-center gap-2 text-gray-500 text-[11px] font-medium uppercase">
              <span>{date}</span>
              {!isVideo && (
                <>
                  <span className="w-1 h-1 bg-gray-700 rounded-full" />
                  <span>
                    {comments} {comments === 1 ? "Comment" : "Comments"}
                  </span>
                </>
              )}
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full mb-16 overflow-hidden bg-zinc-900 shadow-2xl">
            {isVideo ? (
              <iframe
                src={videoItem?.src}
                title={videoItem?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0 border-0"
              ></iframe>
            ) : (
              <Image
                src={article!.image}
                alt={article!.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            )}
          </div>

          {!isVideo && article ? (
            <article className="prose prose-invert prose-lg max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-300 leading-relaxed mb-6 font-light text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ) : videoItem?.description ? (
            <article className="prose prose-invert prose-lg max-w-none">
              <p
                className={`text-gray-300 leading-relaxed mb-6 font-normal text-lg ${inter.className}`}
              >
                {videoItem.description}
              </p>
            </article>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
