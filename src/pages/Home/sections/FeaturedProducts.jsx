import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading";
import { products } from "../../../data/products";

const AUTO_SLIDE_MS = 4000;

export default function FeaturedProducts() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const slideCount = products.length;

  const goTo = useCallback(
    (index) => {
      setActive(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || slideCount <= 1) return undefined;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [isPaused, slideCount]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) goPrev();
    else if (delta < -40) goNext();
    touchStartX.current = null;
  };

  if (!products?.length) return null;

  return (
    <section className="w-full overflow-hidden bg-cream/50 py-16 sm:py-20 lg:py-2">
      <div className="container-x w-full min-w-0">
        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-2
            lg:gap-14
          "
        >
          {/* Left side: heading + copy */}
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Handpicked"
              title="Featured Arrangements"
              description="A rotating edit of our most-loved bouquets and gifting arrangements, ready for same-day delivery."
            />

            <div className="mt-8 flex w-full justify-center sm:mt-10 lg:justify-center">
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

          {/* Right side: image slider */}
          <div
            className="relative mx-auto w-full min-w-0 max-w-[420px] sm:max-w-[460px] lg:mx-0 lg:ml-auto lg:max-w-[440px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="
                relative
                aspect-[4/5]
                w-full
                overflow-hidden
                rounded-3xl
                shadow-xl
                shadow-black/10
                ring-1
                ring-black/5
              "
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full w-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {products.map((product, i) => (
                  <div
                    key={product.id}
                    className="relative h-full w-full flex-shrink-0"
                    aria-hidden={active !== i}
                  >
                    <img
                      src={product.image}
                      alt={
                        product.name || product.title || "Featured arrangement"
                      }
                      className="h-full w-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />

                    {/* Readability overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

                    {/* Centered Book Now button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        to="/contact"
                        tabIndex={active === i ? 0 : -1}
                        className="
                          btn-primary
                          pointer-events-auto
                          inline-flex
                          items-center
                          justify-center
                          rounded-full
                          px-6
                          py-3
                          text-sm
                          font-semibold
                          shadow-lg
                          transition
                          hover:scale-105
                          sm:text-base
                        "
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev / Next arrows */}
              {slideCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous arrangement"
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-white/80
                      p-2
                      text-charcoal
                      shadow-md
                      backdrop-blur
                      transition
                      hover:bg-white
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-offset-2
                      sm:p-2.5
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next arrangement"
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-white/80
                      p-2
                      text-charcoal
                      shadow-md
                      backdrop-blur
                      transition
                      hover:bg-white
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-offset-2
                      sm:p-2.5
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            {slideCount > 1 && (
              <div className="mt-5 flex w-full items-center justify-center gap-2">
                {products.map((product, i) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={active === i}
                    className={`
                      h-2.5
                      rounded-full
                      transition-all
                      duration-300
                      ${active === i ? "w-7 bg-primary" : "w-2.5 bg-charcoal/20 hover:bg-charcoal/40"}
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
