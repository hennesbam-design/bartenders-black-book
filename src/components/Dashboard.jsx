import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { coppaRecipes } from '../data/coppaRecipes'

const SECTIONS = [
  {
    to: '/house',
    label: 'House Recipes',
    sub: `${coppaRecipes.length} cocktails`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
    accent: '#00746e',
    featured: true,
  },
  {
    to: '/shots',
    label: 'Shots',
    sub: 'Bombs & shooters',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 3h8l-1 9H9L8 3Z"/><line x1="6" y1="3" x2="18" y2="3"/>
        <path d="M9 12c0 2 1.5 3 3 3s3-1 3-3"/>
      </svg>
    ),
    accent: '#c0392b',
  },
  {
    to: '/search',
    label: 'Global Search',
    sub: 'TheCocktailDB',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>
      </svg>
    ),
    accent: '#2980b9',
  },
  {
    to: '/diffords',
    label: "Difford's Guide",
    sub: 'Classic references',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16v16H4z" rx="1"/><line x1="8" y1="9" x2="16" y2="9"/>
        <line x1="8" y1="13" x2="14" y2="13"/>
      </svg>
    ),
    accent: '#8e44ad',
  },
  {
    to: '/batch',
    label: 'Batch Calc',
    sub: 'Scale for events',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    accent: '#16a085',
  },
  {
    to: '/training',
    label: 'Training',
    sub: 'Stories & trivia',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    accent: '#d35400',
  },
  {
    to: '/favourites',
    label: 'Favourites',
    sub: 'Saved recipes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    accent: '#e74c3c',
  },
  {
    to: '/print',
    label: 'Print Cards',
    sub: 'A4 recipe sheets',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
    ),
    accent: '#546e7a',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
}

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: 'var(--gold)', paddingTop: 44, paddingBottom: 28, paddingLeft: 20, paddingRight: 20 }}
      >
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, marginBottom: 4 }}>
          Coppa Club
        </p>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 8vw, 2.8rem)',
          fontWeight: 300,
          color: '#ffffff',
          lineHeight: 1.1,
          letterSpacing: '0.01em',
        }}>
          Bartender's Black Book
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', marginTop: 6, fontFamily: 'DM Sans, sans-serif' }}>
          Spring 2026 Reference Edition
        </p>
      </motion.header>

      {/* Nav grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-2 gap-3 p-4"
        style={{ alignContent: 'start' }}
      >
        {SECTIONS.map((s) => (
          <motion.div key={s.to} variants={item} className={s.featured ? 'col-span-2' : ''}>
            <Link
              to={s.to}
              className="flex items-center gap-3 p-4 rounded-xl recipe-card-hover"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                minHeight: s.featured ? 72 : 80,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Accent icon */}
              <div style={{
                width: 44, height: 44,
                borderRadius: 12,
                background: s.accent + '14',
                color: s.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {s.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3 }}>
                  {s.label}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 1 }}>
                  {s.sub}
                </div>
              </div>

              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--border)', flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer link */}
      <div className="pb-6 text-center">
        <Link to="/styleguide" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.06em' }}>
          Style Guide →
        </Link>
      </div>
    </div>
  )
}
