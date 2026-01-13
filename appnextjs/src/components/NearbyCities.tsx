'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getNearbyCities, cityCoordinates } from '@/utils/cityDistance'
import { getCityName } from '@/utils/cityNames'
import { useEffect, useState } from 'react'

interface NearbyCitiesProps {
  currentCityPath: string
  userLat?: number
  userLon?: number
}

export function NearbyCities({ currentCityPath, userLat, userLon }: NearbyCitiesProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [nearbyCities, setNearbyCities] = useState<Array<{ name: string; path: string; country: string; distance: number }>>([])

  useEffect(() => {
    if (userLat && userLon) {
      // 获取附近城市，排除当前城市
      const nearby = getNearbyCities(userLat, userLon, 1000, 6) // 1000公里范围内，最多6个城市
        .filter(city => city.path !== currentCityPath) // 排除当前城市
        .slice(0, 5) // 只显示前5个

      const formattedNearby = nearby.map(city => ({
        name: city.name,
        path: city.path,
        country: city.country,
        distance: Math.round(city.distance)
      }))
      
      setNearbyCities(formattedNearby)
    } else {
      // 如果没有用户位置，显示一些热门城市
      const popularCities = cityCoordinates
        .filter(city => city.path !== currentCityPath)
        .slice(0, 5)
        .map(city => ({
          name: city.name,
          path: city.path,
          country: city.country,
          distance: 0 // 显示为热门城市
        }))
      
      setNearbyCities(popularCities)
    }
  }, [currentCityPath, userLat, userLon])

  const handleCitySelect = (cityPath: string) => {
    router.push(`/${cityPath}`)
  }

  if (nearbyCities.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        📍 {t('city.nearbyCities')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyCities.map((city) => (
          <button
            key={city.path}
            onClick={() => handleCitySelect(city.path)}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-200 dark:border-blue-800 text-left"
          >
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">
              {getCityName(city.path, t)}
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {city.country}
            </p>
            {city.distance > 0 && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                📍 {city.distance} {t('city.distance')}
              </p>
            )}
          </button>
        ))}
      </div>
      
      {/* 查看所有城市按钮 */}
      <div className="mt-4 text-center">
        <button
          onClick={() => router.push('/city-select')}
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
        >
          {t('nav.otherCities')}
        </button>
      </div>
    </div>
  )
}
