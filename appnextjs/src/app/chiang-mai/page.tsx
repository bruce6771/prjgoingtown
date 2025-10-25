'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { NearbyCities } from '@/components/NearbyCities'
import { LocalRadio } from '@/components/LocalRadio'

export default function ChiangMaiPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🏔️ Chiang Mai
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The Rose of the North
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              ดอกกุหลาบแห่งภาคเหนือ
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏛️ Temples & Culture
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore ancient temples and rich Lanna culture
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏔️ Mountains & Nature
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Trekking, waterfalls, and mountain adventures
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🛍️ Night Markets
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Famous Sunday Walking Street and local crafts
              </p>
            </div>
          </div>

          {/* Local Radio */}
          <LocalRadio 
            cityName="chiang-mai"
            country="Thailand"
          />

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-3 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                🏛️ Temples
              </button>
              <button className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                🏔️ Trekking
              </button>
              <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                🛍️ Markets
              </button>
              <button className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                🍜 Food
              </button>
            </div>
          </div>

          {/* 附近城市 */}
          <NearbyCities 
            currentCityPath="chiang-mai"
            userLat={18.7883}
            userLon={98.9853}
          />

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={() => router.push('/city-select')}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-4"
            >
              {t('nav.otherCities')}
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              {t('nav.home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
