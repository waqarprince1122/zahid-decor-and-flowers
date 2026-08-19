import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { siteConfig } from "../data/siteConfig";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

// Business phone number
const businessPhone = "+92 0309 1190761";
const businessPhoneRaw = "923091190761";

// WhatsApp number
const whatsappNumber = "923091190761";

// WhatsApp pre-filled message
const whatsappMessage =
  "Hello Zahid Decor & Flowers, I would like to know more about your flower and decoration services.";

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        {/* ================= LOGO ================= */}
        {/* ================= LOGO ================= */}
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Zahid Decor & Flowers Home"
          className="flex items-center shrink-0 group"
        >
          <motion.img
            src="/logo.png"
            alt="Zahid Decor & Flowers"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
      h-14
      w-auto
      max-w-[230px]
      object-contain
      object-center
      sm:h-15
      sm:max-w-[250px]
      md:h-16
      md:max-w-[270px]
      lg:h-[68px]
      lg:max-w-[290px]
      transition-all
      duration-300
    "
          />
        </NavLink>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <ul className="hidden lg:flex items-center gap-9">
          {links.map((link, index) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + index * 0.07,
                duration: 0.4,
              }}
            >
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative py-1 text-sm tracking-wide transition-colors duration-300
                  after:absolute after:-bottom-1 after:left-0 after:h-[1.5px]
                  after:bg-gold after:transition-all after:duration-300 ${
                    isActive
                      ? "text-burgundy after:w-full"
                      : "text-charcoal/80 hover:text-burgundy after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* ================= DESKTOP RIGHT SIDE ================= */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Phone Number */}
          <motion.a
            href={`tel:+${businessPhoneRaw}`}
            whileHover={{ y: -1 }}
            className="text-sm text-charcoal/80 hover:text-burgundy transition-colors"
            aria-label={`Call Zahid Decor at ${businessPhone}`}
          >
            {businessPhone}
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="btn-primary !py-2.5 !px-5 text-sm"
            aria-label="Chat with Zahid Decor on WhatsApp"
          >
            WhatsApp
          </motion.a>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="lg:hidden text-burgundy p-1"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{
                  rotate: -90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="block"
              >
                <HiX size={28} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{
                  rotate: 90,
                  opacity: 0,
                }}
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  rotate: -90,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="block"
              >
                <HiMenu size={28} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* ================= MOBILE NAVIGATION ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:hidden overflow-hidden bg-ivory/98 backdrop-blur-md border-t border-charcoal/10"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {/* Navigation Links */}
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.05 * i,
                    duration: 0.3,
                  }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-base border-b border-charcoal/5 transition-all duration-300 ${
                        isActive
                          ? "text-burgundy font-medium pl-2"
                          : "text-charcoal/80 hover:text-burgundy hover:pl-2"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}

              {/* Mobile Phone */}
              <motion.li
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.35,
                }}
                className="pt-4"
              >
                <a
                  href={`tel:+${businessPhoneRaw}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-md border border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-cream transition-all duration-300"
                  aria-label={`Call Zahid Decor at ${businessPhone}`}
                >
                  📞 {businessPhone}
                </a>
              </motion.li>

              {/* Mobile WhatsApp */}
              <motion.li
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.35,
                }}
                className="pt-2"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                  aria-label="Chat with Zahid Decor on WhatsApp"
                >
                  WhatsApp
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
