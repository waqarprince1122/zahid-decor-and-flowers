import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'
import { siteConfig } from '../data/siteConfig'
import { NavLink } from "react-router-dom";
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="h-px bg-gold-fade" />
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <NavLink
            to="/"
            aria-label="Zahid Decor & Flowers Home"
            className="flex items-center shrink-0 group"
          >
            <img
              src="/logo.png"
              alt="Zahid Decor & Flowers"
              className="
      h-16
      w-auto
      max-w-[240px]
      object-contain
      object-left
      transition-transform
      duration-300
      group-hover:scale-[1.03]
    "
            />
          </NavLink>
          <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
            Premium floral design and event decoration for weddings, Nikah
            ceremonies and celebrations across Lahore.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://wa.me/${siteConfig.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow !text-gold-light mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/about"
                className="hover:text-gold-light transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-gold-light transition-colors"
              >
                All Services
              </Link>
            </li>
            <li>
              <Link
                to="/services/flowers"
                className="hover:text-gold-light transition-colors"
              >
                Flower Services
              </Link>
            </li>
            <li>
              <Link
                to="/services/decoration"
                className="hover:text-gold-light transition-colors"
              >
                Decoration
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="hover:text-gold-light transition-colors"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </div>

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

        <div>
          <h4 className="eyebrow !text-gold-light mb-4">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-gold-light" />
              <span className="text-cream/70">{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <HiOutlinePhone className="shrink-0 text-gold-light" />
              <a
                href={`tel:+${siteConfig.phoneRaw}`}
                className="text-cream/70 hover:text-gold-light transition-colors"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <HiOutlineMail className="shrink-0 text-gold-light" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-cream/70 hover:text-gold-light transition-colors"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {year} Zahid Decor and Flowers. All rights reserved.</p>
          <p>Designed with care in Lahore, Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
