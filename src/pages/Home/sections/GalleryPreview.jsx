import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { galleryItems } from '../../../data/gallery'

export default function GalleryPreview() {
  const preview = galleryItems.slice(0, 5)

  return (
    <section className="py-20 sm:py-28 bg-charcoal text-cream overflow-hidden">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow !text-gold-light mb-3">Our Portfolio</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-semibold text-cream text-balance leading-[1.15]"
          >
            Moments We&rsquo;ve Styled
          </motion.h2>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          {preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-cream text-sm font-medium">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/gallery" className="btn-outline !border-cream/30 !text-cream hover:!border-gold hover:!text-gold-light">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
