import { motion } from 'framer-motion'

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl bg-cream/60 p-4 hover:bg-white hover:shadow-card transition-colors duration-300"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="pt-4">
        <p className="text-[11px] uppercase tracking-widest text-gold-dark mb-1">{product.category}</p>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg text-charcoal">{product.name}</h3>
          <span className="text-sm font-medium text-burgundy whitespace-nowrap">{product.price}</span>
        </div>
      </div>
    </motion.div>
  )
}
