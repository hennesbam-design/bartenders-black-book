import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'
import RecipeCard from './RecipeCard'

export default function Favourites({ favourites, onToggleFav }) {
  const favRecipes = coppaRecipes.filter(r => favourites.includes(r.id))

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>
        Favourites
      </h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
        {favRecipes.length} saved recipe{favRecipes.length !== 1 ? 's' : ''}
      </p>

      {favRecipes.length === 0 ? (
        <div className="text-center py-16">
          <div
            className="text-4xl mb-4"
            style={{ color: 'rgba(196,145,61,0.2)' }}
          >
            ♦
          </div>
          <p className="font-head italic text-xl mb-2" style={{ color: 'var(--gold)' }}>No favourites yet</p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Tap the ♦ on any recipe card to save it here.
          </p>
          <Link
            to="/house"
            className="inline-block px-4 py-2 rounded-sm text-sm"
            style={{ background: 'var(--surface)', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}
          >
            Browse House Recipes →
          </Link>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {favRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFav
              onToggleFav={onToggleFav}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
