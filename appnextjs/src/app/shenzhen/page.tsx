'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { NearbyCities } from '@/components/NearbyCities'

export default function ShenzhenPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 深圳
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Welcome to the Silicon Valley of China
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              中国硅谷，创新之城
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                💻 科技创新
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                探索华为、腾讯、大疆等科技巨头，感受中国硅谷的创新活力。
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🏙️ 现代都市
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                体验福田CBD、南山科技园、前海自贸区等现代化城市风貌。
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🛍️ 购物天堂
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                逛华强北、东门老街、海岸城等购物区，享受购物的乐趣。
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('city.quickActions')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-3 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors">
                💻 科技园区
              </button>
              <button className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                🚇 地铁出行
              </button>
              <button className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                🏨 酒店预订
              </button>
              <button className="p-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                🎯 景点攻略
              </button>
            </div>
          </div>

          {/* 附近城市 */}
          <NearbyCities 
            currentCityPath="shenzhen"
            userLat={22.5431}
            userLon={114.0579}
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
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              {t('nav.home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

