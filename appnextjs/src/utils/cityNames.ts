import { useLanguage } from '@/contexts/LanguageContext'

// 获取城市名称的翻译
export function getCityName(cityPath: string, t: (key: string) => string): string {
  const cityKey = `city.${cityPath}`
  const translatedName = t(cityKey)
  
  // 如果翻译不存在，返回原始路径（转换为标题格式）
  if (translatedName === cityKey) {
    return cityPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  return translatedName
}

// 获取城市显示名称（包含原始名称作为后备）
export function getCityDisplayName(cityPath: string, t: (key: string) => string): string {
  const translatedName = getCityName(cityPath, t)
  
  // 如果翻译后的名称与路径相同，说明没有翻译，返回格式化的路径
  if (translatedName === cityPath) {
    return cityPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  return translatedName
}

// 获取城市名称和原始名称的组合显示
export function getCityNameWithOriginal(cityPath: string, t: (key: string) => string): { translated: string; original: string } {
  const translatedName = getCityName(cityPath, t)
  const originalName = cityPath
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return {
    translated: translatedName,
    original: originalName
  }
}
