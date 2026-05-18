# The Bar Bible

> Your recipes. Your way. Anywhere.

An Art Deco cocktail reference app for bar staff. 27 house recipes with flip cards, batch calculator, TheCocktailDB integration, training mode, and print-ready A6 recipe cards.

## Tech Stack

| Tool | Purpose |
|---|---|
| Vite + React | Fast dev environment |
| Tailwind CSS v4 | Styling |
| Framer Motion | Flip animations & transitions |
| React Router v6 | Navigation |
| TheCocktailDB API | External cocktail search (free) |
| localStorage | Favourites — no backend needed |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 (or whichever port Vite picks).

## Adding Cocktail Photos

1. Export photos from the Coppa Club PDF (Mac: Preview → Export, or Acrobat → Export PDF → Image → JPEG)
2. Name them to match recipe IDs: `hugo-spritz.jpg`, `negroni.jpg`, `espresso-martini.jpg`, etc.
3. Drop into `public/images/coppa/`

Photos will appear automatically — no code changes needed.

## Deploy to Vercel (Free)

```bash
# 1. Create a GitHub repo named bar-bible
git init
git add .
git commit -m "initial build"
git remote add origin https://github.com/YOURNAME/bar-bible.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import from GitHub → Select bar-bible
# 3. Leave all settings default → Deploy

# Every future push auto-deploys within 30 seconds:
git add .
git commit -m "update recipes"
git push
```

## Structure

```
src/
├── components/
│   ├── WelcomeBook.jsx      Book cover + opening animation
│   ├── Dashboard.jsx        Main navigation menu
│   ├── HouseRecipes.jsx     All 27 Coppa recipes with search/filter
│   ├── RecipeCard.jsx       Flip card (image front / recipe back)
│   ├── RecipeDetail.jsx     Full recipe page with Training tab
│   ├── BatchCalculator.jsx  Scale any batchable recipe
│   ├── ExternalSearch.jsx   TheCocktailDB integration
│   ├── DiffordsLinks.jsx    Saved Difford's reference links
│   ├── TrainingMode.jsx     Stories, selling lines, quick-fire trivia
│   ├── Favourites.jsx       localStorage-saved recipes
│   ├── PrintCards.jsx       A6 print layout builder
│   └── ui/                  Shared components
├── data/
│   ├── coppaRecipes.js      All 27 house recipes
│   └── diffordsLinks.js     12 saved reference links
└── hooks/
    ├── useFavourites.js     localStorage favourites
    └── useCocktailDB.js     TheCocktailDB API hook
```

## Features

- **Book cover** with animated opening (tap to enter)
- **27 house recipes** fully detailed — ingredients, method, story, selling line, common mistakes, upsell, allergens
- **Flip cards** — image front, recipe back with inline batch calculator
- **Batch calculator** — scales any batchable recipe with bottle count and leftover calculations
- **TheCocktailDB search** — search thousands of cocktails, clearly badged as External
- **Difford's Guide links** — 12 saved reference cards with context notes
- **Training mode** — Stories, Selling Lines, Common Mistakes, Talking Points, Quick-Fire trivia
- **Favourites** — persist across sessions via localStorage
- **Print cards** — A6 format, select any combination of recipes
- **Art Deco design** — warm cream on dark, gold accents, Cormorant Garamond headers
