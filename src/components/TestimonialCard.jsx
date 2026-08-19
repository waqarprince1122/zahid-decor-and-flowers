import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      className="rounded-2xl bg-white p-8 shadow-card h-full flex flex-col"
    >
      <div className="flex gap-1 text-gold mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FaStar key={i} size={14} />
        ))}
      </div>
      <p className="text-charcoal-soft/90 leading-relaxed italic flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 pt-5 border-t border-charcoal/10">
        <p className="font-display text-charcoal">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-widest text-gold-dark mt-1">{testimonial.role}</p>
      </div>
    </motion.div>
  )
}
