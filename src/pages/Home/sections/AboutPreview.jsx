import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineSparkles } from 'react-icons/hi2'
import StemDivider from '../../../components/StemDivider'

export default function AboutPreview() {
  return (
    <section className="py-20 sm:py-28 bg-ivory overflow-hidden">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1000&q=80"
              alt="Florist arranging fresh flowers at Zahid Decor and Flowers studio"
              loading="lazy"
              className="w-full h-[380px] sm:h-[460px] object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 sm:-right-10 rounded-2xl bg-burgundy text-cream px-7 py-6 shadow-soft max-w-[210px]">
            <HiOutlineSparkles className="text-gold-light mb-2" size={22} />
            <p className="font-display italic text-sm leading-snug">
              &ldquo;Every arrangement tells a story worth remembering.&rdquo;
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <p className="eyebrow mb-3">Our Studio</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal text-balance leading-[1.15]">
            A Family Craft, Grown Into Lahore&rsquo;s Trusted Floral House
          </h2>
          <StemDivider className="!justify-start -ml-1" />
          <p className="mt-2 text-charcoal-soft/90 leading-relaxed">
            What began as a small flower counter has grown into a full-service studio for
            weddings, Nikah ceremonies and celebrations across the city. We still design
            every order the same way we did on day one — by hand, with fresh stock sourced
            daily, and an eye for detail that respects the occasion.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              'Fresh flowers sourced and arranged daily',
              'In-house design team for weddings & events',
              'Same-day delivery across Lahore',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-charcoal-soft/90">
                <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-outline mt-8 inline-flex">Our Story</Link>
        </div>
      </div>
    </section>
  )
}
