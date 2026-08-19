import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowUpRight } from 'react-icons/hi2'
import { siteConfig } from '../../../data/siteConfig'

export default function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-br from-burgundy to-burgundy-dark text-cream overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-rose/10 blur-3xl" />

      <div className="container-x relative text-center max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow !text-gold-light mb-4"
        >
          Let&rsquo;s Plan Something Beautiful
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl md:text-[2.6rem] font-semibold text-cream text-balance leading-[1.15]"
        >
          Ready to Bring Your Vision to Life?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-cream/80 leading-relaxed"
        >
          Tell us your date, venue and vision — our team will craft a proposal tailored
          to your celebration.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-primary !bg-ivory !text-burgundy hover:!bg-cream">
            Get in Touch
            <HiArrowUpRight />
          </Link>
          <a
            href={`https://wa.me/${siteConfig.phoneRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !border-cream/30 !text-cream hover:!border-gold hover:!text-gold-light"
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
