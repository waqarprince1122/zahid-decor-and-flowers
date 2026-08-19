import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../../components/Lightbox";
import { galleryCategories, galleryItems } from "../../data/gallery";

const easeLux = [0.16, 1, 0.3, 1];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (id) => {
    const index = filtered.findIndex((item) => item.id === id);

    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % filtered.length,
    );
  };

  const prevImage = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current - 1 + filtered.length) % filtered.length,
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
  }, [activeIndex, filtered.length]);

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
          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sticky top-16 z-20 -mx-4 mb-10 border-b border-charcoal/5 bg-ivory/90 px-4 py-4 backdrop-blur-xl sm:top-20 sm:-mx-0 sm:px-0"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible">
              {galleryCategories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setActiveIndex(null);
                    }}
                    className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "bg-burgundy text-ivory shadow-card"
                        : "bg-cream text-charcoal-soft hover:-translate-y-0.5 hover:bg-cream-deep hover:text-charcoal"
                    }`}
                  >
                    {category}

                    {active && (
                      <motion.span
                        layoutId="activeGalleryCategory"
                        className="absolute inset-0 -z-10 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* IMAGE COUNT */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex items-center justify-between"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal-soft/60">
              {activeCategory === "All" ? "All Collection" : activeCategory}
            </p>

            <p className="text-xs text-charcoal-soft/60">
              {filtered.length} {filtered.length === 1 ? "Image" : "Images"}
            </p>
          </motion.div>

          {/* MASONRY GRID */}
          <motion.div
            layout
            className="columns-2 gap-3 sm:columns-2 sm:gap-5 md:columns-3 lg:columns-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 8) * 0.045,
                    ease: easeLux,
                  }}
                  onClick={() => openLightbox(item.id)}
                  className="group relative mb-3 block w-full overflow-hidden rounded-xl bg-cream break-inside-avoid shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy sm:mb-5 sm:rounded-2xl"
                  aria-label={`View ${item.title}`}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-3 text-left opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                    <p className="line-clamp-2 text-sm font-medium text-cream">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold-light">
                      {item.category}
                    </p>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-burgundy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-lg">↗</span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <p className="font-display text-xl text-burgundy">
                No images available
              </p>

              <p className="mt-2 text-sm text-charcoal-soft/70">
                No items are currently available in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <Lightbox
        items={filtered}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
