import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma";
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

  const article = await prisma.blogItem.findUnique({
    where: { slug },
  });

  if (!article) return { title: "Blog Post Not Found | Island Football Club" };

  return {
    title: `${article.title} | Island Football Club`,
    description: article.excerpt || article.content.substring(0, 160) + "...",
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await prisma.blogItem.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  const title = article.title;
  const category = article.category;
  const date = article.date;
  const comments = article.comments;
  const isVideo = !!article.videoUrl;

  let embedUrl = "";
  if (article.videoUrl) {
    const videoIdMatch = article.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      embedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    } else {
      embedUrl = article.videoUrl;
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1 bg-black text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-gray-400 hover:text-[#2052DA] transition-colors mb-12 text-xs font-bold uppercase tracking-widest group ${inter.className}`}
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>{" "}
            Back to Blog
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
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0 border-0"
              ></iframe>
            ) : (
              article.image && (
                <Image
                  src={article.image}
                  alt={article.title || "Blog Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              )
            )}
          </div>

          {!isVideo && article.content ? (
            <article className="prose prose-invert prose-lg max-w-none text-gray-300 font-light">
              {article.content.includes('<p>') || article.content.includes('<h') || article.content.includes('<ul') || article.content.includes('<ol') ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                article.content.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))
              )}
            </article>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
