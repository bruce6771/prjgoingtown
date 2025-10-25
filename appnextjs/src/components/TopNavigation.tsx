'use client'

import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export function TopNavigation() {
  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      <div className="flex items-center space-x-3">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </div>
  )
}
