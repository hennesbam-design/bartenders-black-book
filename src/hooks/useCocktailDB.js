import { useState, useCallback } from 'react'

const BASE = 'https://www.thecocktaildb.com/api/json/v1/1'

const extractIngredients = (drink) => {
  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`]
    const measure = drink[`strMeasure${i}`]
    if (name) ingredients.push({ name, amount: measure?.trim() || '', unit: '', bottleSize: null })
  }
  return ingredients
}

const mapDrink = (drink) => ({
  id: `ext-${drink.idDrink}`,
  name: drink.strDrink,
  source: 'external',
  image: drink.strDrinkThumb,
  category: drink.strCategory,
  glassware: drink.strGlass,
  instructions: drink.strInstructions ? [drink.strInstructions] : [],
  ingredients: extractIngredients(drink),
  method: drink.strIBA || '',
  garnish: '',
  ice: '',
  difficulty: 0,
  flavour: [],
  allergens: [],
  batchable: false,
  story: '',
  talkingPoint: '',
  sellingLine: '',
  commonMistakes: [],
  variations: [],
  colour: '#1a1a1a',
  badge: 'External Recipe',
  diffordsLink: null,
})

export function useCocktailDB() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [random, setRandom] = useState(null)

  const search = useCallback(async (query) => {
    if (!query.trim()) { setResults([]); return }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults((data.drinks || []).map(mapDrink))
    } catch {
      setError('Could not reach TheCocktailDB — check your connection.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchRandom = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE}/random.php`)
      const data = await res.json()
      if (data.drinks?.[0]) setRandom(mapDrink(data.drinks[0]))
    } catch {
      // silent fail
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, search, random, fetchRandom }
}
