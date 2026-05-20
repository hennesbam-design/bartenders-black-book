import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'
import RecipeCard from './RecipeCard'

export default function Favourites({ favourites, onToggleFav }) {
  const favRecipes = coppaRecipes.filter(r => favourites.includes(r.id))

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>
        Favourites
      </h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>
        {favRecipes.length} saved recipe{favRecipes.length !== 1 ? 's' : ''}
      </p>

      {favRecipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ fontSize: '3rem', color: 'var(--teal-100)', marginBottom: 16 }}>♥</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 8 }}>
            No favourites yet
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20 }}>
            Tap the ♥ on any recipe card to save it here.
          </p>
          <Link
            to="/house"
            style={{
              display: 'inline-block', padding: '10px 20px', borderRadius: 8,
              fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
              background: 'var(--gold)', color: '#fff', fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Browse House Recipes →
          </Link>
        </div>
      ) : (
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}
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
