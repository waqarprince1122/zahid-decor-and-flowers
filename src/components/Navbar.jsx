import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi2";
import { siteConfig } from "../data/siteConfig";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const businessPhone = "+92 0309 1190761";
const businessPhoneRaw = "923091190761";

const whatsappNumber = "923091190761";

const whatsappMessage =
  "Hello Zahid Decor & Flowers, I would like to know more about your flower and decoration services.";

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

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
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 py-2.5 shadow-card backdrop-blur-md"
          : "bg-transparent py-3 sm:py-4 lg:py-5"
      }`}
    >
      <nav className="container-x flex min-h-[64px] w-full items-center justify-between gap-3 sm:min-h-[68px] lg:min-h-[72px]">
        {/* ================= LOGO ================= */}
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Zahid Decor & Flowers Home"
          className="flex min-w-0 shrink-0 items-center"
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
              block
              h-12
              w-auto
              max-w-[170px]
              object-contain
              object-left

              xs:h-[3.25rem]
              xs:max-w-[185px]

              sm:h-14
              sm:max-w-[200px]

              md:h-[3.6rem]
              md:max-w-[215px]

              lg:h-16
              lg:max-w-[235px]

              xl:h-[4.5rem]
              xl:max-w-[260px]
            "
          />
        </NavLink>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-9">
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
                  `relative whitespace-nowrap py-1 text-sm tracking-wide transition-colors duration-300
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
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <motion.a
            href={`tel:+${businessPhoneRaw}`}
            whileHover={{ y: -1 }}
            className="whitespace-nowrap text-sm text-charcoal/80 transition-colors hover:text-burgundy"
            aria-label={`Call Zahid Decor at ${businessPhone}`}
          >
            {businessPhone}
          </motion.a>

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
            className="btn-primary whitespace-nowrap !px-4 !py-2.5 text-sm xl:!px-5"
            aria-label="Chat with Zahid Decor on WhatsApp"
          >
            WhatsApp
          </motion.a>
        </div>

        {/* ================= MOBILE RIGHT SIDE (Call + Menu) ================= */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {/* Quick Call Button — always visible, opens phone dialer directly */}
          <motion.a
            href={`tel:+${businessPhoneRaw}`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-burgundy/20
              text-burgundy
              transition-colors
              duration-300
              hover:bg-burgundy
              hover:text-cream
            "
            aria-label={`Call Zahid Decor at ${businessPhone}`}
          >
            <HiOutlinePhone size={20} />
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-md
              text-burgundy
            "
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
                  <HiX size={27} />
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
                  <HiMenu size={27} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
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
            className="
              w-full
              overflow-hidden
              border-t
              border-charcoal/10
              bg-ivory/98
              backdrop-blur-md
              lg:hidden
            "
          >
            <ul className="container-x flex flex-col gap-1 py-3 sm:py-4">
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
                      `block border-b border-charcoal/5 py-3 text-base transition-all duration-300 ${
                        isActive
                          ? "pl-2 font-medium text-burgundy"
                          : "text-charcoal/80 hover:pl-2 hover:text-burgundy"
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
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-burgundy/20
                    px-4
                    py-3
                    text-center
                    text-burgundy
                    transition-all
                    duration-300
                    hover:bg-burgundy
                    hover:text-cream
                  "
                  aria-label={`Call Zahid Decor at ${businessPhone}`}
                >
                  <HiOutlinePhone size={18} />
                  {businessPhone}
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
                  className="btn-primary flex w-full justify-center"
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
