import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import { products } from "../../../data/products";

const easeLux = [0.16, 1, 0.3, 1];
const ROTATE_MS = 3500;

export default function Hero() {
  const hasProducts = Array.isArray(products) && products.length > 0;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hasProducts || products.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % products.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [hasProducts]);

  const primary = hasProducts ? products[index % products.length] : null;
  const secondary =
    hasProducts && products.length > 1
      ? products[(index + 1) % products.length]
      : primary;

  const primarySrc = primary?.image || "/heroimg2.png";
  const secondarySrc = secondary?.image || "/heroimg1.png";

  const primaryAlt = primary?.name
    ? `${primary.name} – Fresh Flowers Lahore by Zahid Decor and Flowers`
    : "Fresh flower bouquet by Zahid Decor and Flowers in Lahore";

  const secondaryAlt = secondary?.name
    ? `${secondary.name} – Wedding Flowers Lahore by Zahid Decor and Flowers`
    : "Elegant wedding floral decoration by Zahid Decor and Flowers";

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-ivory to-ivory pt-32 pb-16 sm:pt-36 sm:pb-24 lg:pt-25 lg:pb-5"
    >
      {/* Ambient Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-40 h-[26rem] w-[26rem] rounded-full bg-rose/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ================= TEXT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: easeLux,
          }}
          className="relative z-10 lg:col-span-6"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="eyebrow mb-5"
          >
            Lahore&rsquo;s Bespoke Flower Shop &amp; Decor Studio
          </motion.p>

          {/* Main Heading */}
          <h1
            id="hero-title"
            className="max-w-2xl text-4xl font-semibold leading-[1.1] text-charcoal text-balance sm:text-5xl md:text-[3.4rem] lg:text-[3.5rem] xl:text-[3.8rem]"
          >
            Beautiful Flowers &amp; Decor,
            <span className="mt-2 block italic text-burgundy">
              Composed with Intention
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-soft/90 sm:text-lg"
          >
            As a trusted Flower Shop Lahore turns to, we bring Fresh Flowers,
            Wedding Flowers, birthday bouquets and full event decor to every
            celebration — with Same Day Flower Delivery Lahore-wide.
          </motion.p>

          {/* Service Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.38,
            }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal-soft/80"
          >
            <span>✦ Fresh Flowers Lahore</span>
            <span>✦ Wedding &amp; Birthday Flowers</span>
            <span>✦ Same Day Delivery</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.48,
            }}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
          >
            {/* Contact Us */}
            <motion.div
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                Contact Us
                <HiArrowUpRight />
              </Link>
            </motion.div>

            {/* Explore Services */}
            <motion.div
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/services"
                className="btn-outline flex w-full items-center justify-center sm:w-auto"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.65,
            }}
            className="mt-10 flex items-center gap-5 sm:mt-12 sm:gap-8"
          >
            <div>
              <p className="font-display text-2xl text-burgundy">500+</p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-charcoal-soft/70 sm:text-xs sm:tracking-widest">
                Events Styled
              </p>
            </div>

            <div aria-hidden="true" className="h-10 w-px bg-charcoal/15" />

            <div>
              <p className="font-display text-2xl text-burgundy">4.9/5</p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-charcoal-soft/70 sm:text-xs sm:tracking-widest">
                Client Rating
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= IMAGE COMPOSITION ================= */}
        <div className="relative h-[430px] sm:h-[500px] lg:col-span-6 lg:h-[560px]">
          {/* Lahore Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.1,
            }}
            className="absolute -left-2 top-1/2 z-20 hidden origin-left -translate-y-1/2 -rotate-90 items-center gap-3 sm:flex"
          >
            <span aria-hidden="true" className="h-px w-10 bg-gold" />

            <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.35em] text-gold-dark">
              Lahore, Pakistan
            </span>
          </motion.div>

          {/* Primary Flower Image */}
          <motion.div
            initial={{
              opacity: 0,
              y: -250,
              scale: 0.85,
              rotate: -6,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: -2,
            }}
            transition={{
              duration: 1.1,
              delay: 0.2,
              ease: easeLux,
            }}
            className="absolute right-0 top-0 z-10 w-[76%] sm:w-[68%]"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
              className="relative h-[270px] w-full overflow-hidden rounded-[1.5rem] border-4 border-white shadow-soft sm:h-[340px] sm:rounded-[1.75rem] sm:border-8 lg:h-[400px]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={primary?.id ?? "primary-static"}
                  src={primarySrc}
                  alt={primaryAlt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Secondary Wedding Decoration Image */}
          <motion.div
            initial={{
              opacity: 0,
              y: -220,
              scale: 0.85,
              rotate: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 4,
            }}
            transition={{
              duration: 1.1,
              delay: 0.55,
              ease: easeLux,
            }}
            className="absolute bottom-0 left-0 z-20 w-[66%] sm:w-[56%]"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.7,
              }}
              className="relative h-[210px] w-full overflow-hidden rounded-[1.25rem] border-4 border-white shadow-soft sm:h-[260px] sm:rounded-[1.5rem] sm:border-8 lg:h-[300px]"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={secondary?.id ?? "secondary-static"}
                  src={secondarySrc}
                  alt={secondaryAlt}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Fresh Daily Badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 1.3,
              ease: easeLux,
            }}
            className="absolute -top-2 left-2 z-30 hidden sm:left-8 sm:block"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-burgundy px-2 text-center text-cream shadow-soft"
            >
              <span className="font-display text-sm italic leading-tight">
                Fresh
                <br />
                Daily
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
