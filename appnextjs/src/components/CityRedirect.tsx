'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGeolocation } from '@/hooks/useGeolocation'
import { findNearestCity, getNearbyCities } from '@/utils/cityDistance'

interface CityRedirectProps {
  onRedirect?: (city: string) => void
  fallbackPath?: string
}

// 城市名称映射，将英文城市名转换为URL友好的格式
const cityMapping: Record<string, string> = {
  'Bangkok': 'bangkok',
  'Bangkok Metropolitan': 'bangkok',
  'Krung Thep': 'bangkok',
  'Bangkok Noi': 'bangkok',
  'Bangkok Yai': 'bangkok',
  'Chatuchak': 'bangkok',
  'Dusit': 'bangkok',
  'Huai Khwang': 'bangkok',
  'Klong Toey': 'bangkok',
  'Lak Si': 'bangkok',
  'Lat Krabang': 'bangkok',
  'Min Buri': 'bangkok',
  'Nong Chok': 'bangkok',
  'Pathum Wan': 'bangkok',
  'Phaya Thai': 'bangkok',
  'Phra Khanong': 'bangkok',
  'Pom Prap Sattru Phai': 'bangkok',
  'Prawet': 'bangkok',
  'Rat Burana': 'bangkok',
  'Ratchathewi': 'bangkok',
  'Sai Mai': 'bangkok',
  'Samphanthawong': 'bangkok',
  'Saphan Sung': 'bangkok',
  'Sathon': 'bangkok',
  'Suan Luang': 'bangkok',
  'Taling Chan': 'bangkok',
  'Thawi Watthana': 'bangkok',
  'Thon Buri': 'bangkok',
  'Thung Khru': 'bangkok',
  'Vadhana': 'bangkok',
  'Wang Thonglang': 'bangkok',
  'Watthana': 'bangkok',
  'Yan Nawa': 'bangkok',
  'Bangkok Province': 'bangkok',
  'Krung Thep Maha Nakhon': 'bangkok',
  // 可以添加更多城市
  'Singapore': 'singapore',
  'Kuala Lumpur': 'kuala-lumpur',
  'Jakarta': 'jakarta',
  'Manila': 'manila',
  'Ho Chi Minh City': 'ho-chi-minh',
  'Hanoi': 'hanoi',
  'Seoul': 'seoul',
  'Tokyo': 'tokyo',
  'Osaka': 'osaka',
  'Hong Kong': 'hong-kong',
  'Taipei': 'taipei',
  'Shanghai': 'shanghai',
  'Beijing': 'beijing',
  'Guangzhou': 'guangzhou',
  'Shenzhen': 'shenzhen',
  'Sydney': 'sydney',
  'Melbourne': 'melbourne',
  'London': 'london',
  'Paris': 'paris',
  'Berlin': 'berlin',
  'Amsterdam': 'amsterdam',
  'New York': 'new-york',
  'Los Angeles': 'los-angeles',
  'San Francisco': 'san-francisco',
  'Toronto': 'toronto',
  'Vancouver': 'vancouver'
}

export const CityRedirect: React.FC<CityRedirectProps> = ({ 
  onRedirect, 
  fallbackPath = '/' 
}) => {
  const { city, latitude, longitude, loading, error } = useGeolocation()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (error) {
      console.warn('Geolocation error:', error)
      // 如果获取位置失败，跳转到城市选择页面
      if (fallbackPath !== '/') {
        router.push(fallbackPath)
      }
      return
    }

    if (city && latitude && longitude) {
      // 1. 首先尝试精确匹配城市名称
      const cityKey = Object.keys(cityMapping).find(key => 
        city.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(city.toLowerCase())
      )

      if (cityKey) {
        const cityPath = cityMapping[cityKey]
        const redirectUrl = `/${cityPath}`
        
        console.log(`✅ Exact city match: ${redirectUrl} (detected city: ${city})`)
        
        if (onRedirect) {
          onRedirect(cityPath)
        }
        
        router.push(redirectUrl)
        return
      }

      // 2. 如果没有精确匹配，尝试找到最近的支持城市
      console.log(`🔍 No exact match for city: ${city}, finding nearest supported city...`)
      
      const nearestCity = findNearestCity(latitude, longitude, 500) // 500公里范围内
      
      if (nearestCity) {
        const redirectUrl = `/${nearestCity.path}`
        
        console.log(`📍 Nearest city found: ${redirectUrl} (${nearestCity.name}, ${Math.round(nearestCity.distance)}km away)`)
        
        if (onRedirect) {
          onRedirect(nearestCity.path)
        }
        
        router.push(redirectUrl)
        return
      }

      // 3. 如果连最近的城市都找不到，显示附近城市选择
      console.log(`❌ No supported cities found within 500km`)
      const nearbyCities = getNearbyCities(latitude, longitude, 1000, 5) // 1000公里范围内，最多5个城市
      
      if (nearbyCities.length > 0) {
        console.log(`🏙️ Found ${nearbyCities.length} nearby cities:`, nearbyCities.map(c => `${c.name} (${Math.round(c.distance)}km)`))
        // 跳转到城市选择页面，但可以预选附近城市
        router.push(`${fallbackPath}?nearby=true&lat=${latitude}&lon=${longitude}`)
        return
      }

      // 4. 最后的选择：跳转到城市选择页面
      console.log(`🌍 No nearby cities found, redirecting to city selection`)
      if (fallbackPath !== '/') {
        router.push(fallbackPath)
      }
    }
  }, [city, latitude, longitude, loading, error, router, onRedirect, fallbackPath])

  // 显示加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    )
  }

  // 如果出错，显示错误信息
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Unable to detect your location</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return null
}
