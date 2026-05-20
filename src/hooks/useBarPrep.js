import { useState, useCallback } from 'react'

const KEY = 'bbb-barprep'

export function useBarPrep() {
  const [active, setActive] = useState(() => localStorage.getItem(KEY) === '1')

  const toggle = useCallback(() => {
    setActive(v => {
      const next = !v
      localStorage.setItem(KEY, next ? '1' : '0')
      return next
    })
  }, [])

  return { barPrep: active, toggleBarPrep: toggle }
}
