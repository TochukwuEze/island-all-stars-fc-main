import { Search, PhoneIncoming, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

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
  { label: "Our Committees", href: "/committees" },
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

export function Navbar() {
  return (
    <nav className="w-full bg-[#2A2A2A] text-white px-6 h-12 hidden lg:flex items-center justify-between border-t-4 border-[#FAEC15]">
      <ul className="flex items-center h-full">
        {navItems.map((item, index) => (
          <li
            key={item.label}
            className="h-full flex items-center relative group"
          >
            <Link
              href={item.href}
              className="text-[13px] font-bold uppercase tracking-tight hover:text-primaryColor transition-colors px-5 flex items-center gap-1.5"
            >
              {item.label}
              {(item.label === "Events" || item.label === "About") && (
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              )}
            </Link>

            {item.label === "Events" && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] translate-y-4 group-hover:translate-y-0 overflow-hidden">
                <div className="h-1 bg-primaryColor w-full" />
                <ul className="flex flex-col py-1">
                  {eventsDropdownItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.href}
                        className="group/item flex items-center justify-between px-6 py-3 text-zinc-700 hover:text-primaryColor hover:bg-zinc-50 transition-all text-lg font-semibold border-l-0 hover:border-l-4 border-primaryColor"
                      >
                        <span>{subItem.label}</span>
                        <ChevronRight
                          size={14}
                          className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.label === "About" && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] translate-y-4 group-hover:translate-y-0 overflow-hidden">
                <div className="h-1 bg-primaryColor w-full" />
                <ul className="flex flex-col py-1">
                  {aboutDropdownItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.href}
                        className="group/item flex items-center justify-between px-6 py-3 text-zinc-700 hover:text-primaryColor hover:bg-zinc-50 transition-all text-lg font-semibold border-l-0 hover:border-l-4 border-primaryColor"
                      >
                        <span>{subItem.label}</span>
                        <ChevronRight
                          size={14}
                          className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {index < navItems.length - 1 && (
              <div className="h-4 w-[1px] bg-primaryColor" />
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-5 border-l border-white/20 pl-6 h-full">
        <Search
          size={20}
          className="cursor-pointer hover:text-primaryColor transition-colors"
        />
        <Link href="/contact">
          <PhoneIncoming
            size={20}
            className="cursor-pointer hover:text-primaryColor transition-colors"
          />
        </Link>
      </div>
    </nav>
  );
}
