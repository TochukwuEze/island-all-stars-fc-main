"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight, FileText, Calendar, Users, Trophy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define some quick links for the search
const quickLinks = [
  { title: "Upcoming Matches", href: "/matches", icon: Trophy, category: "Events" },
  { title: "Join the Club", href: "/membership", icon: Users, category: "Membership" },
  { title: "Our History", href: "/about-us", icon: FileText, category: "About" },
  { title: "Latest News", href: "/blog", icon: Calendar, category: "Media" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // If we had a global open function we'd call it here
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <form onSubmit={handleSearch} className="relative border-b border-gray-100 flex items-center">
              <Search className="absolute left-6 text-gray-400" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search events, news, members..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-6 pl-16 pr-16 text-xl text-gray-900 bg-transparent outline-none placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </form>

            <div className="p-6 bg-gray-50/50">
              {query ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Press <kbd className="px-2 py-1 bg-white border border-gray-200 rounded-md text-sm font-mono text-gray-900 mx-1">Enter</kbd> to search for "{query}"
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Quick Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-primaryColor hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primaryColor/10 transition-colors">
                            <link.icon size={18} className="text-gray-400 group-hover:text-primaryColor transition-colors" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primaryColor transition-colors text-sm">{link.title}</p>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mt-0.5">{link.category}</p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <span>Navigate with</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm text-[10px]">↓</kbd>
              </div>
              <div className="flex items-center gap-2">
                <span>Close with</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm text-[10px]">ESC</kbd>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
