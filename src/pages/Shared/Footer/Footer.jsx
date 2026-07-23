import { Link } from "react-router";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "../../../componenets/Logo/Logo";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Coverage", to: "/coverage" },
  { label: "About Us", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { icon: FaLinkedinIn, href: "https://linkedin.com", bg: "bg-[#0A66C2]" },
  { icon: FaXTwitter, href: "https://x.com", bg: "bg-white text-black" },
  { icon: FaFacebookF, href: "https://facebook.com", bg: "bg-[#1877F2]" },
  { icon: FaYoutube, href: "https://youtube.com", bg: "bg-[#fff]" },
];

const Footer = () => {
  return (
    <footer className="bg-black rounded-xl py-12 mt-10 ">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Logo + name */}
        <Logo className={"text-white"} />

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mt-4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-700 max-w-7xl mx-auto mt-8" />

      {/* Nav links */}
      <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="text-gray-300 text-sm hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-700 max-w-7xl mx-auto" />

      {/* Social icons */}
      <div className="flex items-center justify-center gap-4 pt-6">
        {socialLinks.map(({ icon: Icon, href, bg }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-full flex items-center justify-center ${bg} hover:opacity-80 transition-opacity`}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
