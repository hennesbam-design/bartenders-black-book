import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function WelcomeBook() {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(() => {
      setDone(true)
      navigate('/dashboard')
    }, 950)
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'var(--bg)' }}
          onClick={handleOpen}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(196,145,61,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Book container */}
          <div className="relative w-72 md:w-80 select-none">
            {/* Left page fly-out */}
            <motion.div
              animate={opening ? { rotateY: -120, opacity: 0 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 origin-right preserve-3d pointer-events-none"
              style={{ transformOrigin: 'right center' }}
            />
            {/* Right page fly-out */}
            <motion.div
              animate={opening ? { rotateY: 120, opacity: 0 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 origin-left preserve-3d pointer-events-none"
              style={{ transformOrigin: 'left center' }}
            />

            {/* Book cover */}
            <motion.div
              animate={opening ? { scale: 1.04, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1a1510 0%, #0d0b08 50%, #1a1510 100%)',
                border: '1px solid rgba(196,145,61,0.3)',
                padding: '2.5rem 2rem',
                boxShadow: '0 32px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(196,145,61,0.1)',
              }}
            >
              {/* Art Deco corners */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: 'var(--gold)', opacity: 0.6 }} />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: 'var(--gold)', opacity: 0.6 }} />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: 'var(--gold)', opacity: 0.6 }} />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: 'var(--gold)', opacity: 0.6 }} />

              {/* Diamond top */}
              <div className="flex justify-center mb-4">
                <div className="w-3 h-3 rotate-45" style={{ background: 'var(--gold)', opacity: 0.7 }} />
              </div>

              {/* Title */}
              <h1
                className="text-center font-head italic leading-none mb-1"
                style={{ color: 'var(--gold-light)', fontSize: 'clamp(2.2rem, 6vw, 3rem)', letterSpacing: '0.02em' }}
              >
                The Bar Bible
              </h1>

              {/* Diamond divider */}
              <div className="flex items-center gap-2 my-3 px-4">
                <div className="flex-1 h-px" style={{ background: 'var(--border-gold)' }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)', opacity: 0.5 }} />
                <div className="flex-1 h-px" style={{ background: 'var(--border-gold)' }} />
              </div>

              {/* Tagline */}
              <p
                className="text-center text-xs tracking-widest uppercase mb-6"
                style={{ color: 'var(--text-second)', letterSpacing: '0.2em' }}
              >
                Your recipes. Your way. Anywhere.
              </p>

              {/* Season */}
              <p
                className="text-center text-xs mb-6 font-head italic"
                style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                Spring 2026
              </p>

              {/* Diamond bottom */}
              <div className="flex justify-center">
                <div className="w-2 h-2 rotate-45" style={{ background: 'var(--gold)', opacity: 0.4 }} />
              </div>

              {/* Tap hint */}
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-center text-xs mt-5 tracking-widest uppercase"
                style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}
              >
                Tap to open
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
