import { useState, useEffect } from 'react'

const cache = {}

export function useRecipeImage(recipe) {
  const [src, setSrc] = useState(recipe.image || recipe.imageUrl || null)

  useEffect(() => {
    if (src) return
    const name = recipe.name
    if (cache[name]) { setSrc(cache[name]); return }

    let cancelled = false
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        const img = data?.drinks?.[0]?.strDrinkThumb
        if (img) {
          cache[name] = img
          setSrc(img)
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [recipe.name, src])

  return src
}
