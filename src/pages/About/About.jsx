import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineHeart, HiOutlineSparkles, HiOutlineClock, HiOutlineTruck } from 'react-icons/hi2'
import SectionHeading from '../../components/SectionHeading'
import StemDivider from '../../components/StemDivider'

const values = [
  {
    icon: HiOutlineHeart,
    title: 'Crafted with Care',
    description: 'Every stem is chosen and arranged by hand — nothing feels mass-produced.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Premium Quality',
    description: 'We work only with fresh, seasonal stock sourced daily from trusted growers.',
  },
  {
    icon: HiOutlineClock,
    title: 'Always On Time',
    description: 'From engagements to same-day gifts, we treat your timeline as our own.',
  },
  {
    icon: HiOutlineTruck,
    title: 'Reliable Delivery',
    description: 'Careful handling and tracked delivery across Lahore, every time.',
  },
]

const stats = [
  { value: '500+', label: 'Events Styled' },
  { value: '10+', label: 'Years of Craft' },
  { value: '50+', label: 'Design Team' },
  { value: '4.9/5', label: 'Client Rating' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-b from-cream to-ivory overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
        <div className="container-x relative text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            About Zahid Decor and Flowers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-semibold text-charcoal text-balance leading-[1.12]"
          >
            Designing Floral Moments Since Day One
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=80"
              alt="Fresh flowers being prepared"
              loading="lazy"
              className="rounded-2xl h-64 sm:h-80 w-full object-cover mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=700&q=80"
              alt="Finished floral arrangement"
              loading="lazy"
              className="rounded-2xl h-64 sm:h-80 w-full object-cover"
            />
          </motion.div>

          <div className="lg:col-span-6">
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal leading-[1.15] text-balance">
              Rooted in Lahore, Built on Trust
            </h2>
            <StemDivider className="!justify-start -ml-1" />
            <p className="mt-2 text-charcoal-soft/90 leading-relaxed">
              Zahid Decor and Flowers started as a modest flower stall, run on a simple
              promise: every arrangement leaves our hands the way we&rsquo;d want to receive
              it ourselves. As word spread through weddings, Nikah ceremonies and family
              celebrations across the city, that promise grew into a full design studio.
            </p>
            <p className="mt-4 text-charcoal-soft/90 leading-relaxed">
              Today our team handles everything from a single gifting bouquet to a
              complete wedding venue transformation — but the process hasn&rsquo;t changed.
              We still select stock ourselves, design by hand, and treat every order as
              if it were for our own family.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 sm:py-24 bg-cream/50">
        <div className="container-x">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our Mission & Values"
            description="Four principles shape every arrangement and every event we style."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-white p-7 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy mb-5">
                  <value.icon size={22} />
                </div>
                <h3 className="font-display text-lg text-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-charcoal-soft/85 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="eyebrow mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal leading-[1.15] text-balance">
              A Studio That Treats Your Event Like Our Own
            </h2>
            <ul className="mt-8 space-y-6">
              {[
                {
                  title: 'In-house Design Team',
                  desc: 'No outsourcing — the hands that consult with you are the ones who build your setup.',
                },
                {
                  title: 'Flexible for Any Scale',
                  desc: 'From a single bouquet to a 500-guest wedding, our process scales with you.',
                },
                {
                  title: 'Transparent Planning',
                  desc: 'Clear timelines and pricing from the first conversation to setup day.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gold shrink-0" />
                  <div>
                    <p className="font-medium text-charcoal">{item.title}</p>
                    <p className="text-sm text-charcoal-soft/80 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-9 inline-flex">Start Planning</Link>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80"
              alt="Wedding stage decorated by Zahid Decor and Flowers"
              loading="lazy"
              className="rounded-[2rem] shadow-soft h-[380px] sm:h-[440px] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 bg-burgundy text-cream">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="font-display text-3xl sm:text-4xl text-gold-light">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-cream/70 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-ivory text-center">
        <div className="container-x max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal text-balance leading-[1.15]">
            Let&rsquo;s Design Your Next Occasion
          </h2>
          <p className="mt-4 text-charcoal-soft/90">
            Share your date and vision — we&rsquo;ll take it from there.
          </p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">Get in Touch</Link>
        </div>
      </section>
    </>
  )
}
