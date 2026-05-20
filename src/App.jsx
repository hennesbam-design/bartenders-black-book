import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useFavourites } from './hooks/useFavourites'
import WelcomeBook from './components/WelcomeBook'
import Dashboard from './components/Dashboard'
import HouseRecipes from './components/HouseRecipes'
import RecipeDetail from './components/RecipeDetail'
import BatchCalculator from './components/BatchCalculator'
import ExternalSearch from './components/ExternalSearch'
import DiffordsLinks from './components/DiffordsLinks'
import TrainingMode from './components/TrainingMode'
import Favourites from './components/Favourites'
import PrintCards from './components/PrintCards'
import ShotsSection from './components/ShotsSection'
import StyleGuide from './components/StyleGuide'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } },
}

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function AnimatedRoutes({ favourites, isFav, toggle }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><WelcomeBook /></AnimatedPage>} />
        <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="/house" element={<AnimatedPage><HouseRecipes favourites={favourites} onToggleFav={toggle} /></AnimatedPage>} />
        <Route path="/recipe/:id" element={<AnimatedPage><RecipeDetail isFav={isFav} onToggleFav={toggle} /></AnimatedPage>} />
        <Route path="/shots" element={<AnimatedPage><ShotsSection /></AnimatedPage>} />
        <Route path="/search" element={<AnimatedPage><ExternalSearch /></AnimatedPage>} />
        <Route path="/diffords" element={<AnimatedPage><DiffordsLinks /></AnimatedPage>} />
        <Route path="/batch" element={<AnimatedPage><BatchCalculator /></AnimatedPage>} />
        <Route path="/training" element={<AnimatedPage><TrainingMode /></AnimatedPage>} />
        <Route path="/favourites" element={<AnimatedPage><Favourites favourites={favourites} onToggleFav={toggle} /></AnimatedPage>} />
        <Route path="/print" element={<AnimatedPage><PrintCards /></AnimatedPage>} />
        <Route path="/styleguide" element={<AnimatedPage><StyleGuide /></AnimatedPage>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const { favourites, toggle, isFav } = useFavourites()

  return <AnimatedRoutes favourites={favourites} isFav={isFav} toggle={toggle} />
}
