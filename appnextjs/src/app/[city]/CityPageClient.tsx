'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { cityCoordinates } from '@/utils/cityDistance'
import { NearbyCities } from '@/components/NearbyCities'

interface CityPageClientProps {
  city: string
}

export default function CityPageClient({ city }: CityPageClientProps) {
  const router = useRouter()
  const { t } = useLanguage()

  // 查找城市信息
  const cityInfo = cityCoordinates.find(c => c.path === city)

  if (!cityInfo) {
    // 如果找不到城市信息，重定向到城市选择页面
    router.push('/city-select')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🏙️ {cityInfo.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('city.welcome')} {cityInfo.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {cityInfo.country}
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-pulse">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('common.comingSoon')}</h3>
                <p className="text-blue-100">We're working on creating an amazing experience for {cityInfo.name}</p>
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🍜 {t('bangkok.food')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Discover local cuisine and dining experiences in {cityInfo.name}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏛️ {t('bangkok.temples')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore cultural sites and attractions in {cityInfo.name}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🛍️ {t('bangkok.shopping')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find shopping centers and local markets in {cityInfo.name}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('city.quickActions')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-3 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                🍽️ {t('bangkok.findFood')}
              </button>
              <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                🚗 {t('bangkok.transportation')}
              </button>
              <button className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                🏨 {t('bangkok.hotels')}
              </button>
              <button className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                🎯 {t('bangkok.attractions')}
              </button>
            </div>
          </div>

          {/* Development Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              🚧 {t('common.underDevelopment')}
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              {t('common.developmentNotice')}
            </p>
          </div>

          {/* 附近城市 */}
          <NearbyCities 
            currentCityPath={city}
            userLat={cityInfo.latitude}
            userLon={cityInfo.longitude}
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('nav.home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
