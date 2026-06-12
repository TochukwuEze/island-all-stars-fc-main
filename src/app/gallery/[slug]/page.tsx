import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getGalleryItems } from "@/lib/galleryStore";
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
  const galleryItems = await getGalleryItems();
  const videoItem = galleryItems.find(
    (item) => item.id === slug && item.type === "video",
  );

  if (!videoItem)
    return { title: "Video Not Found | Island Football Club" };

  return {
    title: `${videoItem.title} | Island Football Club`,
    description: videoItem.description || videoItem.title || "",
  };
}

export default async function GalleryVideoPage({ params }: PageProps) {
  const { slug } = await params;
  const galleryItems = await getGalleryItems();
  const videoItem = galleryItems.find(
    (item) => item.id === slug && item.type === "video",
  );

  if (!videoItem) {
    notFound();
  }

  const title = videoItem.title;
  const category = videoItem.category || "VIDEO";
  const date = videoItem.year.toString();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1 bg-black text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/gallery"
            className={`inline-flex items-center gap-2 text-gray-400 hover:text-[#2052DA] transition-colors mb-12 text-xs font-bold uppercase tracking-widest group ${inter.className}`}
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>{" "}
            Back to Gallery
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
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full mb-16 overflow-hidden bg-zinc-900 shadow-2xl">
            <iframe
              src={videoItem.src}
              title={videoItem.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full absolute inset-0 border-0"
            ></iframe>
          </div>

          {videoItem.description ? (
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
