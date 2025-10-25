'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useGeolocation } from '@/hooks/useGeolocation'
import { getNearbyCities, findNearestCity } from '@/utils/cityDistance'
import { getCityName } from '@/utils/cityNames'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { t } = useLanguage()
  const router = useRouter()
  const { latitude, longitude, city, country, loading, error } = useGeolocation()
  const [userIP, setUserIP] = useState<string>('')
  const [nearbyCities, setNearbyCities] = useState<Array<{ name: string; path: string; country: string; distance: number }>>([])
  const [currentCity, setCurrentCity] = useState<{ name: string; path: string; country: string; distance: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown')
  const [ipLocation, setIpLocation] = useState<{ city: string; country: string; latitude: number; longitude: number } | null>(null)
  const [locationSource, setLocationSource] = useState<'gps' | 'ip' | 'none'>('none')

  // 获取用户 IP 和位置信息
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setUserIP(data.ip)
        // 使用 IP 地址获取位置信息
        return fetch(`https://ipapi.co/${data.ip}/json/`)
      })
      .then(res => res.json())
      .then(data => {
        if (data.city && data.country && data.latitude && data.longitude) {
          setIpLocation({
            city: data.city,
            country: data.country_name || data.country,
            latitude: data.latitude,
            longitude: data.longitude
          })
        }
      })
      .catch(() => {
        setUserIP('Unknown')
      })
  }, [])

  // 检查地理位置权限状态
  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
        setLocationPermission(result.state)
        
        // 监听权限状态变化
        result.addEventListener('change', () => {
          setLocationPermission(result.state)
        })
      }).catch(() => {
        setLocationPermission('unknown')
      })
    } else {
      setLocationPermission('unknown')
    }
  }, [])

  // 获取附近城市和当前城市
  useEffect(() => {
    let currentLat: number | null = null
    let currentLon: number | null = null
    let source: 'gps' | 'ip' | 'none' = 'none'

    // 优先使用 GPS 位置
    if (latitude && longitude && locationPermission === 'granted') {
      currentLat = latitude
      currentLon = longitude
      source = 'gps'
    }
    // 如果没有 GPS 权限，使用 IP 位置
    else if (ipLocation && (locationPermission === 'denied' || locationPermission === 'prompt')) {
      currentLat = ipLocation.latitude
      currentLon = ipLocation.longitude
      source = 'ip'
    }

    if (currentLat && currentLon) {
      setLocationSource(source)
      
      // 找到当前城市
      const nearest = findNearestCity(currentLat, currentLon, 100)
      if (nearest) {
        setCurrentCity({
          name: nearest.name,
          path: nearest.path,
          country: nearest.country,
          distance: Math.round(nearest.distance)
        })
      }

      // 获取附近城市
      const nearby = getNearbyCities(currentLat, currentLon, 1000, 6)
        .filter(city => city.distance > 0) // 排除距离为0的当前城市
        .slice(0, 5)
        .map(city => ({
          name: city.name,
          path: city.path,
          country: city.country,
          distance: Math.round(city.distance)
        }))
      
      setNearbyCities(nearby)
    }
  }, [latitude, longitude, ipLocation, locationPermission])

  const handleCitySelect = (cityPath: string) => {
    router.push(`/${cityPath}`)
  }

  const handleManualSelect = () => {
    router.push('/city-select')
  }

  const handleLocationPermission = async () => {
    if (locationPermission === 'granted') {
      // 如果已授权，显示关闭提示
      if (confirm('您已开启地理位置权限。要关闭权限，请在浏览器设置中手动关闭。\n\n是否打开浏览器设置？')) {
        // 尝试打开浏览器设置（某些浏览器支持）
        window.open('chrome://settings/content/location', '_blank')
      }
    } else {
      // 如果未授权，请求权限
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          })
        })
        
        // 权限获取成功，刷新页面以更新状态
        window.location.reload()
      } catch (err) {
        alert('无法获取地理位置权限。请在浏览器设置中允许此网站访问您的位置。')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🌍 {t('city.welcome')} GoingTown
          </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover your location and nearby cities
            </p>
          </div>

          {/* 位置信息卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 用户信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                📍 位置信息
              </h3>
              
              {/* 权限状态 */}
              <div className="mb-4 p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    地理位置权限:
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    locationPermission === 'granted' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : locationPermission === 'denied'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {locationPermission === 'granted' ? '已授权' : 
                     locationPermission === 'denied' ? '已拒绝' : 
                     locationPermission === 'prompt' ? '待授权' : '未知'}
                  </span>
                </div>
                <button
                  onClick={handleLocationPermission}
                  className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                    locationPermission === 'granted'
                      ? 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
                  }`}
                >
                  {locationPermission === 'granted' ? '🔒 管理位置权限' : '🔓 开启位置权限'}
                </button>
              </div>
              
              {loading && (
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>正在获取位置信息...</span>
                </div>
              )}

              {error && (
                <div className="text-red-600 dark:text-red-400 mb-4">
                  <p className="font-semibold">位置获取失败</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {!loading && !error && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">IP 地址:</span>
                    <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {userIP}
                    </span>
                  </div>
                  
                  {/* 位置来源和精度提示 */}
                  {locationSource !== 'none' && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          {locationSource === 'gps' ? '📍 GPS 定位' : '🌐 IP 定位'}
                        </span>
                        {locationSource === 'ip' && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full">
                            可能有误差
                          </span>
                        )}
                      </div>
                      {locationSource === 'ip' && (
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          IP 定位基于网络服务商位置，可能与实际位置有偏差
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* GPS 坐标 */}
                  {latitude && longitude && locationSource === 'gps' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">GPS 纬度:</span>
                        <span className="font-mono text-sm">{latitude.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">GPS 经度:</span>
                        <span className="font-mono text-sm">{longitude.toFixed(6)}</span>
                      </div>
                    </>
                  )}

                  {/* IP 坐标 */}
                  {ipLocation && locationSource === 'ip' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">IP 纬度:</span>
                        <span className="font-mono text-sm">{ipLocation.latitude.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">IP 经度:</span>
                        <span className="font-mono text-sm">{ipLocation.longitude.toFixed(6)}</span>
                      </div>
                    </>
                  )}

                  {/* 检测到的城市 */}
                  {(city || ipLocation?.city) && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">检测到城市:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {locationSource === 'gps' ? `${city}, ${country}` : `${ipLocation?.city}, ${ipLocation?.country}`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 当前城市 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                🏙️ 当前城市
              </h3>
              
              {currentCity ? (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                        {getCityName(currentCity.path, t)}
                      </h4>
                      {locationSource === 'ip' && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full">
                          IP 定位
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {currentCity.country}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      📍 距离约 {currentCity.distance}km
                      {locationSource === 'ip' && (
                        <span className="text-yellow-600 dark:text-yellow-400 ml-1">
                          (基于 IP 定位，可能有误差)
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCitySelect(currentCity.path)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    访问 {getCityName(currentCity.path, t)}
                  </button>
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                  {loading ? '正在检测城市...' : '未检测到附近城市'}
                </div>
              )}
            </div>
          </div>

          {/* 附近城市 */}
          {nearbyCities.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  🌟 附近城市
                </h3>
                {locationSource === 'ip' && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full">
                    基于 IP 定位
                  </span>
                )}
              </div>
              {locationSource === 'ip' && (
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ 基于 IP 地址的定位可能不够精确，建议开启 GPS 定位以获得更准确的结果
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearbyCities.map((city) => (
                  <button
                    key={city.path}
                    onClick={() => handleCitySelect(city.path)}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {getCityName(city.path, t)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {city.country}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      📍 {city.distance}km away
                      {locationSource === 'ip' && (
                        <span className="text-yellow-600 dark:text-yellow-400 ml-1">
                          (可能有误差)
                        </span>
                      )}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="text-center space-x-4">
            <button
              onClick={handleManualSelect}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {t('city.select')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新检测位置
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}