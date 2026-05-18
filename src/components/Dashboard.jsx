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
    desc: 'Your full menu',
  },
  {
    to: '/shots',
    label: 'Shots',
    sub: 'Quick serves',
    icon: '⬡',
    accent: '#a85050',
    desc: 'Bombs & shooters',
  },
  {
    to: '/search',
    label: 'Global Search',
    sub: 'TheCocktailDB',
    icon: '◈',
    accent: '#7a9070',
    desc: 'Thousands of recipes',
  },
  {
    to: '/diffords',
    label: "Difford's Guide",
    sub: 'Reference links',
    icon: '◉',
    accent: '#9070a8',
    desc: 'Classic references',
  },
  {
    to: '/batch',
    label: 'Batch Calc',
    sub: 'Scale any recipe',
    icon: '⊞',
    accent: '#70908a',
    desc: 'Events & prep',
  },
  {
    to: '/training',
    label: 'Training',
    sub: 'Stories & selling lines',
    icon: '◎',
    accent: '#a87060',
    desc: 'Quick-fire trivia',
  },
  {
    to: '/favourites',
    label: 'Favourites',
    sub: 'Saved recipes',
    icon: '♦',
    accent: '#c4913d',
    desc: 'Your saved list',
  },
  {
    to: '/print',
    label: 'Print Cards',
    sub: 'A6 recipe cards',
    icon: '▣',
    accent: '#607890',
    desc: 'Physical reference',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function Dashboard() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* Header — takes up deliberate space on phone */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-10 pb-6 px-6 text-center"
      >
        {/* Top rule */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,145,61,0.5), transparent)' }} />
          <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4913d', opacity: 0.7 }} />
            <div className="w-2 h-2 rotate-45" style={{ background: '#e8c070' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4913d', opacity: 0.7 }} />
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,145,61,0.5), transparent)' }} />
        </div>

        <h1
          className="font-head italic leading-none mb-1"
          style={{ color: 'var(--gold-light)', fontSize: 'clamp(2rem, 7vw, 2.8rem)', letterSpacing: '0.01em' }}
        >
          Bartender's Black Book
        </h1>
        <p
          className="tracking-widest uppercase mt-2"
          style={{ color: 'var(--text-muted)', fontSize: '0.6rem', letterSpacing: '0.22em' }}
        >
          Spring 2026
        </p>

        {/* Bottom rule */}
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)', opacity: 0.4 }} />
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>
      </motion.div>

      {/* Nav grid — grows to fill remaining screen */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-2 gap-3 px-4 pb-6"
        style={{ alignContent: 'start' }}
      >
        {SECTIONS.map((s) => (
          <motion.div key={s.to} variants={item} className="h-full">
            <Link
              to={s.to}
              className="deco-corner flex flex-col justify-between h-full min-h-28 p-4 rounded-sm recipe-card-hover"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              <div
                className="text-2xl mb-2"
                style={{ color: s.accent }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  className="font-semibold leading-tight mb-0.5"
                  style={{ color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {s.label}
                </div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-second)' }}>
                  {s.sub}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {s.desc}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
