"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu, Mail, Phone, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../public/images/logos/iasf-logo.webp";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Training", href: "/training" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Membership", href: "/membership" },
  { label: "Business Hub", href: "/business-hub" },
  { label: "Blog", href: "/blog" },
];

const aboutDropdownItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Partners", href: "/partners" },
];

const eventsDropdownItems = [
  { label: "All Events", href: "/events" },
  { label: "Matches", href: "/matches" },
  { label: "Players", href: "/players" },
  { label: "Academy", href: "/accademy" },
  { label: "Community Initiative", href: "/community-initiative" },
  { label: "Contact", href: "/contact" },
];

export function MainHeader() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem("iasc_current_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const isLoggedIn = !!currentUser;

  const getUserInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="w-full bg-white py-2 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex flex-col items-center">
        <Image
          src={logo}
          alt="Logo"
          width={250}
          height={200}
          className="h-10 md:h-12 w-auto aspect-auto object-contain"
        />
        <span className="text-[10px] font-bold text-neutral-700">
          Island AllStars sports club
        </span>
      </Link>

      {/* Desktop Buttons / Profile */}
      <div className="hidden lg:flex items-center gap-3 mr-4">
        {isLoggedIn && currentUser ? (
          <Link href="/member-portal" className="flex items-center gap-3 group">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-[#001429]">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-bold text-primaryColor uppercase tracking-widest">
                {currentUser.membershipType === "Club Admin"
                  ? "Admin"
                  : `${currentUser.membershipType} Member`}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primaryColor to-[#001429] flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
              {getUserInitials(currentUser.name)}
            </div>
          </Link>
        ) : (
          <>
            <Link href="/join-ifc">
              <Button
                variant="default"
                className="bg-[#404040] hover:bg-primaryColor text-white rounded-none px-6 font-semibold tracking-wide h-12 cursor-pointer"
              >
                JOIN ISLAND FC
              </Button>
            </Link>
            <Link href="/member-portal">
              <Button
                variant="default"
                className="bg-primaryColor hover:bg-[#404040] text-white rounded-none px-6 font-semibold tracking-wide h-12 cursor-pointer"
              >
                MEMBER PORTAL
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex lg:hidden items-center">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent cursor-pointer!"
              />
            }
          >
            <Menu className="text-[#2A2A2A] size-7! cursor-pointer!" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:w-[400px] bg-white p-0 flex flex-col h-full border-l-0"
          >
            <SheetHeader className="p-6 border-b border-zinc-100 flex items-start justify-center h-20">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <Image
                src={logo}
                alt="Logo"
                width={150}
                height={100}
                className="h-10 w-auto object-contain"
              />
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col border-b border-zinc-100 pb-4 last:border-0 last:pb-0"
                  >
                    {item.label === "Events" ? (
                      <>
                        <button
                          onClick={() => setIsEventsOpen(!isEventsOpen)}
                          className="flex items-center justify-between text-lg font-bold text-[#2A2A2A] hover:text-primaryColor transition-colors w-full text-left"
                        >
                          {item.label}
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${isEventsOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${isEventsOpen ? "max-h-64 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                          <div className="flex flex-col gap-3 pl-4 border-l-2 border-primaryColor/20">
                            {eventsDropdownItems.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="text-[15px] font-semibold text-zinc-600 hover:text-primaryColor"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : item.label === "About" ? (
                      <>
                        <button
                          onClick={() => setIsAboutOpen(!isAboutOpen)}
                          className="flex items-center justify-between text-lg font-bold text-[#2A2A2A] hover:text-primaryColor transition-colors w-full text-left"
                        >
                          {item.label}
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${isAboutOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${isAboutOpen ? "max-h-64 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                        >
                          <div className="flex flex-col gap-3 pl-4 border-l-2 border-primaryColor/20">
                            {aboutDropdownItems.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="text-[15px] font-semibold text-zinc-600 hover:text-primaryColor"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-lg font-bold text-[#2A2A2A] hover:text-primaryColor transition-colors block"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-6">
                {isLoggedIn && currentUser ? (
                  <Link
                    href="/member-portal"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primaryColor to-[#001429] flex items-center justify-center text-white font-black text-lg">
                      {getUserInitials(currentUser.name)}
                    </div>
                    <div>
                      <p className="font-bold text-[#001429]">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                        {currentUser.membershipType === "Club Admin"
                          ? "Admin"
                          : `${currentUser.membershipType} Member`}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link href="/membership">
                      <Button className="w-full bg-[#404040] hover:bg-primaryColor text-white rounded-none font-semibold tracking-wide h-12">
                        JOIN ISLAND FC
                      </Button>
                    </Link>
                    <Link href="/member-portal">
                      <Button className="w-full bg-primaryColor hover:bg-[#404040] text-white rounded-none font-semibold tracking-wide h-12">
                        MEMBER PORTAL
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-auto pt-8 flex flex-col gap-4 text-sm font-medium text-zinc-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primaryColor/10 flex items-center justify-center">
                    <Mail size={16} className="text-primaryColor" />
                  </div>
                  <a href="mailto:info@islandfc.com.ng">info@islandfc.com.ng</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primaryColor/10 flex items-center justify-center">
                    <Phone size={16} className="text-primaryColor" />
                  </div>
                  <a
                    href="tel:+2348033253625"
                    className="font-bold text-[#2A2A2A]"
                  >
                    +2348033253625
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
