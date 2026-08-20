import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { galleryItems } from "../../../data/gallery";

export default function GalleryPreview() {
  const preview = galleryItems.slice(0, 5);

  if (!preview.length) return null;

  return (
    <section className="overflow-hidden bg-charcoal py-20 text-cream sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3 !text-gold-light">Our Portfolio</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-balance text-3xl font-semibold leading-[1.15] text-cream sm:text-4xl"
          >
            Moments We&rsquo;ve Styled
          </motion.h2>
        </div>

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:mt-14 sm:auto-rows-[180px] sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:auto-rows-[210px]">
          {preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <Link
                to="/gallery"
                aria-label={`View ${item.title} in the full gallery`}
                className="group relative block h-full w-full overflow-hidden rounded-xl shadow-lg shadow-black/20 ring-1 ring-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={`${item.title} — Zahid Decor and Flowers gallery`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Title */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                  <p className="line-clamp-2 text-sm font-medium text-cream">
                    {item.title}
                  </p>
                  {item.category && (
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold-light">
                      {item.category}
                    </p>
                  )}
                </div>

                {/* Hover icon */}
                <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-cream/90 text-burgundy opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:h-9 sm:w-9">
                  <span className="text-base sm:text-lg">↗</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="btn-outline !border-cream/30 !text-cream hover:!border-gold hover:!text-gold-light"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
