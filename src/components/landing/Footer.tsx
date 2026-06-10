import Image from "next/image";
import Link from "next/link";
import { Inter, Sofia_Sans_Condensed } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
});

import logo from "../../../public/images/logos/iasf-logo.webp";

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  return (
    <footer className={`bg-[#001429] text-white pt-20 pb-8 px-6 lg:px-16 ${inter.className}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
          {/* Left Column: Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-8 text-[15px] text-gray-400">
            <div className="items-start">
              <Image
                src={logo}
                alt="Logo"
                width={250}
                height={200}
                className="h-12 md:h-14 w-auto aspect-auto object-contain"
              />
            </div>
            <div>
              <p>Lagos Business School</p>
              <p>KM 22, Lekki-Epe Expressway, Ajah, Lagos, Nigeria</p>
            </div>
            <div>
              <a
                href="mailto:islandallstarssc@gmail.com"
                className="hover:text-primaryColor transition-colors block"
              >
                islandallstarssc@gmail.com
              </a>
              <a
                href="tel:+2349155172547"
                className="hover:text-primaryColor transition-colors block mt-1"
              >
                +2349155172547
              </a>
            </div>
          </div>

          {/* Middle Column: Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-[15px] font-medium text-gray-300">
            <div className="flex flex-col gap-5">
              <Link href="/" className="hover:text-white transition-colors w-fit">Home</Link>
              <Link href="/training" className="hover:text-white transition-colors w-fit">Training</Link>
              <Link href="/about-us" className="hover:text-white transition-colors w-fit">About Us</Link>
              <Link href="/committees" className="hover:text-white transition-colors w-fit">Our Committees</Link>
              <Link href="/membership" className="hover:text-white transition-colors w-fit">Membership</Link>
              <Link href="/contact" className="hover:text-white transition-colors w-fit">Contact Us</Link>
            </div>
            <div className="flex flex-col gap-5">
              <Link href="/gallery" className="hover:text-white transition-colors w-fit">Gallery</Link>
              <Link href="/events" className="hover:text-white transition-colors w-fit">Events</Link>
              <Link href="/business-hub" className="hover:text-white transition-colors w-fit">Business Hub</Link>
              <Link href="/activities" className="hover:text-white transition-colors w-fit">Activities</Link>
              <Link href="/blog" className="hover:text-white transition-colors w-fit">Blog</Link>
            </div>
          </div>

          {/* Right Column: Huge Heading and Text */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end text-left md:text-right">
            <h2 className={`text-4xl lg:text-[56px] leading-[1.1] font-bold uppercase tracking-tight mb-6 max-w-2xl ${sofiaSansCondensed.className}`}>
              STAY CONNECTED TO THE
              <br />
              GAME WE LOVE
            </h2>
            <p className="text-[15px] text-gray-400 max-w-lg leading-relaxed">
              ISLAND ALLSTARS SPORTS CLUB is a non-religious, non-tribal and non-ethnic, social and fraternal organisation brought together by our love for sports and knitted as one indivisible family. Together we do great things.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
            >
              <TwitterIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/islandallstarssportsclublagos/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            © Island Football Club. {new Date().getFullYear()}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
