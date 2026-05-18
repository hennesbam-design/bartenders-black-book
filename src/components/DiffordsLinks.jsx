import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { diffordsLinks } from '../data/diffordsLinks'
import { coppaRecipes } from '../data/coppaRecipes'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

const categories = [...new Set(diffordsLinks.map(d => d.category))]

export default function DiffordsLinks() {
  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>
        Difford's Guide
      </h2>
      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Saved reference links</p>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
        These are reference links only. All images, recipes and text remain copyright Difford's Guide.
      </p>

      {categories.map(cat => (
        <div key={cat} className="mb-6">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}
          >
            {cat}
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            {diffordsLinks.filter(d => d.category === cat).map(link => {
              const related = link.relatedInternalId
                ? coppaRecipes.find(r => r.id === link.relatedInternalId)
                : null
              return (
                <motion.div
                  key={link.id}
                  variants={item}
                  className="deco-corner p-4 rounded-sm"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-head italic mb-1"
                        style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}
                      >
                        {link.name}
                      </h4>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-second)', lineHeight: 1.6 }}>
                        {link.ourNote}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={link.diffordsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs"
                          style={{
                            background: 'rgba(196,145,61,0.1)',
                            color: 'var(--gold)',
                            border: '1px solid var(--border-gold)',
                          }}
                        >
                          Open on Difford's Guide →
                        </a>
                        {related && (
                          <Link
                            to={`/recipe/${related.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs"
                            style={{
                              background: 'var(--surface-high)',
                              color: 'var(--text-second)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            Our {related.name}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
