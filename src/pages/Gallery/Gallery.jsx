import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "../../components/Lightbox";
import CTA from "../../components/CTA";
import { galleryItems } from "../../data/gallery";

const easeLux = [0.16, 1, 0.3, 1];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (id) => {
    const index = galleryItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % galleryItems.length,
    );
  };

  const prevImage = () => {
    setActiveIndex((current) =>
      current === null
        ? 0
        : (current - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  // Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeIndex === null) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-ivory pt-32 pb-14 sm:pt-40 sm:pb-20">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-rose/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLux }}
            className="eyebrow mb-4"
          >
            Our Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: easeLux,
            }}
            className="text-balance font-display text-4xl font-semibold leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
          >
            Gallery of Moments We&apos;ve Styled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.18,
              ease: easeLux,
            }}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal-soft/80 sm:text-base"
          >
            Explore our collection of weddings, Nikah ceremonies, bouquets,
            birthdays and beautifully styled events.
          </motion.p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="bg-ivory pb-20 sm:pb-28">
        <div className="container-x">
          {/* IMAGE COUNT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex items-center justify-between"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal-soft/60">
              All Collection
            </p>

            <p className="text-xs text-charcoal-soft/60">
              {galleryItems.length}{" "}
              {galleryItems.length === 1 ? "Image" : "Images"}
            </p>
          </motion.div>

          {/* MASONRY GRID */}
          <div className="columns-2 gap-3 sm:columns-2 sm:gap-5 md:columns-3 lg:columns-4 xl:columns-5">
            {galleryItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.45,
                  delay: (index % 8) * 0.045,
                  ease: easeLux,
                }}
                onClick={() => openLightbox(item.id)}
                className="group relative mb-3 block w-full overflow-hidden rounded-xl bg-cream break-inside-avoid shadow-card ring-1 ring-charcoal/5 transition-shadow duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy sm:mb-5 sm:rounded-2xl"
                aria-label={`View ${item.title}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                {/* Content */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-3 text-left opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                  <p className="line-clamp-2 text-sm font-medium text-cream">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold-light">
                    {item.category}
                  </p>
                </div>

                {/* Hover icon */}
                <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-burgundy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-lg">↗</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <CTA />

      {/* ================= LIGHTBOX ================= */}
      <Lightbox
        items={galleryItems}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
