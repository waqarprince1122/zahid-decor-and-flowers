import Hero from './sections/Hero'
import ServicesPreview from './sections/ServicesPreview'
import FeaturedProducts from './sections/FeaturedProducts'
import AboutPreview from './sections/AboutPreview'
import GalleryPreview from './sections/GalleryPreview'
import FinalCTA from './sections/FinalCTA'
import WhyChooseUs from "./sections/WhyChooseUs"
import ServicesMarquee from "./sections/ServicesMarquee"
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <WhyChooseUs />
      <ServicesPreview />

      <FeaturedProducts />
      <AboutPreview />
      <GalleryPreview />
      <FinalCTA />
    </>
  );
}
