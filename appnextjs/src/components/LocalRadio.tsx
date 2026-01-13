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
  const [playStatus, setPlayStatus] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error' | 'buffering'>('idle')
  const [volume, setVolume] = useState(0.7)
  const [connectionTimeout, setConnectionTimeout] = useState<NodeJS.Timeout | null>(null)

  // 根据城市和国家获取广播电台
  const getRadioStations = (city: string, country: string): RadioStation[] => {
    const stations: Record<string, RadioStation[]> = {
      // 泰国广播电台 (Real Working URLs)
      'bangkok': [
        { name: 'Cool Fahrenheit 93', url: 'https://stream.zeno.fm/0r0xa792kwzuv', description: 'Cool FM 93 Bangkok', language: 'Thai' },
        { name: 'Green Wave 106.5', url: 'https://stream.zeno.fm/f24h8g1h208uv', description: 'Green Wave FM Bangkok', language: 'Thai' },
        { name: 'Virgin Hitz 95.5', url: 'https://stream.zeno.fm/0tv70wzq208uv', description: 'Virgin Hitz FM Bangkok', language: 'Thai' },
        { name: 'FM 91 Traffic Pro', url: 'https://stream.zeno.fm/17q70wzq208uv', description: 'Traffic Radio Bangkok', language: 'Thai' },
        { name: 'Radio Thailand', url: 'https://prdonline.prd.go.th:8443/;', description: 'National Radio Thailand', language: 'Thai' }
      ],
      'chiang-mai': [
        { name: 'Lanna FM 97.25', url: 'https://stream.zeno.fm/lannafm', description: 'Lanna FM Chiang Mai', language: 'Thai' },
        { name: 'Chiang Mai Radio', url: 'https://stream.zeno.fm/chiangmairadio', description: 'Local Chiang Mai Station', language: 'Thai' }
      ],
      'phuket': [
        { name: 'Phuket FM 91.5', url: 'https://stream.zeno.fm/phuketfm915', description: 'Phuket Island Radio', language: 'Thai' },
        { name: 'Radio Phuket', url: 'https://stream.zeno.fm/radiophuket', description: 'Tourist Information Radio', language: 'English' }
      ],
      'pattaya': [
        { name: 'Pattaya FM 103', url: 'https://stream.zeno.fm/pattayafm103', description: 'Pattaya Beach Radio', language: 'Thai' },
        { name: 'Pattaya English Radio', url: 'https://stream.zeno.fm/pattayaenglish', description: 'Pattaya Tourist Radio', language: 'English' }
      ],
      'mae-sai': [
        { name: 'Mae Sai Border Radio', url: 'https://stream.zeno.fm/maesairadio', description: 'Mae Sai Local Radio', language: 'Thai' },
        { name: 'Golden Triangle FM', url: 'https://stream.zeno.fm/goldentrianglefm', description: 'Golden Triangle Region Radio', language: 'Thai' }
      ],
      // 马来西亚广播电台
      'kuala-lumpur': [
        { name: 'Hitz FM', url: 'https://stream.zeno.fm/hitzfm', description: 'Hitz FM English Hits', language: 'English' },
        { name: 'Mix FM', url: 'https://stream.zeno.fm/mixfm', description: 'Mix FM English Music', language: 'English' },
        { name: 'Hot FM', url: 'https://stream.zeno.fm/hotfm', description: 'Hot FM Malay Music', language: 'Malay' },
        { name: '988 FM', url: 'https://stream.zeno.fm/my988fm', description: '988 FM Chinese Music', language: 'Chinese' }
      ],
      'george-town': [
        { name: 'FM 87.5', url: 'https://streaming.radio.co/s8l4l4l4l4/listen', description: 'Penang Local', language: 'Malay' },
        { name: 'FM 88.5', url: 'https://streaming.radio.co/s9m5m5m5m5/listen', description: 'Hokkien Music', language: 'Chinese' }
      ],
      // 越南广播电台
      'ho-chi-minh': [
        { name: 'VOV1 FM 99.9', url: 'https://strm.vov.gov.vn/vov1', description: 'Voice of Vietnam 1', language: 'Vietnamese' },
        { name: 'VOV2 FM 87.7', url: 'https://strm.vov.gov.vn/vov2', description: 'Voice of Vietnam 2', language: 'Vietnamese' },
        { name: 'Saigon Radio', url: 'https://stream.zeno.fm/saigonradio', description: 'Saigon Local Radio', language: 'Vietnamese' },
        { name: 'VOV5 English', url: 'https://strm.vov.gov.vn/vov5english', description: 'VOV English Service', language: 'English' }
      ],
      'hanoi': [
        { name: 'VOV1 Hanoi', url: 'https://strm.vov.gov.vn/vov1', description: 'Voice of Vietnam Hanoi', language: 'Vietnamese' },
        { name: 'Hanoi FM 90', url: 'https://stream.zeno.fm/hanoifm90', description: 'Hanoi FM 90', language: 'Vietnamese' },
        { name: 'VOV Traffic', url: 'https://strm.vov.gov.vn/vovgt', description: 'VOV Traffic Radio', language: 'Vietnamese' }
      ],
      'da-nang': [
        { name: 'Da Nang Radio FM 97.5', url: 'https://stream.zeno.fm/danangfm975', description: 'Da Nang Local Radio', language: 'Vietnamese' },
        { name: 'VOV Da Nang', url: 'https://strm.vov.gov.vn/vov2', description: 'Voice of Vietnam Da Nang', language: 'Vietnamese' }
      ],
      // 中国广播电台
      'beijing': [
        { name: 'Beijing Music Radio 97.4', url: 'http://ls.qingting.fm/live/274.m3u8', description: 'Beijing Music Radio', language: 'Chinese' },
        { name: 'Beijing News Radio 100.6', url: 'http://ls.qingting.fm/live/273.m3u8', description: 'Beijing News & Talk', language: 'Chinese' },
        { name: 'Beijing Traffic Radio 103.9', url: 'http://ls.qingting.fm/live/275.m3u8', description: 'Beijing Traffic Radio', language: 'Chinese' }
      ],
      'shanghai': [
        { name: 'Shanghai Music Radio 107.7', url: 'http://ls.qingting.fm/live/1963.m3u8', description: 'Shanghai Music Radio', language: 'Chinese' },
        { name: 'Shanghai News Radio 93.4', url: 'http://ls.qingting.fm/live/1962.m3u8', description: 'Shanghai News & Talk', language: 'Chinese' },
        { name: 'Shanghai Traffic Radio 105.7', url: 'http://ls.qingting.fm/live/1964.m3u8', description: 'Shanghai Traffic Radio', language: 'Chinese' }
      ],
      'guangzhou': [
        { name: 'Guangzhou Music Radio 103.2', url: 'http://ls.qingting.fm/live/4866.m3u8', description: 'Guangzhou Music Radio', language: 'Chinese' },
        { name: 'Pearl River Radio', url: 'http://ls.qingting.fm/live/4867.m3u8', description: 'Pearl River Economic Radio', language: 'Chinese' },
        { name: 'Guangzhou Traffic Radio', url: 'http://ls.qingting.fm/live/4868.m3u8', description: 'Guangzhou Traffic Radio', language: 'Chinese' }
      ],
      'shenzhen': [
        { name: 'Shenzhen Music Radio 97.1', url: 'http://ls.qingting.fm/live/4869.m3u8', description: 'Shenzhen Music Radio', language: 'Chinese' },
        { name: 'Shenzhen News Radio', url: 'http://ls.qingting.fm/live/4870.m3u8', description: 'Shenzhen News & Talk', language: 'Chinese' },
        { name: 'Shenzhen Traffic Radio', url: 'http://ls.qingting.fm/live/4871.m3u8', description: 'Shenzhen Traffic Radio', language: 'Chinese' }
      ],
      // 新加坡广播电台
      'singapore': [
        { name: 'FM 92.4', url: 'https://streaming.radio.co/s1y7y7y7y7/listen', description: 'English Hits', language: 'English' },
        { name: 'FM 93.4', url: 'https://streaming.radio.co/s2z8z8z8z8/listen', description: 'Mandarin Pop', language: 'Chinese' },
        { name: 'FM 94.4', url: 'https://streaming.radio.co/s3a9a9a9a9/listen', description: 'Malay Music', language: 'Malay' }
      ],
      // 澳大利亚广播电台 (Working URLs)
      'perth': [
        { name: 'ABC Perth', url: 'https://stream.zeno.fm/abcperth', description: 'ABC News & Talk Perth', language: 'English' },
        { name: 'Triple J', url: 'https://live-radio01.mediahubaustralia.com/2TJW/mp3/', description: 'Triple J Alternative Music', language: 'English' },
        { name: 'Nova 93.7', url: 'https://stream.zeno.fm/nova937perth', description: 'Nova 93.7 Perth Hit Music', language: 'English' },
        { name: '6PR', url: 'https://stream.zeno.fm/6pr', description: '6PR Talk Radio Perth', language: 'English' }
      ],
      'sydney': [
        { name: 'ABC Sydney', url: 'https://live-radio02.mediahubaustralia.com/2RNW/mp3/', description: 'ABC News & Talk Sydney', language: 'English' },
        { name: '2GB', url: 'https://icy.ihrcast.arn.com.au/au_002_icy', description: '2GB Talk Radio Sydney', language: 'English' },
        { name: 'KIIS 106.5', url: 'https://streaming.arn.com.au/kiis1065_128k', description: 'KIIS 106.5 Hit Music Sydney', language: 'English' },
        { name: 'Triple M', url: 'https://streaming.arn.com.au/triplem_sydney_128k', description: 'Triple M Rock Sydney', language: 'English' }
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
        { name: 'BBC World Service', url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service', description: 'BBC World Service English', language: 'English' },
        { name: 'Radio Garden Global', url: 'https://stream.zeno.fm/radiogarden', description: 'Global Radio Stream', language: 'English' }
      ]
    }

    return stations[city]
  }

  const stations = getRadioStations(cityName, country)

  const cleanupAudio = () => {
    if (audio) {
      audio.pause()
      audio.src = ''
      audio.load() // 重置音频元素
    }
    if (connectionTimeout) {
      clearTimeout(connectionTimeout)
      setConnectionTimeout(null)
    }
  }

  const resetState = () => {
    setIsPlaying(false)
    setCurrentStation(null)
    setConnectionStatus('idle')
    setPlayStatus('')
  }

  const playStation = (station: RadioStation) => {
    // 防止重复点击同一个正在播放的电台
    if (currentStation?.name === station.name && isPlaying && connectionStatus === 'connected') {
      console.log('电台已在播放，忽略重复点击:', station.name)
      // 可以在这里添加一个短暂的视觉反馈
      setPlayStatus('🎵 电台正在播放中')
      return
    }

    // 防止在连接过程中重复点击
    if (currentStation?.name === station.name && isPlaying && connectionStatus === 'connecting') {
      console.log('电台正在连接中，忽略重复点击:', station.name)
      return
    }

    // 如果是同一个电台但状态不是connected，允许重试
    console.log('开始播放电台:', station.name, '当前状态:', connectionStatus)

    // 清理之前的音频和状态
    cleanupAudio()
    resetState()

    const newAudio = new Audio(station.url)
    newAudio.crossOrigin = 'anonymous'
    newAudio.preload = 'none'
    newAudio.volume = volume

    // 设置初始状态
    setIsPlaying(true)
    setCurrentStation(station)
    setConnectionStatus('connecting')
    setPlayStatus('🔗 正在连接电台...')

    // 设置连接超时 (15秒)
    const timeout = setTimeout(() => {
      console.log('连接超时:', station.name)
      cleanupAudio()
      setIsPlaying(false)
      setCurrentStation(null)
      setConnectionStatus('error')
      setPlayStatus('❌ 连接超时，请尝试其他电台')
    }, 15000)
    setConnectionTimeout(timeout)

    newAudio.addEventListener('loadstart', () => {
      console.log('开始加载音频流:', station.name)
      setConnectionStatus('connecting')
      setPlayStatus('📡 正在加载音频流...')
    })

    newAudio.addEventListener('canplay', () => {
      console.log('音频可以播放:', station.name)
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        setConnectionTimeout(null)
      }
      setConnectionStatus('connected')
      setPlayStatus('✅ 准备播放')
    })

    newAudio.addEventListener('playing', () => {
      console.log('音频正在播放:', station.name)
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
        setConnectionTimeout(null)
      }
      setConnectionStatus('connected')
      setPlayStatus('🎵 正在播放')
    })

    newAudio.addEventListener('error', (e) => {
      console.error('音频播放错误:', station.name, e)
      console.log('错误详情:', {
        error: e,
        url: station.url,
        readyState: newAudio.readyState,
        networkState: newAudio.networkState
      })

      // 只有当前电台才处理错误，防止旧的错误事件影响新的播放
      if (currentStation?.name === station.name) {
        cleanupAudio()

        // 延迟重置状态，让用户看到错误信息
        setTimeout(() => {
          if (currentStation?.name === station.name) {
            resetState()
          }
        }, 4000)

        setConnectionStatus('error')
        setPlayStatus(`❌ ${station.name} 连接失败 - 电台可能暂时不可用`)
      }
    })

    newAudio.addEventListener('ended', () => {
      console.log('音频播放结束:', station.name)
      cleanupAudio()
      resetState()
    })

    newAudio.addEventListener('stalled', () => {
      console.log('音频流停滞:', station.name)
      setConnectionStatus('buffering')
      setPlayStatus('⚠️ 连接不稳定，正在重连...')
    })

    newAudio.addEventListener('waiting', () => {
      console.log('等待音频数据:', station.name)
      setConnectionStatus('buffering')
      setPlayStatus('⏳ 缓冲中...')
    })

    newAudio.addEventListener('progress', () => {
      if (connectionStatus === 'buffering') {
        setConnectionStatus('connected')
        setPlayStatus('🎵 正在播放')
      }
    })

    // 尝试播放
    newAudio.play().catch((error) => {
      console.error('播放失败:', station.name, error)

      // 只有当前电台才处理错误
      if (currentStation?.name === station.name) {
        cleanupAudio()

        // 延迟重置状态，让用户看到错误信息
        setTimeout(() => {
          if (currentStation?.name === station.name) {
            resetState()
          }
        }, 3000)

        setConnectionStatus('error')
        setPlayStatus(`❌ ${station.name} 播放失败，请检查网络连接`)
      }
    })

    setAudio(newAudio)
  }

  const stopRadio = () => {
    cleanupAudio()
    setAudio(null)
    resetState()
  }

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume)
    if (audio) {
      audio.volume = newVolume
    }
  }

  useEffect(() => {
    return () => {
      cleanupAudio()
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
      }
    }
  }, [audio, connectionTimeout])

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
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  {currentStation.name}
                </h4>
                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                  connectionStatus === 'connecting' ? 'bg-yellow-500 animate-spin' :
                    connectionStatus === 'buffering' ? 'bg-orange-500 animate-bounce' :
                      connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {currentStation.description}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                语言: {currentStation.language}
              </p>
              {playStatus && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${connectionStatus === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      connectionStatus === 'buffering' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                        connectionStatus === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                    {playStatus}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {connectionStatus === 'error' && (
                <button
                  onClick={() => playStation(currentStation)}
                  className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors text-sm font-medium"
                >
                  🔄 重试
                </button>
              )}
              <button
                onClick={stopRadio}
                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
              >
                ⏹️ {t('radio.stop')}
              </button>
            </div>
          </div>

          {/* 音量控制 */}
          <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
            <span className="text-sm text-blue-700 dark:text-blue-300">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => adjustVolume(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
            />
            <span className="text-xs text-blue-600 dark:text-blue-400 min-w-[3rem]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stations.map((station, index) => {
          const isCurrentStation = isPlaying && currentStation?.name === station.name
          const isCurrentlyConnected = isCurrentStation && connectionStatus === 'connected'
          const isConnecting = isCurrentStation && connectionStatus === 'connecting'

          return (
            <button
              key={index}
              onClick={() => playStation(station)}
              disabled={isCurrentlyConnected || isConnecting}
              title={
                isCurrentStation
                  ? connectionStatus === 'connected'
                    ? `${station.name} 正在播放中`
                    : connectionStatus === 'connecting'
                      ? `${station.name} 正在连接中...`
                      : connectionStatus === 'buffering'
                        ? `${station.name} 正在缓冲中...`
                        : connectionStatus === 'error'
                          ? `${station.name} 连接失败，点击重试`
                          : `播放 ${station.name}`
                  : `播放 ${station.name}`
              }
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left relative ${isCurrentStation
                ? connectionStatus === 'error'
                  ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 shadow-md cursor-pointer'
                  : connectionStatus === 'connected'
                    ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-md cursor-not-allowed opacity-90'
                    : 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-md cursor-not-allowed'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm cursor-pointer'
                }`}
            >
              {isCurrentStation && (
                <div className="absolute top-2 right-2">
                  <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                    connectionStatus === 'connecting' ? 'bg-yellow-500 animate-spin' :
                      connectionStatus === 'buffering' ? 'bg-orange-500 animate-bounce' :
                        connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {station.name}
                    </h4>
                    {isCurrentStation && (
                      <span className={`text-xs px-2 py-1 rounded-full ${connectionStatus === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          connectionStatus === 'buffering' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                            connectionStatus === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                        {connectionStatus === 'connected' ? '播放中' :
                          connectionStatus === 'connecting' ? '连接中' :
                            connectionStatus === 'buffering' ? '缓冲中' :
                              connectionStatus === 'error' ? '连接失败' : '播放中'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {station.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                      {station.language}
                    </span>
                  </div>
                </div>
                <div className="text-3xl ml-4">
                  {isCurrentStation ? (
                    connectionStatus === 'connected' ? '🎵' :
                      connectionStatus === 'connecting' ? '🔄' :
                        connectionStatus === 'buffering' ? '⏳' :
                          connectionStatus === 'error' ? '❌' : '⏸️'
                  ) : '▶️'}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">📡</div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">电台播放说明</h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p>• 电台链接来自 Zeno.FM、BBC 和各地官方广播电台</p>
              <p>• 部分电台可能因地理位置、网络状况或版权限制而无法播放</p>
              <p>• 连接超时设置为15秒，超时后会自动停止尝试</p>
              <p>• 播放失败后可点击"重试"按钮或尝试其他电台</p>
              <p>• 状态指示器：🟢 已连接 | 🟡 连接中 | 🟠 缓冲中 | 🔴 连接失败</p>
              <p>• 错误状态会在4秒后自动清除，不影响其他电台播放</p>
              <p>• 如果所有电台都无法播放，请检查网络连接或稍后再试</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
