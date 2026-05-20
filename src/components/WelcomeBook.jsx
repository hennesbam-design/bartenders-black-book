import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function WelcomeBook() {
  const [opening, setOpening] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(() => navigate('/dashboard'), 750)
  }

  return (
    <AnimatePresence>
      {!opening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 flex items-center justify-center cursor-pointer select-none"
          style={{ background: '#00746e' }}
          onClick={handleOpen}
        >
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%),
                                radial-gradient(circle at 75% 80%, rgba(0,0,0,0.12) 0%, transparent 55%)`,
            }}
          />

          {/* Spine line */}
          <div
            className="absolute top-0 left-0 bottom-0 w-3"
            style={{ background: 'rgba(0,0,0,0.18)', borderRight: '1px solid rgba(255,255,255,0.08)' }}
          />

          {/* Cover panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="relative flex flex-col items-center text-center px-10"
            style={{ width: '100%', maxWidth: 440 }}
          >
            {/* Top thin rule */}
            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: 32 }} />

            {/* Subtitle above */}
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: 16,
              fontWeight: 500,
            }}>
              Coppa Club
            </p>

            {/* Title */}
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 12vw, 5.2rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '0.01em',
              marginBottom: 6,
            }}>
              Bartender's
            </h1>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 12vw, 5.2rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '0.01em',
              marginBottom: 28,
            }}>
              Black Book
            </h1>

            {/* Cocktail icon row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 28, opacity: 0.65 }}>
              {/* Coupe silhouette */}
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                <path d="M4 4 L16 22 L28 4 Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <line x1="16" y1="22" x2="16" y2="36" stroke="white" strokeWidth="1.5"/>
                <line x1="10" y1="36" x2="22" y2="36" stroke="white" strokeWidth="1.5"/>
              </svg>
              {/* Highball silhouette */}
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                <rect x="4" y="6" width="16" height="30" rx="1.5" stroke="white" strokeWidth="1.5" fill="none"/>
              </svg>
              {/* Rocks silhouette */}
              <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
                <path d="M3 8 L6 32 L24 32 L27 8 Z" stroke="white" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>

            {/* Bottom rule + edition */}
            <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: 20 }} />

            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              marginBottom: 32,
            }}>
              Spring 2026 · Reference Edition
            </p>

            {/* Tap hint */}
            <motion.p
              animate={{ opacity: [0.45, 0.95, 0.45] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
              }}
            >
              Tap to open
            </motion.p>
          </motion.div>

          {/* Corner brackets */}
          {[
            { top: 16, left: 20 },
            { top: 16, right: 16 },
            { bottom: 16, left: 20 },
            { bottom: 16, right: 16 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 20, height: 20,
                ...pos,
                borderTop:    (pos.top    !== undefined) ? '1px solid rgba(255,255,255,0.3)' : undefined,
                borderBottom: (pos.bottom !== undefined) ? '1px solid rgba(255,255,255,0.3)' : undefined,
                borderLeft:   (pos.left   !== undefined) ? '1px solid rgba(255,255,255,0.3)' : undefined,
                borderRight:  (pos.right  !== undefined) ? '1px solid rgba(255,255,255,0.3)' : undefined,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
