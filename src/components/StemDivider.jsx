import { motion } from 'framer-motion'

/**
 * Signature decorative element: a single hand-drawn botanical stem line
 * that draws itself on scroll — used sparingly between sections instead
 * of generic numbered markers or plain <hr /> rules.
 */
export default function StemDivider({ flip = false, className = '' }) {
  return (
    <div className={`flex justify-center py-2 ${className}`} aria-hidden="true">
      <svg
        width="220"
        height="28"
        viewBox="0 0 220 28"
        fill="none"
        className={flip ? 'rotate-180' : ''}
      >
        <motion.path
          d="M2 14 C 40 2, 70 26, 110 14 S 180 2, 218 14"
          stroke="#AD8A4E"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="110"
          cy="14"
          r="3"
          fill="#AD8A4E"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
      </svg>
    </div>
  )
}
