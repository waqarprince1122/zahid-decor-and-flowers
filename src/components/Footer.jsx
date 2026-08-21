import { Link, NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaGoogle,
  FaTiktok,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { siteConfig } from "../data/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Top Divider */}
      <div className="h-px bg-gold-fade" />

      {/* Main Footer */}
      <div className="container-x grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <NavLink
            to="/"
            aria-label="Zahid Decor & Flowers Home"
            className="group flex shrink-0 items-center"
          >
            <img
              src="/logo.png"
              alt="Zahid Decor & Flowers"
              className="h-16 w-auto max-w-[240px] object-contain object-left transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </NavLink>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Premium floral design and event decoration for weddings, Nikah
            ceremonies and celebrations across Lahore.
          </p>

          {/* Social Media */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/zahiddecorflowers"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
            >
              <FaInstagram />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61593749303889"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
            >
              <FaFacebookF />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@saim.zahid.88"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
            >
              <FaTiktok />
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
            >
              <FaWhatsapp />
            </a>

            {/* Google Reviews */}
            <a
              href="https://g.page/r/CfER_yzCXwhmEBE/review"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Reviews"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
            >
              <FaGoogle />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="eyebrow !text-gold-light mb-4">Explore</h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/about"
                className="transition-colors hover:text-gold-light"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="transition-colors hover:text-gold-light"
              >
                All Services
              </Link>
            </li>

            <li>
              <Link
                to="/services/flowers"
                className="transition-colors hover:text-gold-light"
              >
                Flower Services
              </Link>
            </li>

            <li>
              <Link
                to="/services/decoration"
                className="transition-colors hover:text-gold-light"
              >
                Decoration
              </Link>
            </li>

            <li>
              <Link
                to="/gallery"
                className="transition-colors hover:text-gold-light"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="eyebrow !text-gold-light mb-4">Services</h4>

          <ul className="space-y-3 text-sm">
            <li className="text-cream/70">Wedding Decoration</li>
            <li className="text-cream/70">Nikah Decoration</li>
            <li className="text-cream/70">Bridal Flowers</li>
            <li className="text-cream/70">Birthday Decoration</li>
            <li className="text-cream/70">Surprise Delivery</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="eyebrow !text-gold-light mb-4">Contact</h4>

          <ul className="space-y-4 text-sm">
            {/* Address */}
            <li className="flex items-start gap-3">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-gold-light" />

              <span className="text-cream/70">{siteConfig.address}</span>
            </li>

            {/* Phone */}
            <li className="flex items-center gap-3">
              <HiOutlinePhone className="shrink-0 text-gold-light" />

              <a
                href={`tel:+${siteConfig.phoneRaw}`}
                className="text-cream/70 transition-colors hover:text-gold-light"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <HiOutlineMail className="shrink-0 text-gold-light" />

              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-cream/70 transition-colors hover:text-gold-light"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-5 py-6 text-xs text-cream/50 sm:flex-row">
          {/* Copyright */}
          <p className="text-center sm:text-left">
            © {year} Zahid Decor and Flowers. All rights reserved.
          </p>

          {/* Enterloops Branding */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            <span className="text-cream/50">Designed by</span>

            <a
              href="https://www.enterloops.com/en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Enterloops"
              className="group inline-flex items-center transition-opacity duration-300 hover:opacity-90"
            >
              <img
                src="/logo2.png"
                alt="Enterloops"
                className="h-7 w-auto max-w-[110px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </a>
            <span className="text-cream/50">
              <a
                href="https://www.enterloops.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light transition-colors"
              >
                Enterloops
              </a>{" "}
              in Lahore, Pakistan.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
