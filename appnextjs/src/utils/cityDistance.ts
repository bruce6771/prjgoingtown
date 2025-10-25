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
  // 马来西亚主要城市
  { name: 'George Town', path: 'george-town', latitude: 5.4164, longitude: 100.3327, country: 'Malaysia' },
  { name: 'Johor Bahru', path: 'johor-bahru', latitude: 1.4927, longitude: 103.7414, country: 'Malaysia' },
  { name: 'Ipoh', path: 'ipoh', latitude: 4.5841, longitude: 101.0829, country: 'Malaysia' },
  { name: 'Shah Alam', path: 'shah-alam', latitude: 3.0733, longitude: 101.5185, country: 'Malaysia' },
  { name: 'Petaling Jaya', path: 'petaling-jaya', latitude: 3.1073, longitude: 101.6085, country: 'Malaysia' },
  { name: 'Kuching', path: 'kuching', latitude: 1.5533, longitude: 110.3591, country: 'Malaysia' },
  { name: 'Kota Kinabalu', path: 'kota-kinabalu', latitude: 5.9804, longitude: 116.0735, country: 'Malaysia' },
  { name: 'Klang', path: 'klang', latitude: 3.0333, longitude: 101.4500, country: 'Malaysia' },
  { name: 'Subang Jaya', path: 'subang-jaya', latitude: 3.0438, longitude: 101.5806, country: 'Malaysia' },
  { name: 'Kuala Terengganu', path: 'kuala-terengganu', latitude: 5.3302, longitude: 103.1408, country: 'Malaysia' },
  { name: 'Kota Bharu', path: 'kota-bharu', latitude: 6.1333, longitude: 102.2500, country: 'Malaysia' },
  { name: 'Alor Setar', path: 'alor-setar', latitude: 6.1167, longitude: 100.3667, country: 'Malaysia' },
  { name: 'Seremban', path: 'seremban', latitude: 2.7297, longitude: 101.9381, country: 'Malaysia' },
  { name: 'Malacca', path: 'malacca', latitude: 2.2054, longitude: 102.2461, country: 'Malaysia' },
  { name: 'Kuantan', path: 'kuantan', latitude: 3.8077, longitude: 103.3260, country: 'Malaysia' },
  { name: 'Taiping', path: 'taiping', latitude: 4.8500, longitude: 100.7333, country: 'Malaysia' },
  { name: 'Kulim', path: 'kulim', latitude: 5.3667, longitude: 100.5500, country: 'Malaysia' },
  { name: 'Batu Pahat', path: 'batu-pahat', latitude: 1.8500, longitude: 102.9333, country: 'Malaysia' },
  { name: 'Sandakan', path: 'sandakan', latitude: 5.8402, longitude: 118.1179, country: 'Malaysia' },
  { name: 'Tawau', path: 'tawau', latitude: 4.2448, longitude: 117.8911, country: 'Malaysia' },
  { name: 'Miri', path: 'miri', latitude: 4.4148, longitude: 114.0089, country: 'Malaysia' },
  { name: 'Sibu', path: 'sibu', latitude: 2.3000, longitude: 111.8167, country: 'Malaysia' },
  { name: 'Kangar', path: 'kangar', latitude: 6.4333, longitude: 100.2000, country: 'Malaysia' },
  { name: 'Kuala Selangor', path: 'kuala-selangor', latitude: 3.3500, longitude: 101.2500, country: 'Malaysia' },
  { name: 'Teluk Intan', path: 'teluk-intan', latitude: 4.0167, longitude: 101.0167, country: 'Malaysia' },
  { name: 'Temerloh', path: 'temerloh', latitude: 3.4500, longitude: 102.4167, country: 'Malaysia' },
  { name: 'Kuala Lipis', path: 'kuala-lipis', latitude: 4.1833, longitude: 102.0500, country: 'Malaysia' },
  { name: 'Raub', path: 'raub', latitude: 3.8000, longitude: 101.8500, country: 'Malaysia' },
  { name: 'Bentong', path: 'bentong', latitude: 3.5167, longitude: 101.9000, country: 'Malaysia' },
  { name: 'Mentakab', path: 'mentakab', latitude: 3.4833, longitude: 102.3500, country: 'Malaysia' },
  { name: 'Kuala Pilah', path: 'kuala-pilah', latitude: 2.7333, longitude: 102.2500, country: 'Malaysia' },
  { name: 'Port Dickson', path: 'port-dickson', latitude: 2.5167, longitude: 101.8000, country: 'Malaysia' },
  { name: 'Lukut', path: 'lukut', latitude: 2.5667, longitude: 101.8167, country: 'Malaysia' },
  { name: 'Senawang', path: 'senawang', latitude: 2.6833, longitude: 101.9500, country: 'Malaysia' },
  { name: 'Bahau', path: 'bahau', latitude: 2.8167, longitude: 102.4167, country: 'Malaysia' },
  { name: 'Gemas', path: 'gemas', latitude: 2.5833, longitude: 102.6167, country: 'Malaysia' },
  { name: 'Tampin', path: 'tampin', latitude: 2.4667, longitude: 102.2333, country: 'Malaysia' },
  { name: 'Jelebu', path: 'jelebu', latitude: 2.9500, longitude: 102.0667, country: 'Malaysia' },
  { name: 'Kuala Klawang', path: 'kuala-klawang', latitude: 2.9333, longitude: 102.0833, country: 'Malaysia' },
  { name: 'Rembau', path: 'rembau', latitude: 2.5833, longitude: 102.0833, country: 'Malaysia' },
  { name: 'Lenggeng', path: 'lenggeng', latitude: 2.8833, longitude: 102.0167, country: 'Malaysia' },
  { name: 'Pedas', path: 'pedas', latitude: 2.6167, longitude: 102.1167, country: 'Malaysia' },
  { name: 'Jempol', path: 'jempol', latitude: 2.9000, longitude: 102.4000, country: 'Malaysia' },
  { name: 'Rompin', path: 'rompin', latitude: 2.7167, longitude: 103.4833, country: 'Malaysia' },
  { name: 'Pekan', path: 'pekan', latitude: 3.5000, longitude: 103.4000, country: 'Malaysia' },
  { name: 'Jerantut', path: 'jerantut', latitude: 3.9333, longitude: 102.3667, country: 'Malaysia' },
  { name: 'Maran', path: 'maran', latitude: 3.5833, longitude: 102.7833, country: 'Malaysia' },
  { name: 'Chenor', path: 'chenor', latitude: 3.5167, longitude: 102.6500, country: 'Malaysia' },
  { name: 'Bera', path: 'bera', latitude: 3.3333, longitude: 102.5000, country: 'Malaysia' },
  { name: 'Lanchang', path: 'lanchang', latitude: 3.3667, longitude: 102.2833, country: 'Malaysia' },
  { name: 'Karak', path: 'karak', latitude: 3.4000, longitude: 102.0333, country: 'Malaysia' },
  { name: 'Gua Musang', path: 'gua-musang', latitude: 4.8833, longitude: 101.9667, country: 'Malaysia' },
  { name: 'Kuala Krai', path: 'kuala-krai', latitude: 5.5333, longitude: 102.2000, country: 'Malaysia' },
  { name: 'Machang', path: 'machang', latitude: 5.7667, longitude: 102.2167, country: 'Malaysia' },
  { name: 'Pasir Mas', path: 'pasir-mas', latitude: 6.0333, longitude: 102.1333, country: 'Malaysia' },
  { name: 'Tumpat', path: 'tumpat', latitude: 6.1667, longitude: 102.1667, country: 'Malaysia' },
  { name: 'Bachok', path: 'bachok', latitude: 6.0500, longitude: 102.4000, country: 'Malaysia' },
  { name: 'Ketereh', path: 'ketereh', latitude: 5.9667, longitude: 102.2500, country: 'Malaysia' },
  { name: 'Kubang Kerian', path: 'kubang-kerian', latitude: 6.1000, longitude: 102.2833, country: 'Malaysia' },
  { name: 'Pengkalan Chepa', path: 'pengkalan-chepa', latitude: 6.1667, longitude: 102.2833, country: 'Malaysia' },
  { name: 'Wakaf Bharu', path: 'wakaf-bharu', latitude: 6.1167, longitude: 102.2000, country: 'Malaysia' },
  { name: 'Pasir Puteh', path: 'pasir-puteh', latitude: 5.8333, longitude: 102.4000, country: 'Malaysia' },
  { name: 'Jeli', path: 'jeli', latitude: 5.7000, longitude: 101.8333, country: 'Malaysia' },
  { name: 'Tanah Merah', path: 'tanah-merah', latitude: 5.8000, longitude: 102.1500, country: 'Malaysia' },
  { name: 'Kemaman', path: 'kemaman', latitude: 4.2333, longitude: 103.4500, country: 'Malaysia' },
  { name: 'Dungun', path: 'dungun', latitude: 4.7667, longitude: 103.4167, country: 'Malaysia' },
  { name: 'Marang', path: 'marang', latitude: 5.2000, longitude: 103.2000, country: 'Malaysia' },
  { name: 'Hulu Terengganu', path: 'hulu-terengganu', latitude: 5.0833, longitude: 102.7667, country: 'Malaysia' },
  { name: 'Setiu', path: 'setiu', latitude: 5.4167, longitude: 102.8167, country: 'Malaysia' },
  { name: 'Besut', path: 'besut', latitude: 5.8333, longitude: 102.5500, country: 'Malaysia' },
  { name: 'Kuala Nerus', path: 'kuala-nerus', latitude: 5.3667, longitude: 103.0333, country: 'Malaysia' },
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
