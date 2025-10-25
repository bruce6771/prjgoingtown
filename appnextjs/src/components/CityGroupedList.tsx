'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { cityCoordinates } from '@/utils/cityDistance'
import { getCityName } from '@/utils/cityNames'
import { useState } from 'react'

interface CityGroupedListProps {
  userLat?: number
  userLon?: number
  showNearby?: boolean
}

export function CityGroupedList({ userLat, userLon, showNearby = true }: CityGroupedListProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [groupByCountry, setGroupByCountry] = useState(true)

  const handleCitySelect = (cityPath: string) => {
    router.push(`/${cityPath}`)
  }

  // 按国家分组城市
  const groupedCities = cityCoordinates.reduce((acc, city) => {
    if (!acc[city.country]) {
      acc[city.country] = []
    }
    acc[city.country].push(city)
    return acc
  }, {} as Record<string, typeof cityCoordinates>)

  // 获取热门城市（泰国的主要城市）
  const popularCities = cityCoordinates.filter(city => 
    city.country === 'Thailand' && 
    ['bangkok', 'chiang-mai', 'phuket', 'pattaya', 'krabi', 'koh-samui'].includes(city.path)
  )

  return (
    <div className="space-y-8">
      {/* 控制选项 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={groupByCountry}
              onChange={(e) => setGroupByCountry(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('city.groupByCountry')}
            </span>
          </label>
        </div>
      </div>

      {/* 热门城市 */}
      {showNearby && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🌟 {t('city.popularCities')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularCities.map((city) => (
              <button
                key={city.path}
                onClick={() => handleCitySelect(city.path)}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-200 dark:border-blue-800 text-left"
              >
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                  {getCityName(city.path, t)}
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {city.country}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 城市列表 */}
      {groupByCountry ? (
        // 按国家分组显示
        <div className="space-y-6">
          {Object.entries(groupedCities).map(([country, cities]) => (
            <div key={country} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">
                  {country === 'Thailand' ? '🇹🇭' : 
                   country === 'Singapore' ? '🇸🇬' :
                   country === 'Malaysia' ? '🇲🇾' :
                   country === 'Vietnam' ? '🇻🇳' :
                   country === 'Indonesia' ? '🇮🇩' :
                   country === 'Philippines' ? '🇵🇭' :
                   country === 'China' ? '🇨🇳' :
                   country === 'Japan' ? '🇯🇵' :
                   country === 'South Korea' ? '🇰🇷' :
                   country === 'United States' ? '🇺🇸' :
                   country === 'United Kingdom' ? '🇬🇧' :
                   country === 'France' ? '🇫🇷' :
                   country === 'Germany' ? '🇩🇪' :
                   country === 'Australia' ? '🇦🇺' :
                   country === 'Canada' ? '🇨🇦' : '🌍'}
                </span>
                {country}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({cities.length} {cities.length === 1 ? 'city' : 'cities'})
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cities.map((city) => (
                  <button
                    key={city.path}
                    onClick={() => handleCitySelect(city.path)}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {getCityName(city.path, t)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {city.country}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 平铺显示所有城市
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('city.allCities')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cityCoordinates.map((city) => (
              <button
                key={city.path}
                onClick={() => handleCitySelect(city.path)}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {getCityName(city.path, t)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {city.country}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
