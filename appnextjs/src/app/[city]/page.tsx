import { cityCoordinates } from '@/utils/cityDistance'
import CityPageClient from './CityPageClient'

// 生成静态参数
export async function generateStaticParams() {
  return cityCoordinates.map((city) => ({
    city: city.path,
  }))
}

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params
  
  return <CityPageClient city={city} />
}