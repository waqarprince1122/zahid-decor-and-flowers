import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import SectionHeading from "../../components/SectionHeading";
import ServiceCard from "../../components/ServiceCard";
import { serviceCategories } from "../../data/services";

const easeLux = [0.16, 1, 0.3, 1];

const ITEMS_PER_PAGE = 6;

export default function Services() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(serviceCategories.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentServices = serviceCategories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <>
      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-ivory to-ivory pt-32 pb-16 sm:pt-25 sm:pb-5">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

        <div className="pointer-events-none absolute top-20 -right-32 h-80 w-80 rounded-full bg-rose/15 blur-3xl" />

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
            What We Do
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: easeLux,
            }}
            className="text-balance text-4xl font-semibold leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl"
          >
            Services for
            <span className="mt-1 block italic text-burgundy">
              Every Occasion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: easeLux,
            }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft/85 sm:text-lg"
          >
            From a single gifting bouquet to a complete wedding transformation —
            explore our flower and decoration services designed for your most
            memorable occasions.
          </motion.p>
        </div>
      </section>

      {/* =========================
          SERVICE NAVIGATION
      ========================== */}
      <section className="bg-ivory py-8 sm:py-10">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: easeLux,
            }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Link
              to="/services/flowers"
              className="btn-outline w-full justify-center sm:w-auto"
            >
              Explore Flower Services
            </Link>

            <Link
              to="/services/decoration"
              className="btn-primary w-full justify-center sm:w-auto"
            >
              Explore Decoration Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================== */}
      <section className="bg-ivory py-14 sm:py-20 lg:py-24">
        <div className="container-x">
          <div className="mb-10 text-center sm:mb-14">
            <SectionHeading
              eyebrow="Our Services"
              title="Beautiful Details, Thoughtfully Designed"
              description="Choose from our floral gifting, flower delivery and event decoration services."
            />
          </div>

          {/* SERVICE CARDS */}
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: easeLux,
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3"
          >
            {currentServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: easeLux,
                }}
              >
                <ServiceCard service={service} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {/* =========================
              PAGINATION
          ========================== */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-5 sm:mt-16">
              {/* Page Information */}
              <p className="text-sm text-charcoal-soft/70">
                Page{" "}
                <span className="font-semibold text-burgundy">
                  {currentPage}
                </span>{" "}
                of <span className="font-semibold">{totalPages}</span>
              </p>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                {/* Previous */}
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

                {/* Page Numbers */}
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

                {/* Next */}
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

      {/* =========================
          CTA
      ========================== */}
      <section className="relative overflow-hidden bg-cream/60 py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Not Sure Where to Start?"
            title="Tell Us Your Occasion, We'll Handle the Rest"
            description="Share a few details about your event, celebration or gifting needs and our team will recommend the right service for you."
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: easeLux,
            }}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Link
              to="/contact"
              className="btn-primary w-full justify-center sm:w-auto"
            >
              Get a Free Consultation
            </Link>

            <Link
              to="/services/flowers"
              className="btn-outline w-full justify-center sm:w-auto"
            >
              View Flower Services
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
