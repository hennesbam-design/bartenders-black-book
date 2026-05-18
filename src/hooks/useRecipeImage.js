import { useState, useEffect, useCallback } from 'react'

const cache = {}

export function useRecipeImage(recipe) {
  const [src, setSrc] = useState(recipe.image || recipe.imageUrl || null)
  const [errored, setErrored] = useState(false)

  const searchName = recipe.cdbSearchName || recipe.name

  useEffect(() => {
    if (src && !errored) return
    if (cache[searchName]) { setSrc(cache[searchName]); return }

    let cancelled = false
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchName)}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        const img = data?.drinks?.[0]?.strDrinkThumb
        if (img) {
          cache[searchName] = img
          setSrc(img)
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [searchName, src, errored])

  const onError = useCallback(() => {
    setErrored(true)
    setSrc(null)
  }, [])

  return { src, onError }
}
