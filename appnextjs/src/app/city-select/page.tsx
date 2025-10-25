'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { getNearbyCities, cityCoordinates } from '@/utils/cityDistance'
import { useLanguage } from '@/contexts/LanguageContext'
import { CityGroupedList } from '@/components/CityGroupedList'

function CitySelectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [nearbyCities, setNearbyCities] = useState<Array<{ name: string; path: string; country: string; distance: number }>>([])
  const [showNearby, setShowNearby] = useState(false)

  useEffect(() => {
    const nearby = searchParams.get('nearby')
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (nearby === 'true' && lat && lon) {
      const nearby = getNearbyCities(parseFloat(lat), parseFloat(lon), 1000, 5)
      const formattedNearby = nearby.map(city => ({
        name: city.name,
        path: city.path,
        country: city.country,
        distance: Math.round(city.distance)
      }))
      setNearbyCities(formattedNearby)
      setShowNearby(true)
    }
  }, [searchParams])

  const handleCitySelect = (cityPath: string) => {
    router.push(`/${cityPath}`)
  }

  // 所有支持的城市
  const allCities = cityCoordinates.map(city => ({
    name: city.name,
    path: city.path,
    country: city.country
  }))

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('city.select')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('city.selectDescription')}
            </p>
          </div>

          {/* 附近城市推荐 */}
          {showNearby && nearbyCities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📍 {t('city.nearby')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {nearbyCities.map((city) => (
                  <button
                    key={city.path}
                    onClick={() => handleCitySelect(city.path)}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800 text-left"
                  >
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      {city.name}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {city.country}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      📍 {city.distance}km away
                    </p>
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('city.allCities')}
                </h3>
              </div>
            </div>
          )}

          {/* 城市列表 - 使用分组组件 */}
          <CityGroupedList 
            userLat={showNearby && nearbyCities.length > 0 ? parseFloat(searchParams.get('lat') || '0') : undefined}
            userLon={showNearby && nearbyCities.length > 0 ? parseFloat(searchParams.get('lon') || '0') : undefined}
            showNearby={showNearby}
          />

          <div className="text-center mt-8">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {t('nav.back')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CitySelect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cities...</p>
        </div>
      </div>
    }>
      <CitySelectContent />
    </Suspense>
  )
}
