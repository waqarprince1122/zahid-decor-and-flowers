import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowUpRight } from 'react-icons/hi2'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-card"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] uppercase tracking-widest text-burgundy font-medium">
          {service.group}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-charcoal mb-2">{service.title}</h3>
        <p className="text-sm text-charcoal-soft/85 leading-relaxed mb-5">{service.description}</p>
        <Link
          to={service.link}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy group-hover:gap-2.5 transition-all duration-300"
        >
          Explore
          <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}
