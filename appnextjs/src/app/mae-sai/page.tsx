'use client'

import { useRouter } from 'next/navigation'

export default function MaeSaiPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🏔️ Mae Sai
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The Northern Border Town
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              เมืองชายแดนภาคเหนือ
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🛍️ Border Market
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Cross-border shopping and local crafts
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏔️ Mountain Views
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Stunning mountain landscapes and nature
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🌿 Local Culture
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Hill tribe communities and traditions
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                🛍️ Markets
              </button>
              <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                🏔️ Nature
              </button>
              <button className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                🌿 Culture
              </button>
              <button className="p-3 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                🍜 Food
              </button>
            </div>
          </div>

          {/* Border Information */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              🚧 Border Information
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Mae Sai is Thailand's northernmost border town, connecting with Myanmar. 
              The border crossing is open daily for day trips and shopping.
            </p>
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
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
