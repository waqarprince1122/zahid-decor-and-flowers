import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        bg-cream/60
        p-3
        transition-colors
        duration-300
        hover:bg-white
        hover:shadow-card
        sm:p-4
      "
    >
      {/* ================= IMAGE ================= */}
      <div
        className="
          relative
          w-full
          min-w-0
          overflow-hidden
          rounded-xl
          aspect-[4/5]
        "
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="
            block
            h-full
            w-full
            min-w-0
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-110
          "
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="min-w-0 pt-4">
        <p
          className="
            mb-1
            truncate
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-gold-dark
            sm:text-[11px]
            sm:tracking-widest
          "
        >
          {product.category}
        </p>

        <h3
          className="
            break-words
            font-display
            text-base
            leading-snug
            text-charcoal
            sm:text-lg
          "
        >
          {product.name}
        </h3>
      </div>
    </motion.div>
  );
}
