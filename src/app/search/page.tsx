import { getBusinesses } from "@/lib/businessStore";
import { getNewsItems } from "@/lib/newsStore";
import { getMembers } from "@/lib/membersStore";
import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { Search, Building2, User, FileText, ArrowRight } from "lucide-react";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const query = q.toLowerCase();

  // Fetch data
  const [businesses, news, members] = await Promise.all([
    getBusinesses(),
    getNewsItems(),
    getMembers(),
  ]);

  // Filter data
  const filteredBusinesses = businesses.filter(
    (b) =>
      b.name.toLowerCase().includes(query) ||
      b.description.toLowerCase().includes(query) ||
      b.owner.toLowerCase().includes(query)
  );

  const filteredNews = news.filter(
    (n) =>
      n.title.toLowerCase().includes(query) ||
      (n.description && n.description.toLowerCase().includes(query))
  );

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query) ||
      m.position.toLowerCase().includes(query)
  );

  const totalResults =
    filteredBusinesses.length + filteredNews.length + filteredMembers.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <TopBar />
      <MainHeader />
      <Navbar />

      <main className="flex-1">
        <section className="bg-white py-16 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1
              className={`text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-6 ${sofiaSansCondensed.className}`}
            >
              Search Results
            </h1>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center">
              <Search className="w-6 h-6 text-gray-400 mr-3" />
              <input
                type="text"
                defaultValue={q}
                readOnly
                className="w-full bg-transparent border-none outline-none text-xl text-gray-800"
              />
            </div>
            <p className="mt-4 text-gray-600">
              Found <span className="font-bold text-gray-900">{totalResults}</span> results for "{q}"
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-5xl py-12 space-y-16">
          {!query && (
            <div className="text-center py-20 text-gray-500">
              Please enter a search term to see results.
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">
                We couldn't find anything matching "{q}". Try adjusting your search term.
              </p>
            </div>
          )}

          {filteredNews.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" /> News & Articles ({filteredNews.length})
              </h2>
              <div className="grid gap-4">
                {filteredNews.map((newsItem) => (
                  <Link
                    key={newsItem.id}
                    href={`/blog/${newsItem.slug}`}
                    className="block bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-2">
                      {newsItem.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {newsItem.description || "No description available."}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                      Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredBusinesses.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-green-600" /> Businesses ({filteredBusinesses.length})
              </h2>
              <div className="grid gap-4">
                {filteredBusinesses.map((business) => (
                  <Link
                    key={business.name}
                    href={`/business-hub/${encodeURIComponent(business.name.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="block bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 mb-2">
                      {business.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{business.description}</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                        Owner: {business.owner}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {filteredMembers.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-purple-600" /> Members ({filteredMembers.length})
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                  <div
                    key={member.email}
                    className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl uppercase">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">
                        {member.role} • {member.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
