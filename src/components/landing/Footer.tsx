import Link from "next/link";

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
    <footer className="bg-[#001429] text-white pt-20 pb-8 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
          {/* Left Column: Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-8 text-[15px] text-gray-400">
            <div>
              <p>Italian School,Sikiru Alade-Oloko</p>
              <p>Crescent, Off Adebayo Doherty Street</p>
              <p>Lekki, Lagos</p>
            </div>
            <div>
              <a
                href="mailto:info@islandfc.com.ng"
                className="hover:text-primaryColor transition-colors block"
              >
                info@islandfc.com.ng
              </a>
              <a
                href="tel:+2348033253625"
                className="hover:text-primaryColor transition-colors block mt-1"
              >
                +2348033253625
              </a>
            </div>
          </div>

          {/* Middle Column: Links */}
          <div className="md:col-span-3 flex flex-col gap-5 text-[15px] font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors w-fit">
              Home
            </Link>
            <Link href="#" className="hover:text-white transition-colors w-fit">
              Training
            </Link>
            <Link href="#" className="hover:text-white transition-colors w-fit">
              About Us
            </Link>
            <Link href="#" className="hover:text-white transition-colors w-fit">
              Membership
            </Link>
            <Link href="#" className="hover:text-white transition-colors w-fit">
              Contact Us
            </Link>
          </div>

          {/* Right Column: Huge Heading and Text */}
          <div className="md:col-span-6 flex flex-col items-start md:items-end text-left md:text-right">
            <h2 className="text-4xl lg:text-[56px] leading-[1.1] font-bold uppercase tracking-tight mb-6 max-w-2xl">
              STAY CONNECTED TO THE
              <br />
              GAME WE LOVE
            </h2>
            <p className="text-[15px] text-gray-400 max-w-lg leading-relaxed">
              Be part of our growing football community. Follow updates, match
              highlights, and exclusive club news. Train harder, play smarter,
              and never miss a moment.
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
              href="https://www.instagram.com/ifclekki/"
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
