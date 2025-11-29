import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:scale-110 transition z-50"
      title="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
