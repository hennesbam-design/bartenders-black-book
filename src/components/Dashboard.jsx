import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { coppaRecipes } from '../data/coppaRecipes'

const SECTIONS = [
  {
    to: '/house',
    label: 'House Recipes',
    sub: `${coppaRecipes.length} cocktails`,
    icon: '◆',
    accent: '#c4913d',
  },
  {
    to: '/search',
    label: 'Global Search',
    sub: 'TheCocktailDB',
    icon: '◈',
    accent: '#7a9070',
  },
  {
    to: '/diffords',
    label: "Difford's Guide",
    sub: 'Reference links',
    icon: '◉',
    accent: '#9070a8',
  },
  {
    to: '/batch',
    label: 'Batch Calculator',
    sub: 'Scale any recipe',
    icon: '⬡',
    accent: '#70908a',
  },
  {
    to: '/training',
    label: 'Training Mode',
    sub: 'Stories & selling lines',
    icon: '◎',
    accent: '#a87060',
  },
  {
    to: '/favourites',
    label: 'Favourites',
    sub: 'Saved recipes',
    icon: '♦',
    accent: '#c4913d',
  },
  {
    to: '/print',
    label: 'Print Cards',
    sub: 'A6 recipe cards',
    icon: '▣',
    accent: '#607890',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function Dashboard() {
  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="h-px flex-1" style={{ background: 'var(--border-gold)' }} />
          <div className="w-2 h-2 rotate-45" style={{ background: 'var(--gold)', opacity: 0.7 }} />
          <div className="h-px flex-1" style={{ background: 'var(--border-gold)' }} />
        </div>
        <h1
          className="font-head italic mt-2"
          style={{ color: 'var(--gold-light)', fontSize: '2rem', letterSpacing: '0.02em' }}
        >
          The Bar Bible
        </h1>
        <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
          Spring 2026
        </p>
      </motion.div>

      {/* Nav grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        {SECTIONS.map((s) => (
          <motion.div key={s.to} variants={item}>
            <Link
              to={s.to}
              className="deco-corner block p-4 rounded-sm recipe-card-hover"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              <div
                className="text-xl mb-2"
                style={{ color: s.accent }}
              >
                {s.icon}
              </div>
              <div
                className="font-semibold text-sm leading-tight mb-0.5"
                style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
              >
                {s.label}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {s.sub}
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Home card fills last slot */}
        <motion.div variants={item}>
          <Link
            to="/"
            className="deco-corner block p-4 rounded-sm recipe-card-hover"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              textDecoration: 'none',
            }}
          >
            <div className="text-xl mb-2" style={{ color: 'var(--text-muted)' }}>⊙</div>
            <div className="font-semibold text-sm leading-tight mb-0.5" style={{ color: 'var(--text-primary)' }}>Home</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Book cover</div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
