import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FlipCard({ front, back, className = '' }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`perspective cursor-pointer ${className}`}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          {front}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}
