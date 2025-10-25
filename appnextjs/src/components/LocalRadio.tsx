'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface RadioStation {
  name: string
  url: string
  description: string
  language: string
}

interface LocalRadioProps {
  cityName: string
  country: string
}

export function LocalRadio({ cityName, country }: LocalRadioProps) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  // 根据城市和国家获取广播电台
  const getRadioStations = (city: string, country: string): RadioStation[] => {
    const stations: Record<string, RadioStation[]> = {
      // 泰国广播电台
      'bangkok': [
        { name: 'FM 95.5', url: 'https://streaming.radio.co/s8b4b4b4b4/listen', description: 'Thai Pop Music', language: 'Thai' },
        { name: 'FM 96.5', url: 'https://streaming.radio.co/s9c5c5c5c5/listen', description: 'News & Talk', language: 'Thai' },
        { name: 'FM 97.5', url: 'https://streaming.radio.co/s0d6d6d6d6/listen', description: 'Classic Hits', language: 'Thai' }
      ],
      'chiang-mai': [
        { name: 'FM 88.5', url: 'https://streaming.radio.co/s1e7e7e7e7/listen', description: 'Northern Thai Music', language: 'Thai' },
        { name: 'FM 89.5', url: 'https://streaming.radio.co/s2f8f8f8f8/listen', description: 'Local News', language: 'Thai' }
      ],
      'phuket': [
        { name: 'FM 90.5', url: 'https://streaming.radio.co/s3g9g9g9g9/listen', description: 'Island Music', language: 'Thai' },
        { name: 'FM 91.5', url: 'https://streaming.radio.co/s4h0h0h0h0/listen', description: 'Tourist Info', language: 'English' }
      ],
      // 马来西亚广播电台
      'kuala-lumpur': [
        { name: 'FM 88.9', url: 'https://streaming.radio.co/s5i1i1i1i1/listen', description: 'Malay Pop', language: 'Malay' },
        { name: 'FM 89.9', url: 'https://streaming.radio.co/s6j2j2j2j2/listen', description: 'English Hits', language: 'English' },
        { name: 'FM 90.9', url: 'https://streaming.radio.co/s7k3k3k3k3/listen', description: 'Chinese Music', language: 'Chinese' }
      ],
      'george-town': [
        { name: 'FM 87.5', url: 'https://streaming.radio.co/s8l4l4l4l4/listen', description: 'Penang Local', language: 'Malay' },
        { name: 'FM 88.5', url: 'https://streaming.radio.co/s9m5m5m5m5/listen', description: 'Hokkien Music', language: 'Chinese' }
      ],
      // 越南广播电台
      'ho-chi-minh': [
        { name: 'FM 99.9', url: 'https://streaming.radio.co/s0n6n6n6n6/listen', description: 'Vietnamese Pop', language: 'Vietnamese' },
        { name: 'FM 100.9', url: 'https://streaming.radio.co/s1o7o7o7o7/listen', description: 'News & Talk', language: 'Vietnamese' },
        { name: 'FM 101.9', url: 'https://streaming.radio.co/s2p8p8p8p8/listen', description: 'International Music', language: 'English' }
      ],
      'hanoi': [
        { name: 'FM 98.5', url: 'https://streaming.radio.co/s3q9q9q9q9/listen', description: 'Hanoi Local', language: 'Vietnamese' },
        { name: 'FM 99.5', url: 'https://streaming.radio.co/s4r0r0r0r0/listen', description: 'Traditional Music', language: 'Vietnamese' }
      ],
      'da-nang': [
        { name: 'FM 97.5', url: 'https://streaming.radio.co/s5s1s1s1s1/listen', description: 'Central Vietnam', language: 'Vietnamese' },
        { name: 'FM 98.5', url: 'https://streaming.radio.co/s6t2t2t2t2/listen', description: 'Beach Music', language: 'English' }
      ],
      // 中国广播电台
      'beijing': [
        { name: 'FM 87.6', url: 'https://streaming.radio.co/s7u3u3u3u3/listen', description: 'Beijing Music', language: 'Chinese' },
        { name: 'FM 88.6', url: 'https://streaming.radio.co/s8v4v4v4v4/listen', description: 'News & Talk', language: 'Chinese' }
      ],
      'shanghai': [
        { name: 'FM 89.6', url: 'https://streaming.radio.co/s9w5w5w5w5/listen', description: 'Shanghai Local', language: 'Chinese' },
        { name: 'FM 90.6', url: 'https://streaming.radio.co/s0x6x6x6x6/listen', description: 'International', language: 'English' }
      ],
      // 新加坡广播电台
      'singapore': [
        { name: 'FM 92.4', url: 'https://streaming.radio.co/s1y7y7y7y7/listen', description: 'English Hits', language: 'English' },
        { name: 'FM 93.4', url: 'https://streaming.radio.co/s2z8z8z8z8/listen', description: 'Mandarin Pop', language: 'Chinese' },
        { name: 'FM 94.4', url: 'https://streaming.radio.co/s3a9a9a9a9/listen', description: 'Malay Music', language: 'Malay' }
      ],
      // 澳大利亚广播电台 (参考 Perth 的 Radio Garden)
      'perth': [
        { name: 'ABC Perth', url: 'https://streaming.radio.co/s4b0b0b0b0/listen', description: 'ABC News & Talk', language: 'English' },
        { name: 'Triple J', url: 'https://streaming.radio.co/s5c1c1c1c1/listen', description: 'Alternative Music', language: 'English' },
        { name: 'Nova 93.7', url: 'https://streaming.radio.co/s6d2d2d2d2/listen', description: 'Hit Music', language: 'English' }
      ],
      'sydney': [
        { name: 'ABC Sydney', url: 'https://streaming.radio.co/s7e3e3e3e3/listen', description: 'ABC News & Talk', language: 'English' },
        { name: '2GB', url: 'https://streaming.radio.co/s8f4f4f4f4/listen', description: 'Talk Radio', language: 'English' },
        { name: 'KIIS 106.5', url: 'https://streaming.radio.co/s9g5g5g5g5/listen', description: 'Hit Music', language: 'English' }
      ],
      'melbourne': [
        { name: 'ABC Melbourne', url: 'https://streaming.radio.co/s0h6h6h6h6/listen', description: 'ABC News & Talk', language: 'English' },
        { name: '3AW', url: 'https://streaming.radio.co/s1i7i7i7i7/listen', description: 'Talk Radio', language: 'English' },
        { name: 'Fox FM', url: 'https://streaming.radio.co/s2j8j8j8j8/listen', description: 'Hit Music', language: 'English' }
      ]
    }

    // 如果没有找到特定城市的电台，根据国家返回通用电台
    if (!stations[city]) {
      const countryStations: Record<string, RadioStation[]> = {
        'Thailand': [
          { name: 'FM 95.5', url: 'https://streaming.radio.co/s3k3k3k3k3/listen', description: 'Thai Pop Music', language: 'Thai' },
          { name: 'FM 96.5', url: 'https://streaming.radio.co/s4l4l4l4l4/listen', description: 'News & Talk', language: 'Thai' }
        ],
        'Malaysia': [
          { name: 'FM 88.9', url: 'https://streaming.radio.co/s5m5m5m5m5/listen', description: 'Malay Pop', language: 'Malay' },
          { name: 'FM 89.9', url: 'https://streaming.radio.co/s6n6n6n6n6/listen', description: 'English Hits', language: 'English' }
        ],
        'Vietnam': [
          { name: 'FM 99.9', url: 'https://streaming.radio.co/s7o7o7o7o7/listen', description: 'Vietnamese Pop', language: 'Vietnamese' },
          { name: 'FM 100.9', url: 'https://streaming.radio.co/s8p8p8p8p8/listen', description: 'News & Talk', language: 'Vietnamese' }
        ],
        'China': [
          { name: 'FM 87.6', url: 'https://streaming.radio.co/s9q9q9q9q9/listen', description: 'Chinese Music', language: 'Chinese' },
          { name: 'FM 88.6', url: 'https://streaming.radio.co/s0r0r0r0r0/listen', description: 'News & Talk', language: 'Chinese' }
        ],
        'Singapore': [
          { name: 'FM 92.4', url: 'https://streaming.radio.co/s1s1s1s1s1/listen', description: 'English Hits', language: 'English' },
          { name: 'FM 93.4', url: 'https://streaming.radio.co/s2t2t2t2t2/listen', description: 'Mandarin Pop', language: 'Chinese' }
        ],
        'Australia': [
          { name: 'ABC Local', url: 'https://streaming.radio.co/s3u3u3u3u3/listen', description: 'ABC News & Talk', language: 'English' },
          { name: 'Triple J', url: 'https://streaming.radio.co/s4v4v4v4v4/listen', description: 'Alternative Music', language: 'English' }
        ]
      }

      return countryStations[country] || [
        { name: 'Local FM', url: 'https://streaming.radio.co/s5w5w5w5w5/listen', description: 'Local Radio', language: 'Local' }
      ]
    }

    return stations[city]
  }

  const stations = getRadioStations(cityName, country)

  const playStation = (station: RadioStation) => {
    if (audio) {
      audio.pause()
      audio.src = ''
    }

    const newAudio = new Audio(station.url)
    newAudio.crossOrigin = 'anonymous'
    
    newAudio.addEventListener('loadstart', () => {
      setIsPlaying(true)
      setCurrentStation(station)
    })

    newAudio.addEventListener('error', () => {
      setIsPlaying(false)
      setCurrentStation(null)
      alert('无法播放此电台，请尝试其他电台')
    })

    newAudio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentStation(null)
    })

    newAudio.play().catch(() => {
      setIsPlaying(false)
      setCurrentStation(null)
      alert('无法播放此电台，请检查网络连接')
    })

    setAudio(newAudio)
  }

  const stopRadio = () => {
    if (audio) {
      audio.pause()
      audio.src = ''
      setAudio(null)
    }
    setIsPlaying(false)
    setCurrentStation(null)
  }

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ''
      }
    }
  }, [audio])

  // 调试信息
  console.log('LocalRadio component rendering for:', cityName, country)
  console.log('Stations found:', stations.length)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          📻 {t('radio.localRadio')}
        </h3>
        {isPlaying && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600 dark:text-red-400">LIVE</span>
          </div>
        )}
      </div>

      {currentStation && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                {currentStation.name}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {currentStation.description}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {currentStation.language}
              </p>
            </div>
            <button
              onClick={stopRadio}
              className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm"
            >
              {t('radio.stop')}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stations.map((station, index) => (
          <button
            key={index}
            onClick={() => playStation(station)}
            disabled={isPlaying && currentStation?.name === station.name}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              isPlaying && currentStation?.name === station.name
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {station.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {station.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {station.language}
                </p>
              </div>
              <div className="text-2xl">
                {isPlaying && currentStation?.name === station.name ? '⏸️' : '▶️'}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>注意：</strong> 广播电台链接为示例链接，实际使用时需要替换为真实的广播电台流媒体地址。
          某些电台可能因网络或版权限制无法播放。
        </p>
      </div>
    </div>
  )
}
