import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export default function Lightbox({ items, activeIndex, onClose, onNext, onPrev }) {
  const isOpen = activeIndex !== null && activeIndex !== undefined

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    },
    [isOpen, onClose, onNext, onPrev]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown, isOpen])

  const item = isOpen ? items[activeIndex] : null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-label={item?.title}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 transition-colors"
          >
            <HiX size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 transition-colors"
          >
            <HiChevronLeft size={26} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 transition-colors"
          >
            <HiChevronRight size={26} />
          </button>

          <motion.div
            key={item?.id}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl w-full max-h-[82vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item?.image}
              alt={item?.title}
              className="max-h-[70vh] w-auto rounded-lg object-contain shadow-soft"
            />
            <div className="mt-4 text-center">
              <p className="text-ivory font-display text-lg">{item?.title}</p>
              <p className="text-gold-light text-xs uppercase tracking-widest mt-1">{item?.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
