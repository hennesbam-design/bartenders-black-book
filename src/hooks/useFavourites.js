import { useState, useCallback } from 'react'

const KEY = 'bbb-favourites'

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] }
  catch { return [] }
}

export function useFavourites() {
  const [favourites, setFavourites] = useState(load)

  const toggle = useCallback((id) => {
    setFavourites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFav = useCallback((id) => favourites.includes(id), [favourites])

  return { favourites, toggle, isFav }
}
