import { useState, useEffect, useCallback } from 'react'

const cache = {}
const BASE = import.meta.env.BASE_URL  // '/bartenders-black-book/' on GitHub Pages, '/' locally

/** Prepend the Vite base to any local absolute path like /images/coppa/xxx.jpg */
const toAbsolute = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path           // already an external URL
  if (path.startsWith('/')) return BASE + path.slice(1) // e.g. /images/... → base + images/...
  return path
}

export function useRecipeImage(recipe) {
  const localSrc = toAbsolute(recipe.image || recipe.imageUrl || null)
  const [src, setSrc] = useState(localSrc)
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
        if (img) { cache[searchName] = img; setSrc(img) }
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
