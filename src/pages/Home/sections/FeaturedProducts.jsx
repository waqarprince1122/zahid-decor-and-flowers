import { Link } from 'react-router-dom'
import SectionHeading from '../../../components/SectionHeading'
import ProductCard from '../../../components/ProductCard'
import { products } from '../../../data/products'

export default function FeaturedProducts() {
  return (
    <section className="py-20 sm:py-28 bg-cream/50">
      <div className="container-x">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured Arrangements"
          description="A rotating edit of our most-loved bouquets and gifting arrangements, ready for same-day delivery."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services/flowers" className="btn-primary">Browse Flower Services</Link>
        </div>
      </div>
    </section>
  )
}
