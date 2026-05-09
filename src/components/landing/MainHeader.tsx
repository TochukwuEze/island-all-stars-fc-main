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
import React, { useState } from "react";

import logo from "../../../public/images/logos/ifc-logo.png";

const navItems = [
  "Certifications",
  "About Us",
  "Gallery",
  "Events",
  "Membership",
  "Partners",
  "Blog",
];

const eventsDropdownItems = [
  { label: "Matches", href: "#" },
  { label: "Training", href: "#" },
  { label: "Players", href: "#" },
  { label: "Academy", href: "#" },
  { label: "Academy", href: "#" },
  { label: "Community Initiative", href: "#" },
];

export function MainHeader() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  return (
    <header className="w-full bg-white py-3 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex items-center">
        <Image
          src={logo}
          alt="Logo"
          width={250}
          height={200}
          className="h-12 md:h-14 w-auto aspect-auto object-contain"
        />
      </Link>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center gap-3 mr-4">
        <Button
          variant="default"
          className="bg-[#404040] hover:bg-primaryColor text-white rounded-none px-6 font-semibold tracking-wide h-12 cursor-pointer"
        >
          JOIN ISLAND FC
        </Button>
        <Button
          variant="default"
          className="bg-primaryColor hover:bg-[#404040] text-white rounded-none px-6 font-semibold tracking-wide h-12 cursor-pointer"
        >
          MEMBER PORTAL
        </Button>
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
                    key={item}
                    className="flex flex-col border-b border-zinc-100 pb-4 last:border-0 last:pb-0"
                  >
                    {item === "Events" ? (
                      <>
                        <button
                          onClick={() => setIsEventsOpen(!isEventsOpen)}
                          className="flex items-center justify-between text-lg font-bold text-[#2A2A2A] hover:text-primaryColor transition-colors w-full text-left"
                        >
                          {item}
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
                    ) : (
                      <Link
                        href="#"
                        className="text-lg font-bold text-[#2A2A2A] hover:text-primaryColor transition-colors block"
                      >
                        {item}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-6">
                <Button className="w-full bg-[#404040] hover:bg-primaryColor text-white rounded-none font-semibold tracking-wide h-12">
                  JOIN ISLAND FC
                </Button>
                <Button className="w-full bg-primaryColor hover:bg-[#404040] text-white rounded-none font-semibold tracking-wide h-12">
                  MEMBER PORTAL
                </Button>
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
