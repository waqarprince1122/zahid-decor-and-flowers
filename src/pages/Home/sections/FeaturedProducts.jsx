import { Link } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading";
import ProductCard from "../../../components/ProductCard";
import { products } from "../../../data/products";

export default function FeaturedProducts() {
  return (
    <section className="w-full overflow-hidden bg-cream/50 py-16 sm:py-8 lg:py-2">
      <div className="container-x w-full min-w-0">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured Arrangements"
          description="A rotating edit of our most-loved bouquets and gifting arrangements, ready for same-day delivery."
        />

        <div
          className="
            mt-10
            grid
            w-full
            min-w-0
            grid-cols-1
            gap-5
            sm:mt-12
            sm:grid-cols-2
            sm:gap-6
            lg:mt-14
            lg:grid-cols-3
            lg:gap-7
          "
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-10 flex w-full justify-center sm:mt-12">
          <Link
            to="/services/flowers"
            className="
              btn-primary
              inline-flex
              max-w-full
              items-center
              justify-center
              text-center
            "
          >
            Browse Flower Services
          </Link>
        </div>
      </div>
    </section>
  );
}
