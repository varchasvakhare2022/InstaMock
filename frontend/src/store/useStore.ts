import { create } from 'zustand'

interface GenerationResult {
  jsx_code: string
  component_name: string
  type: 'text' | 'image'
  input: string
  timestamp: number
}

interface StoreState {
  currentResult: GenerationResult | null
  darkMode: boolean
  setCurrentResult: (result: GenerationResult | null) => void
  toggleDarkMode: () => void
}

// Initialize dark mode from localStorage
const getInitialDarkMode = () => {
  const stored = localStorage.getItem('darkMode')
  if (stored !== null) return stored === 'true'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useStore = create<StoreState>((set) => ({
  currentResult: null,
  darkMode: getInitialDarkMode(),
  setCurrentResult: (result) => set({ currentResult: result }),
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode
      if (newMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
      return { darkMode: newMode }
    }),
}))

