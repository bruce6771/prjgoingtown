// 城市坐标数据
interface CityCoordinates {
  name: string
  path: string
  latitude: number
  longitude: number
  country: string
}

export const cityCoordinates: CityCoordinates[] = [
  // 泰国主要城市
  { name: 'Bangkok', path: 'bangkok', latitude: 13.7563, longitude: 100.5018, country: 'Thailand' },
  { name: 'Chiang Mai', path: 'chiang-mai', latitude: 18.7883, longitude: 98.9853, country: 'Thailand' },
  { name: 'Chiang Rai', path: 'chiang-rai', latitude: 19.9105, longitude: 99.8404, country: 'Thailand' },
  { name: 'Phuket', path: 'phuket', latitude: 7.8804, longitude: 98.3923, country: 'Thailand' },
  { name: 'Pattaya', path: 'pattaya', latitude: 12.9236, longitude: 100.8825, country: 'Thailand' },
  { name: 'Krabi', path: 'krabi', latitude: 8.0863, longitude: 98.9063, country: 'Thailand' },
  { name: 'Koh Samui', path: 'koh-samui', latitude: 9.5018, longitude: 100.0000, country: 'Thailand' },
  { name: 'Koh Phangan', path: 'koh-phangan', latitude: 9.7500, longitude: 100.0333, country: 'Thailand' },
  { name: 'Koh Tao', path: 'koh-tao', latitude: 10.0956, longitude: 99.8381, country: 'Thailand' },
  { name: 'Ayutthaya', path: 'ayutthaya', latitude: 14.3692, longitude: 100.5877, country: 'Thailand' },
  { name: 'Sukhothai', path: 'sukhothai', latitude: 17.0061, longitude: 99.8233, country: 'Thailand' },
  { name: 'Kanchanaburi', path: 'kanchanaburi', latitude: 14.0228, longitude: 99.5328, country: 'Thailand' },
  { name: 'Hua Hin', path: 'hua-hin', latitude: 12.5684, longitude: 99.9576, country: 'Thailand' },
  { name: 'Cha-am', path: 'cha-am', latitude: 12.8000, longitude: 99.9667, country: 'Thailand' },
  { name: 'Khon Kaen', path: 'khon-kaen', latitude: 16.4419, longitude: 102.8360, country: 'Thailand' },
  { name: 'Udon Thani', path: 'udon-thani', latitude: 17.4138, longitude: 102.7873, country: 'Thailand' },
  { name: 'Nakhon Ratchasima', path: 'nakhon-ratchasima', latitude: 14.9799, longitude: 102.0978, country: 'Thailand' },
  { name: 'Ubon Ratchathani', path: 'ubon-ratchathani', latitude: 15.2448, longitude: 104.8473, country: 'Thailand' },
  { name: 'Hat Yai', path: 'hat-yai', latitude: 7.0084, longitude: 100.5003, country: 'Thailand' },
  { name: 'Surat Thani', path: 'surat-thani', latitude: 9.1382, longitude: 99.3215, country: 'Thailand' },
  { name: 'Nakhon Si Thammarat', path: 'nakhon-si-thammarat', latitude: 8.4304, longitude: 99.9631, country: 'Thailand' },
  { name: 'Trang', path: 'trang', latitude: 7.5563, longitude: 99.6114, country: 'Thailand' },
  { name: 'Krabi Town', path: 'krabi-town', latitude: 8.0863, longitude: 98.9063, country: 'Thailand' },
  { name: 'Ranong', path: 'ranong', latitude: 9.9658, longitude: 98.6348, country: 'Thailand' },
  { name: 'Chumphon', path: 'chumphon', latitude: 10.4930, longitude: 99.1800, country: 'Thailand' },
  { name: 'Mae Sai', path: 'mae-sai', latitude: 20.4333, longitude: 99.8833, country: 'Thailand' },
  { name: 'Singapore', path: 'singapore', latitude: 1.3521, longitude: 103.8198, country: 'Singapore' },
  { name: 'Kuala Lumpur', path: 'kuala-lumpur', latitude: 3.1390, longitude: 101.6869, country: 'Malaysia' },
  { name: 'Jakarta', path: 'jakarta', latitude: -6.2088, longitude: 106.8456, country: 'Indonesia' },
  { name: 'Manila', path: 'manila', latitude: 14.5995, longitude: 120.9842, country: 'Philippines' },
  { name: 'Ho Chi Minh City', path: 'ho-chi-minh', latitude: 10.8231, longitude: 106.6297, country: 'Vietnam' },
  { name: 'Hanoi', path: 'hanoi', latitude: 21.0285, longitude: 105.8542, country: 'Vietnam' },
  { name: 'Seoul', path: 'seoul', latitude: 37.5665, longitude: 126.9780, country: 'South Korea' },
  { name: 'Tokyo', path: 'tokyo', latitude: 35.6762, longitude: 139.6503, country: 'Japan' },
  { name: 'Osaka', path: 'osaka', latitude: 34.6937, longitude: 135.5023, country: 'Japan' },
  { name: 'Hong Kong', path: 'hong-kong', latitude: 22.3193, longitude: 114.1694, country: 'Hong Kong' },
  { name: 'Taipei', path: 'taipei', latitude: 25.0330, longitude: 121.5654, country: 'Taiwan' },
  // 中国主要城市
  { name: 'Beijing', path: 'beijing', latitude: 39.9042, longitude: 116.4074, country: 'China' },
  { name: 'Shanghai', path: 'shanghai', latitude: 31.2304, longitude: 121.4737, country: 'China' },
  { name: 'Guangzhou', path: 'guangzhou', latitude: 23.1291, longitude: 113.2644, country: 'China' },
  { name: 'Shenzhen', path: 'shenzhen', latitude: 22.5431, longitude: 114.0579, country: 'China' },
  { name: 'Chengdu', path: 'chengdu', latitude: 30.5728, longitude: 104.0668, country: 'China' },
  { name: 'Hangzhou', path: 'hangzhou', latitude: 30.2741, longitude: 120.1551, country: 'China' },
  { name: 'Wuhan', path: 'wuhan', latitude: 30.5928, longitude: 114.3055, country: 'China' },
  { name: 'Xi\'an', path: 'xian', latitude: 34.3416, longitude: 108.9398, country: 'China' },
  { name: 'Nanjing', path: 'nanjing', latitude: 32.0603, longitude: 118.7969, country: 'China' },
  { name: 'Tianjin', path: 'tianjin', latitude: 39.3434, longitude: 117.3616, country: 'China' },
  { name: 'Chongqing', path: 'chongqing', latitude: 29.4316, longitude: 106.9123, country: 'China' },
  { name: 'Suzhou', path: 'suzhou', latitude: 31.2989, longitude: 120.5853, country: 'China' },
  { name: 'Dongguan', path: 'dongguan', latitude: 23.0207, longitude: 113.7518, country: 'China' },
  { name: 'Foshan', path: 'foshan', latitude: 23.0215, longitude: 113.1214, country: 'China' },
  { name: 'Qingdao', path: 'qingdao', latitude: 36.0986, longitude: 120.3719, country: 'China' },
  { name: 'Dalian', path: 'dalian', latitude: 38.9140, longitude: 121.6147, country: 'China' },
  { name: 'Ningbo', path: 'ningbo', latitude: 29.8683, longitude: 121.5440, country: 'China' },
  { name: 'Xiamen', path: 'xiamen', latitude: 24.4798, longitude: 118.0819, country: 'China' },
  { name: 'Changsha', path: 'changsha', latitude: 28.2278, longitude: 112.9388, country: 'China' },
  { name: 'Zhengzhou', path: 'zhengzhou', latitude: 34.7466, longitude: 113.6254, country: 'China' },
  { name: 'Jinan', path: 'jinan', latitude: 36.6512, longitude: 117.1201, country: 'China' },
  { name: 'Harbin', path: 'harbin', latitude: 45.7732, longitude: 126.6577, country: 'China' },
  { name: 'Shenyang', path: 'shenyang', latitude: 41.8057, longitude: 123.4315, country: 'China' },
  { name: 'Kunming', path: 'kunming', latitude: 25.0389, longitude: 102.7183, country: 'China' },
  { name: 'Nanchang', path: 'nanchang', latitude: 28.6820, longitude: 115.8579, country: 'China' },
  { name: 'Fuzhou', path: 'fuzhou', latitude: 26.0745, longitude: 119.2965, country: 'China' },
  { name: 'Shijiazhuang', path: 'shijiazhuang', latitude: 38.0428, longitude: 114.5149, country: 'China' },
  { name: 'Taiyuan', path: 'taiyuan', latitude: 37.8706, longitude: 112.5489, country: 'China' },
  { name: 'Hefei', path: 'hefei', latitude: 31.8206, longitude: 117.2272, country: 'China' },
  { name: 'Nanning', path: 'nanning', latitude: 22.8170, longitude: 108.3669, country: 'China' },
  { name: 'Guiyang', path: 'guiyang', latitude: 26.6470, longitude: 106.6302, country: 'China' },
  { name: 'Lanzhou', path: 'lanzhou', latitude: 36.0611, longitude: 103.8343, country: 'China' },
  { name: 'Urumqi', path: 'urumqi', latitude: 43.8256, longitude: 87.6168, country: 'China' },
  { name: 'Hohhot', path: 'hohhot', latitude: 40.8414, longitude: 111.7519, country: 'China' },
  { name: 'Yinchuan', path: 'yinchuan', latitude: 38.4872, longitude: 106.2309, country: 'China' },
  { name: 'Xining', path: 'xining', latitude: 36.6232, longitude: 101.7782, country: 'China' },
  { name: 'Lhasa', path: 'lhasa', latitude: 29.6520, longitude: 91.1721, country: 'China' },
  { name: 'Sydney', path: 'sydney', latitude: -33.8688, longitude: 151.2093, country: 'Australia' },
  { name: 'Melbourne', path: 'melbourne', latitude: -37.8136, longitude: 144.9631, country: 'Australia' },
  { name: 'London', path: 'london', latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom' },
  { name: 'Paris', path: 'paris', latitude: 48.8566, longitude: 2.3522, country: 'France' },
  { name: 'Berlin', path: 'berlin', latitude: 52.5200, longitude: 13.4050, country: 'Germany' },
  { name: 'Amsterdam', path: 'amsterdam', latitude: 52.3676, longitude: 4.9041, country: 'Netherlands' },
  { name: 'New York', path: 'new-york', latitude: 40.7128, longitude: -74.0060, country: 'United States' },
  { name: 'Los Angeles', path: 'los-angeles', latitude: 34.0522, longitude: -118.2437, country: 'United States' },
  { name: 'San Francisco', path: 'san-francisco', latitude: 37.7749, longitude: -122.4194, country: 'United States' },
  { name: 'Toronto', path: 'toronto', latitude: 43.6532, longitude: -79.3832, country: 'Canada' },
  { name: 'Vancouver', path: 'vancouver', latitude: 49.2827, longitude: -123.1207, country: 'Canada' }
]

// 计算两点之间的距离（使用 Haversine 公式）
export function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371 // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// 找到最近的城市
export function findNearestCity(
  userLat: number, 
  userLon: number, 
  maxDistance: number = 500 // 最大距离（公里）
): (CityCoordinates & { distance: number }) | null {
  let nearestCity: (CityCoordinates & { distance: number }) | null = null
  let minDistance = Infinity

  for (const city of cityCoordinates) {
    const distance = calculateDistance(userLat, userLon, city.latitude, city.longitude)
    
    if (distance < minDistance && distance <= maxDistance) {
      minDistance = distance
      nearestCity = { ...city, distance }
    }
  }

  return nearestCity
}

// 获取用户附近的多个城市（按距离排序）
export function getNearbyCities(
  userLat: number, 
  userLon: number, 
  maxDistance: number = 1000, // 最大距离（公里）
  limit: number = 5 // 返回的城市数量
): Array<CityCoordinates & { distance: number }> {
  const citiesWithDistance = cityCoordinates
    .map(city => ({
      ...city,
      distance: calculateDistance(userLat, userLon, city.latitude, city.longitude)
    }))
    .filter(city => city.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)

  return citiesWithDistance
}
