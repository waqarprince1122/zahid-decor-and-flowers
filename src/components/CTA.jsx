import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineSparkles } from "react-icons/hi2";

const easeLux = [0.16, 1, 0.3, 1];

const whatsappNumber = "923091190761";

const whatsappMessage =
  "Hello Zahid Decor & Flowers, I would like to know more about your flower and decoration services.";

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-burgundy py-16 sm:py-20">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />

      <div className="container-x relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeLux }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <HiOutlineSparkles className="text-gold-light" size={20} />
          <p className="eyebrow text-gold-light">Let&apos;s Create Together</p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: easeLux }}
          className="text-balance font-display text-3xl font-semibold leading-[1.15] text-ivory sm:text-4xl lg:text-5xl"
        >
          Ready to Style Your Next Celebration?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.16, ease: easeLux }}
          className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base"
        >
          From intimate Nikah setups to grand wedding stages, let us bring your
          vision to life with flowers and decor styled just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.24, ease: easeLux }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-charcoal shadow-lg transition-colors hover:bg-gold-light sm:w-auto"
          >
            Chat on WhatsApp
          </motion.a>

          <motion.div whileHover={{ y: -2 }} className="w-full sm:w-auto">
            <Link
              to="/contact"
              className="block w-full rounded-full border border-ivory/30 px-8 py-3.5 text-center text-sm font-medium text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 sm:w-auto"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
