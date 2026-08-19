import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

import SectionHeading from "../../components/SectionHeading";
import Booking from "../../components/Booking";
import { decorationServices } from "../../data/services";

const easeLux = [0.16, 1, 0.3, 1];

export default function Decoration() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold/15 via-ivory to-ivory pt-32 pb-16 sm:pt-40 sm:pb-20">
        {/* Background accents */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-rose/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeLux }}
            className="eyebrow mb-4"
          >
            Decoration Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeLux }}
            className="text-balance text-4xl font-semibold leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
          >
            Beautiful Spaces,
            <span className="mt-2 block font-display italic text-burgundy">
              Thoughtfully Decorated
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: easeLux }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-soft/80 sm:text-lg"
          >
            From weddings and Nikah ceremonies to birthdays, bridal rooms and
            beautifully decorated cars, we create memorable spaces tailored to
            your occasion.
          </motion.p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-x">
          {/* Section heading */}
          <SectionHeading
            eyebrow="Our Decoration Services"
            title="Made for Every Special Occasion"
            description="Choose a decoration service below and send us your event details. We'll help you plan the perfect setup."
          />

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {decorationServices.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 3) * 0.08,
                  ease: easeLux,
                }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden sm:h-72">
                  <img
                    src={item.image}
                    alt={`${item.title} - Zahid Decor & Flowers`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-80" />

                  {/* Service number */}
                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xs font-medium text-burgundy shadow-soft backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Category */}
                  <span className="absolute bottom-4 left-5 rounded-full border border-white/30 bg-charcoal/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    Decoration
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-xl text-charcoal sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-charcoal-soft/75">
                    {item.description}
                  </p>

                  {/* Order Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className="group/button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-burgundy/90 hover:shadow-soft active:translate-y-0"
                  >
                    Order Now
                    <HiArrowUpRight
                      className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                      size={18}
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-cream/50 py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Custom Decoration"
            title="Have Something Special in Mind?"
            description="Tell us about your occasion, preferred colours, venue and requirements. We'll help create a setup that matches your vision."
          />

          <div className="mt-8">
            <button
              type="button"
              onClick={() =>
                setSelectedService({
                  id: "custom-decoration",
                  title: "Custom Decoration",
                  description:
                    "A personalised decoration setup designed around your occasion and requirements.",
                  image:
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
                })
              }
              className="btn-primary"
            >
              Order Custom Decoration
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
