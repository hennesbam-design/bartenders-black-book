import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/* ── Croc leather SVG tile ─────────────────────────────── */
const LEATHER_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
  <defs>
    <filter id='n' x='0' y='0' width='100%' height='100%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
      <feBlend in='SourceGraphic' mode='multiply'/>
    </filter>
    <radialGradient id='s1' cx='30%' cy='30%' r='50%'>
      <stop offset='0%' stop-color='%23251a0d' stop-opacity='1'/>
      <stop offset='100%' stop-color='%230d0908' stop-opacity='1'/>
    </radialGradient>
    <radialGradient id='s2' cx='70%' cy='60%' r='45%'>
      <stop offset='0%' stop-color='%231e1408' stop-opacity='1'/>
      <stop offset='100%' stop-color='%230a0806' stop-opacity='1'/>
    </radialGradient>
  </defs>
  <!-- Base -->
  <rect width='120' height='120' fill='%230a0806'/>
  <!-- Scale rows — croc-like cells -->
  <!-- Row 1 -->
  <ellipse cx='20' cy='18' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='50' cy='15' rx='15' ry='9' fill='%23181209' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='80' cy='18' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='110' cy='16' rx='13' ry='9' fill='%23171109' stroke='%23050302' stroke-width='1.2'/>
  <!-- Row 2 (offset) -->
  <ellipse cx='5' cy='34' rx='12' ry='9' fill='%23141009' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='35' cy='36' rx='15' ry='9' fill='%231a1409' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='65' cy='33' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='95' cy='36' rx='14' ry='9' fill='%231a140a' stroke='%23050302' stroke-width='1.2'/>
  <!-- Row 3 -->
  <ellipse cx='20' cy='52' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='50' cy='50' rx='15' ry='9' fill='%23181209' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='80' cy='53' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='110' cy='51' rx='13' ry='9' fill='%23171109' stroke='%23050302' stroke-width='1.2'/>
  <!-- Row 4 (offset) -->
  <ellipse cx='5' cy='69' rx='12' ry='9' fill='%23141009' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='35' cy='70' rx='15' ry='9' fill='%231a1409' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='65' cy='68' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='95' cy='71' rx='14' ry='9' fill='%231a140a' stroke='%23050302' stroke-width='1.2'/>
  <!-- Row 5 -->
  <ellipse cx='20' cy='87' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='50' cy='85' rx='15' ry='9' fill='%23181209' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='80' cy='88' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='110' cy='86' rx='13' ry='9' fill='%23171109' stroke='%23050302' stroke-width='1.2'/>
  <!-- Row 6 (offset) -->
  <ellipse cx='5' cy='104' rx='12' ry='9' fill='%23141009' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='35' cy='106' rx='15' ry='9' fill='%231a1409' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='65' cy='103' rx='14' ry='9' fill='%23161008' stroke='%23050302' stroke-width='1.2'/>
  <ellipse cx='95' cy='106' rx='14' ry='9' fill='%231a140a' stroke='%23050302' stroke-width='1.2'/>
  <!-- Highlight sheen -->
  <rect width='120' height='120' fill='url(%23s1)' opacity='0.18'/>
  <rect width='120' height='120' filter='url(%23n)' opacity='0.04'/>
</svg>`

const LEATHER_BG = `url("data:image/svg+xml,${LEATHER_SVG.trim().replace(/\n\s*/g, ' ')}")`

export default function WelcomeBook() {
  const [opening, setOpening] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(() => navigate('/dashboard'), 900)
  }

  return (
    <AnimatePresence>
      {!opening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center cursor-pointer select-none"
          style={{
            background: '#060504',
            backgroundImage: LEATHER_BG,
            backgroundSize: '120px 120px',
          }}
          onClick={handleOpen}
        >
          {/* Ambient centre glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(196,145,61,0.07) 0%, transparent 70%)',
            }}
          />
          {/* Edge vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* Book spine — left edge */}
          <div
            className="absolute top-0 left-0 bottom-0 w-6 md:w-8"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(196,145,61,0.08) 60%, transparent 100%)',
              borderRight: '1px solid rgba(196,145,61,0.15)',
            }}
          />

          {/* Centre cover panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative flex flex-col items-center justify-center px-10"
            style={{ width: '100%', maxWidth: 480 }}
          >
            {/* Top ornament line */}
            <div className="flex items-center gap-3 w-full mb-8">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,145,61,0.6), transparent)' }} />
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4913d', opacity: 0.8 }} />
                <div className="w-2 h-2 rotate-45" style={{ background: '#e8c070', opacity: 0.9 }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4913d', opacity: 0.8 }} />
              </div>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,145,61,0.6), transparent)' }} />
            </div>

            {/* Title with gold shimmer */}
            <div className="relative mb-3 text-center">
              <GoldTitle line1="Bartender's" line2="Black Book" />
            </div>

            {/* Sub-rule */}
            <div className="flex items-center gap-3 w-full mt-6 mb-5">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,145,61,0.4), transparent)' }} />
              <div className="w-1 h-1 rotate-45" style={{ background: '#c4913d', opacity: 0.6 }} />
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,145,61,0.4), transparent)' }} />
            </div>

            {/* Tagline */}
            <p
              className="text-center tracking-widest uppercase mb-2"
              style={{ color: 'rgba(232,192,112,0.55)', fontSize: '0.62rem', letterSpacing: '0.25em' }}
            >
              Your recipes · Your way · Anywhere
            </p>
            <p
              className="text-center font-head italic"
              style={{ color: 'rgba(196,145,61,0.35)', fontSize: '0.9rem' }}
            >
              Spring 2026
            </p>

            {/* Bottom ornament */}
            <div className="flex items-center gap-3 w-full mt-8 mb-10">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,145,61,0.5), transparent)' }} />
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4913d', opacity: 0.7 }} />
                <div className="w-2 h-2 rotate-45" style={{ background: '#e8c070', opacity: 0.85 }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4913d', opacity: 0.7 }} />
              </div>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,145,61,0.5), transparent)' }} />
            </div>

            {/* Tap hint */}
            <motion.p
              animate={{ opacity: [0.3, 0.75, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="tracking-widest uppercase text-center"
              style={{ color: 'rgba(196,145,61,0.5)', fontSize: '0.6rem', letterSpacing: '0.3em' }}
            >
              ✦ &nbsp; Tap to open &nbsp; ✦
            </motion.p>
          </motion.div>

          {/* Corner gold brackets */}
          {[
            'top-4 left-8 border-t border-l',
            'top-4 right-4 border-t border-r',
            'bottom-4 left-8 border-b border-l',
            'bottom-4 right-4 border-b border-r',
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-7 h-7 ${pos}`}
              style={{ borderColor: 'rgba(196,145,61,0.35)' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Shimmering gold title ─────────────────────────────── */
function GoldTitle({ line1, line2 }) {
  return (
    <div className="text-center">
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        .gold-shimmer {
          background: linear-gradient(
            90deg,
            #7a5510 0%,
            #c4913d 20%,
            #f5d68a 38%,
            #fff8dc 50%,
            #f5d68a 62%,
            #c4913d 80%,
            #7a5510 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: goldShimmer 4s linear infinite;
        }
      `}</style>
      <h1
        className="gold-shimmer font-head italic leading-none block"
        style={{ fontSize: 'clamp(2.8rem, 10vw, 4.2rem)', letterSpacing: '0.01em' }}
      >
        {line1}
      </h1>
      <h1
        className="gold-shimmer font-head italic leading-none block mt-1"
        style={{ fontSize: 'clamp(2.8rem, 10vw, 4.2rem)', letterSpacing: '0.01em' }}
      >
        {line2}
      </h1>
    </div>
  )
}
