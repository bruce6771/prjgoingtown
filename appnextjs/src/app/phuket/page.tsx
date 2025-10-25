'use client'

import { useRouter } from 'next/navigation'

export default function PhuketPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🏝️ Phuket
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The Pearl of the Andaman
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              ไข่มุกแห่งอันดามัน
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏖️ Beaches & Islands
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Beautiful beaches and island hopping adventures
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🤿 Water Activities
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Diving, snorkeling, and water sports
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🌅 Sunset Views
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Stunning sunsets and romantic dining
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                🏖️ Beaches
              </button>
              <button className="p-3 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors">
                🤿 Diving
              </button>
              <button className="p-3 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                🚤 Island Tours
              </button>
              <button className="p-3 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors">
                🌅 Sunset
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={() => router.push('/city-select')}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-4"
            >
              Change City
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
