'use client'

import { useEffect, useRef, useState } from 'react'
import { playSound } from '@/lib/sound-engine'
import type { PlayFunction, SoundAsset, SoundControls, UseSoundOptions, UseSoundReturn } from '@/lib/sound-types'

export function useSound(sound: SoundAsset, options: UseSoundOptions = {}): UseSoundReturn {
  const playbackRef = useRef<SoundControls | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<number | null>(sound.duration)

  useEffect(() => {
    setDuration(sound.duration)
  }, [sound.duration])

  useEffect(() => {
    return () => {
      playbackRef.current?.stop()
    }
  }, [])

  const play: PlayFunction = (overrides = {}) => {
    if (options.soundEnabled === false) {
      return
    }

    if (options.interrupt) {
      playbackRef.current?.stop()
    }

    void (async () => {
      const playback = await playSound(sound.dataUri, {
        volume: overrides.volume ?? options.volume,
        playbackRate: overrides.playbackRate ?? options.playbackRate,
        onEnd: () => {
          setIsPlaying(false)
          options.onEnd?.()
        },
      })

      playbackRef.current = {
        stop: () => {
          playback.stop()
          setIsPlaying(false)
          options.onStop?.()
        },
        pause: () => {
          playback.stop()
          setIsPlaying(false)
          options.onPause?.()
        },
        isPlaying: true,
        duration: sound.duration,
        sound,
      }

      setIsPlaying(true)
      options.onPlay?.()
    })()
  }

  const controls: SoundControls = {
    stop: () => {
      playbackRef.current?.stop()
    },
    pause: () => {
      playbackRef.current?.pause()
    },
    isPlaying,
    duration,
    sound,
  }

  return [play, controls]
}
