'use client'

import { useTheme } from '@/contexts/ThemeContext'

export function ThemeTest() {
  const { theme } = useTheme()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Theme Test
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Current theme: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{theme}</span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
        This text should change color when you toggle the theme.
      </p>
    </div>
  )
}
