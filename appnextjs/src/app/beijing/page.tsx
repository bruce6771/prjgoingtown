'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { NearbyCities } from '@/components/NearbyCities'
import { LocalRadio } from '@/components/LocalRadio'

export default function BeijingPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🏛️ 北京
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Welcome to the Capital of China
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              中华人民共和国的首都
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏮 历史文化
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                探索紫禁城、天安门广场、长城等世界文化遗产，感受千年古都的历史底蕴。
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🍜 美食文化
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                品尝北京烤鸭、炸酱面、豆汁等传统美食，体验地道的京味文化。
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏢 现代都市
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                体验CBD商务区、三里屯、798艺术区等现代都市风貌。
              </p>
            </div>
          </div>

          {/* Local Radio */}
          <LocalRadio 
            cityName="beijing"
            country="China"
          />

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('city.quickActions')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                🍽️ 美食推荐
              </button>
              <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                🚇 交通指南
              </button>
              <button className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                🏨 住宿推荐
              </button>
              <button className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                🎯 景点攻略
              </button>
            </div>
          </div>

          {/* 附近城市 */}
          <NearbyCities 
            currentCityPath="beijing"
            userLat={39.9042}
            userLon={116.4074}
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
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('nav.home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
