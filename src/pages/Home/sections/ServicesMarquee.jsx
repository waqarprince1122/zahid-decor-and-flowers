import { useEffect, useRef, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";

import Booking from "../../../components/Booking";
import { flowerServices, decorationServices } from "../../../data/services";

export default function ServicesMarquee() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  const [selectedService, setSelectedService] = useState(null);

  // Existing flower + decoration services
  const services = [
    ...flowerServices.map((item) => ({
      ...item,
      category: "Flower Services",
    })),
    ...decorationServices.map((item) => ({
      ...item,
      category: "Decoration Services",
    })),
  ];

  // Duplicate for seamless infinite slider
  const marqueeItems = [...services, ...services];

  useEffect(() => {
    const track = trackRef.current;

    if (!track || services.length === 0) return;

    let position = 0;

    // Slider speed
    const speed = 0.45;

    const animate = () => {
      position -= speed;

      const halfWidth = track.scrollWidth / 2;

      // Seamlessly restart
      if (Math.abs(position) >= halfWidth) {
        position = 0;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [services.length]);

  return (
    <>
      {/* ================= SERVICES MARQUEE ================= */}
      <section className="overflow-hidden bg-ivory py-7 sm:py-9">
        {/* ================= HEADING ================= */}
        <div className="container-x mb-5 sm:mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">Order Now</p>

              <h2 className="text-xl font-semibold leading-tight text-charcoal sm:text-2xl">
                Flowers &amp; Decoration Services
              </h2>
            </div>

            <p className="hidden text-xs text-charcoal-soft/60 sm:block">
              Choose a service &amp; order
            </p>
          </div>
        </div>

        {/* ================= INFINITE SLIDER ================= */}
        <div className="relative w-full overflow-hidden">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-ivory to-transparent sm:w-20" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-ivory to-transparent sm:w-20" />

          {/* Track */}
          <div
            ref={trackRef}
            className="flex w-max items-center gap-3 px-2 will-change-transform sm:gap-4"
          >
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="
                  group
                  flex
                  w-[245px]
                  shrink-0
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-charcoal/10
                  bg-white
                  p-2.5
                  shadow-sm
                  transition-shadow
                  duration-300
                  hover:shadow-soft
                  sm:w-[285px]
                  sm:p-3
                "
              >
                {/* ================= IMAGE ================= */}
                <div className="h-[62px] w-[62px] shrink-0 overflow-hidden rounded-lg sm:h-[70px] sm:w-[70px]">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* ================= CONTENT ================= */}
                <div className="min-w-0 flex-1">
                  {/* Category */}
                  <span className="block truncate text-[9px] font-medium uppercase tracking-[0.12em] text-burgundy sm:text-[10px]">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 truncate text-sm font-semibold text-charcoal">
                    {item.title}
                  </h3>

                  {/* Order Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className="
                      mt-1.5
                      inline-flex
                      items-center
                      gap-1
                      text-xs
                      font-medium
                      text-burgundy
                      transition-all
                      duration-300
                      hover:text-burgundy/70
                    "
                  >
                    Order Now
                    <HiArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXISTING BOOKING POPUP ================= */}
      <Booking
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
