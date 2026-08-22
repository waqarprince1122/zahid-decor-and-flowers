import React from "react";

import { FaSeedling, FaCreditCard, FaHome } from "react-icons/fa";

const features = [
  {
    icon: FaSeedling,
    title: "Fresh Flowers",
    description:
      "Beautiful and fresh flowers carefully selected to make every moment special.",
  },
  {
    icon: FaCreditCard,
    title: "Online Payment",
    description:
      "Place your order easily with secure and convenient online payment options.",
  },
  {
    icon: FaHome,
    title: "Home Delivery",
    description:
      "Fast and reliable doorstep flower delivery available across Lahore.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-[#fffaf7] py-5 sm:py-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c48b8b] sm:text-sm">
            Why Choose Zahid Flowers
          </p>

          <h2 className="text-2xl font-bold leading-tight text-[#2f2a2a] sm:text-3xl lg:text-4xl">
            Beautiful Flowers,
            <span className="block text-[#b86f76]">Unforgettable Moments</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-gray-600 sm:text-sm">
            Fresh flowers, secure online payment and reliable doorstep delivery
            across Lahore.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-xl border border-[#f0dfdf] bg-white px-5 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:px-4 sm:py-5 lg:px-6"
              >
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0f0] transition-all duration-300 group-hover:bg-[#b86f76]">
                  <Icon className="text-xl text-[#b86f76] transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-semibold text-[#2f2a2a] sm:text-lg">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs leading-5 text-gray-600 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
