'use client'

import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  city: string | null
  country: string | null
  loading: boolean
  error: string | null
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    city: null,
    country: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by this browser.'
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // 使用反向地理编码获取城市信息
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          
          if (!response.ok) {
            throw new Error('Failed to fetch location data')
          }
          
          const data = await response.json()
          
          setState({
            latitude,
            longitude,
            city: data.city || data.locality,
            country: data.countryName,
            loading: false,
            error: null
          })
        } catch (error) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to get city information'
          }))
        }
      },
      (error) => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }, [])

  return state
}
