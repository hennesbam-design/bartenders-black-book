import { Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  const { favourites, toggle, isFav } = useFavourites()

  return (
    <Routes>
      <Route path="/" element={<WelcomeBook />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/house"
        element={<HouseRecipes favourites={favourites} onToggleFav={toggle} />}
      />
      <Route
        path="/recipe/:id"
        element={<RecipeDetail isFav={isFav} onToggleFav={toggle} />}
      />
      <Route path="/search" element={<ExternalSearch favourites={favourites} onToggleFav={toggle} />} />
      <Route path="/diffords" element={<DiffordsLinks />} />
      <Route path="/batch" element={<BatchCalculator />} />
      <Route path="/training" element={<TrainingMode />} />
      <Route
        path="/favourites"
        element={<Favourites favourites={favourites} onToggleFav={toggle} />}
      />
      <Route path="/print" element={<PrintCards />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
