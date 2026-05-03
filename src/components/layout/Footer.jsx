import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Brands", path: "/brands" },
  { label: "About Us", path: "/about" },
  { label: "Visit Us", path: "/visit" },
  { label: "Contact Us", path: "/contact" },
];

const categories = [
  { label: "Fishing Rods", path: "/shop?cat=fishing-rods" },
  { label: "Fishing Reels", path: "/shop?cat=fishing-reels" },
  { label: "Diving Masks", path: "/shop?cat=diving-masks" },
  { label: "Wetsuits", path: "/shop?cat=wetsuits" },
  { label: "Fins", path: "/shop?cat=fins" },
  { label: "Spearfishing", path: "/shop?cat=spearfishing" },
];

const socials = [
  { Icon: FaFacebook, url: "https://facebook.com", color: "hover:bg-blue-600" },
  {
    Icon: FaInstagram,
    url: "https://instagram.com",
    color: "hover:bg-pink-600",
  },
  { Icon: FaYoutube, url: "https://youtube.com", color: "hover:bg-red-600" },
  { Icon: FaTiktok, url: "https://tiktok.com", color: "hover:bg-gray-700" },
  {
    Icon: FaWhatsapp,
    url: "https://wa.me/96170123456",
    color: "hover:bg-green-600",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A2342] text-gray-400">
      <div className="h-14 w-full bg-white" />
      {/* Main grid */}
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        style={{ padding: "clamp(40px, 6vw, 80px) clamp(16px, 5vw, 80px)" }}
      >
        {/* Brand info */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <span
              className="text-white text-[22px] font-black"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              DC <span className="text-[#FF6B35]">Fishing</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Your go-to store for professional fishing, spearfishing and diving
            equipment. Top brands, expert advice, fast delivery.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ Icon, url, color }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center ${color} transition-all duration-300 hover:scale-110`}
              >
                <Icon size={15} className="text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[#FF6B35] font-bold text-[13px] uppercase tracking-widest mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="hover:text-[#00B4D8] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-[#FF6B35] font-bold text-[13px] uppercase tracking-widest mb-5">
            Categories
          </h4>
          <ul className="space-y-2.5 text-sm">
            {categories.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="hover:text-[#00B4D8] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#FF6B35] font-bold text-[13px] uppercase tracking-widest mb-5">
            Contact Us
          </h4>
          <div className="space-y-4 text-sm">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 hover:text-[#00B4D8] transition-colors"
            >
              <MapPin size={15} className="text-[#00B4D8] shrink-0 mt-0.5" />
              <span>Dbayeh Highway, Marina Tower, Ground Floor, Lebanon</span>
            </a>
            <a
              href="tel:+9611234567"
              className="flex items-center gap-3 hover:text-[#00B4D8] transition-colors"
            >
              <Phone size={15} className="text-[#00B4D8] shrink-0" />
              <span>+961 1 234 567</span>
            </a>
            <a
              href="https://wa.me/96170123456"
              className="flex items-center gap-3 hover:text-[#00B4D8] transition-colors"
            >
              <FaWhatsapp size={15} className="text-[#00B4D8] shrink-0" />
              <span>+961 70 123 456</span>
            </a>
            <a
              href="mailto:info@dcfishing.com"
              className="flex items-center gap-3 hover:text-[#00B4D8] transition-colors"
            >
              <Mail size={15} className="text-[#00B4D8] shrink-0" />
              <span>info@dcfishing.com</span>
            </a>
            <div className="pt-1 p-3 bg-white/5 rounded-xl">
              <p className="text-[#00B4D8] font-semibold text-xs mb-1">
                Store Hours
              </p>
              <p className="text-xs">Mon–Sat: 9am – 7pm</p>
              <p className="text-xs">Sun: 10am – 3pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div
          className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500"
          style={{ padding: "clamp(20px, 3vw, 32px) clamp(16px, 5vw, 80px)" }}
        >
          <p>
            © {new Date().getFullYear()} DC Fishing Store. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-[#00B4D8] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-[#00B4D8] transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-[#00B4D8] transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
