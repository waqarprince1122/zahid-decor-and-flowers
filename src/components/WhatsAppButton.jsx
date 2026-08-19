import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
    siteConfig.whatsappMessage,
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zahid Decor & Flowers on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.12,
      }}
      whileTap={{
        scale: 0.92,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft"
    >
      {/* Pulse Ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        initial={{ scale: 1, opacity: 0.45 }}
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.45, 0, 0.45],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* WhatsApp Icon */}
      <FaWhatsapp size={27} className="relative z-10" />
    </motion.a>
  );
}
