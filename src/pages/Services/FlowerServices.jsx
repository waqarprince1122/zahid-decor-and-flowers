import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import SectionHeading from "../../components/SectionHeading";
import Booking from "../../components/Booking";
import { flowerServices } from "../../data/services";

const easeLux = [0.16, 1, 0.3, 1];

const ITEMS_PER_PAGE = 6;

export default function FlowerServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(flowerServices.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentServices = flowerServices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose/15 via-ivory to-ivory pt-32 pb-16 sm:pt-25 sm:pb-5">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-rose/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: easeLux,
            }}
            className="eyebrow mb-4"
          >
            Flower Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: easeLux,
            }}
            className="text-balance text-4xl font-semibold leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
          >
            Flowers for Every
            <span className="mt-2 block font-display italic text-burgundy">
              Moment &amp; Feeling
            </span>
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.25,
              ease: easeLux,
            }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft/80 sm:text-lg"
          >
            From fresh flower bouquets and romantic roses to premium
            arrangements, gift hampers and custom floral designs, we create
            beautiful flowers for every special occasion.
          </motion.p> */}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Flower Collection"
            title="Beautiful Flowers, Thoughtfully Arranged"
            description="Choose your preferred flower service and place your order. Every arrangement can be customised according to your occasion, colours and requirements."
          />

          {/* SERVICE CARDS */}
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: easeLux,
            }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentServices.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: easeLux,
                }}
                className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <img
                    src={item.image}
                    alt={`${item.title} - Zahid Decor & Flowers`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* IMAGE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />

                  {/* SERVICE NUMBER */}
                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xs font-medium text-burgundy shadow-soft backdrop-blur-sm">
                    {String(startIndex + i + 1).padStart(2, "0")}
                  </div>

                  {/* CATEGORY */}
                  <span className="absolute bottom-4 left-5 rounded-full border border-white/30 bg-charcoal/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    Flowers
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-xl text-charcoal sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-charcoal-soft/75">
                    {item.description}
                  </p>

                  {/* ORDER BUTTON */}
                  <button
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className="group/button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-burgundy/90 hover:shadow-soft active:translate-y-0"
                  >
                    Order Now
                    <HiArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-5 sm:mt-16">
              {/* PAGE INFO */}
              <p className="text-sm text-charcoal-soft/70">
                Page{" "}
                <span className="font-semibold text-burgundy">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-charcoal">
                  {totalPages}
                </span>
              </p>

              {/* PAGINATION */}
              <div className="flex items-center justify-center gap-2">
                {/* PREVIOUS */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                    currentPage === 1
                      ? "cursor-not-allowed border-charcoal/10 text-charcoal/25"
                      : "border-charcoal/15 text-charcoal hover:border-burgundy hover:bg-burgundy hover:text-cream"
                  }`}
                >
                  <HiChevronLeft size={20} />
                </button>

                {/* PAGE NUMBERS */}
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <motion.button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      whileTap={{ scale: 0.92 }}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-burgundy text-cream shadow-soft"
                          : "border border-charcoal/10 bg-white text-charcoal-soft hover:border-burgundy hover:text-burgundy"
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                {/* NEXT */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed border-charcoal/10 text-charcoal/25"
                      : "border-charcoal/15 text-charcoal hover:border-burgundy hover:bg-burgundy hover:text-cream"
                  }`}
                >
                  <HiChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= CUSTOM FLOWERS ================= */}
      <section className="relative overflow-hidden bg-cream/50 py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Custom Flowers"
            title="Have a Special Bouquet in Mind?"
            description="Tell us your preferred flowers, colours, occasion or share a reference picture. We'll create something beautiful for you."
          />

          <div className="mt-8">
            <button
              type="button"
              onClick={() =>
                setSelectedService({
                  id: "custom-flower",
                  title: "Custom Flower Arrangement",
                  description:
                    "A personalised flower arrangement designed according to your occasion, colours and requirements.",
                  image:
                    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1000&q=80",
                })
              }
              className="btn-primary"
            >
              Order Custom Flowers
              <HiArrowUpRight />
            </button>
          </div>
        </div>
      </section>

      {/* ================= BOOKING MODAL ================= */}
      <Booking
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
