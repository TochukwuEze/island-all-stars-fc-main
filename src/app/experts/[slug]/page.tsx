// src/app/experts/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getExpertBySlug, type Expert } from "../../../lib/expertsData";
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
  const expert = getExpertBySlug(slug);
  if (!expert) return { title: "Expert Not Found | Island Football Club" };
  return { title: `${expert.name} – ${expert.role} | Island Football Club` };
}

export default async function ExpertPage({ params }: PageProps) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) notFound();

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
              ←
            </span>{" "}
            Back to Home
          </Link>
          <header className="mb-12">
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.1] mb-6 ${sofiaSansCondensed.className}`}
            >
              {expert.name}
            </h1>
            <p className="text-[#2052DA] text-[12px] font-bold tracking-widest uppercase mb-4">
              {expert.role}
            </p>
          </header>
          <div className="relative aspect-[4/5] w-[50%] mb-8 overflow-hidden bg-gray-100 mx-auto">
            <Image
              src={expert.image}
              alt={expert.name}
              fill
              className="object-cover"
            />
          </div>
          {expert.description && (
            <section className="prose prose-invert prose-lg max-w-none">
              <p>{expert.description}</p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
