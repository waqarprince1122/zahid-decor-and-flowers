import { Link } from 'react-router-dom'
import { HiArrowUpRight } from 'react-icons/hi2'
import SectionHeading from '../../../components/SectionHeading'
import ServiceCard from '../../../components/ServiceCard'
import { serviceCategories } from '../../../data/services'

export default function ServicesPreview() {
  const preview = serviceCategories.slice(0, 6)

  return (
    <section className="py-20 sm:py-28 bg-ivory">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            align="left"
            eyebrow="What We Offer"
            title="Signature Services"
            description="From intimate gifting to full-scale wedding production, every service is designed around fresh, seasonal florals."
          />
          <Link
            to="/services"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-burgundy shrink-0"
          >
            View All Services <HiArrowUpRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {preview.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link to="/services" className="btn-outline">View All Services</Link>
        </div>
      </div>
    </section>
  )
}
