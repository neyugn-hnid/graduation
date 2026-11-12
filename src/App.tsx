import { useEffect, useRef, useState } from 'react'
import { Music2, Volume2 } from 'lucide-react'
import { AdminPage } from './components/AdminPage'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { graduation } from './config/graduation'

export default function App() {
  const route = window.location.pathname.replace(/\/+$/, '') || '/'
  if (route === '/admin') return <AdminPage />
  return <InvitationPage />
}

function InvitationPage() {
  const scrollProgressRef = useRef<HTMLDivElement>(null)
  const musicRef = useRef<HTMLAudioElement>(null)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const inviteeName = new URLSearchParams(window.location.search).get('guestName')?.trim().replace(/\s+/g, ' ').slice(0, 80)

  async function toggleMusic() {
    const audio = musicRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setMusicPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  useEffect(() => {
    let frame = 0
    const updateProgress = () => {
      frame = 0
      const range = document.documentElement.scrollHeight - window.innerHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0
      scrollProgressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
    }
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateProgress()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.classList.add('invitation-open')
    return () => document.body.classList.remove('invitation-open')
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const repeatOnMobile = window.matchMedia('(max-width: 600px)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const lastCoverElement = document.querySelector<HTMLElement>('.cic-venue')
    let coverIntroComplete = !lastCoverElement
    let fallbackTimer: number | undefined
    const deferredReveals = new Set<HTMLElement>()
    const inViewport = new Set<HTMLElement>()

    const reveal = (element: HTMLElement) => element.classList.add('is-visible')
    const finishCoverIntro = () => {
      if (coverIntroComplete) return
      coverIntroComplete = true
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer)
      lastCoverElement?.removeEventListener('animationend', onCoverAnimationEnd)
      deferredReveals.forEach((element) => {
        if (!repeatOnMobile || inViewport.has(element)) reveal(element)
      })
      deferredReveals.clear()
    }
    const onCoverAnimationEnd = (event: AnimationEvent) => {
      if (event.target === lastCoverElement && event.animationName === 'cover-reveal-down') finishCoverIntro()
    }

    if (lastCoverElement) {
      lastCoverElement.addEventListener('animationend', onCoverAnimationEnd)
      fallbackTimer = window.setTimeout(finishCoverIntro, 2500)
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        if (repeatOnMobile) {
          if (!entry.isIntersecting) {
            inViewport.delete(element)
            deferredReveals.delete(element)
            element.classList.remove('is-visible')
            return
          }

          inViewport.add(element)
          if (coverIntroComplete) reveal(element)
          else deferredReveals.add(element)
          return
        }

        if (!entry.isIntersecting) return
        currentObserver.unobserve(entry.target)
        if (coverIntroComplete) reveal(element)
        else deferredReveals.add(element)
      })
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.12 })

    revealElements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      lastCoverElement?.removeEventListener('animationend', onCoverAnimationEnd)
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    const audio = musicRef.current
    if (!audio) return

    let disposed = false
    let playPending = false

    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', startOnGesture)
      window.removeEventListener('keydown', startOnGesture)
      window.removeEventListener('touchstart', startOnGesture)
      audio.removeEventListener('play', removeGestureListeners)
    }

    const tryStartMusic = async () => {
      if (disposed || playPending || !audio.paused) return
      playPending = true
      try {
        await audio.play()
      } catch {
        // Autoplay may be blocked until the guest interacts with the page.
      } finally {
        playPending = false
      }
    }

    function startOnGesture(event: Event) {
      if ((event.target as Element | null)?.closest?.('.music-control')) return
      void tryStartMusic()
    }

    audio.addEventListener('play', removeGestureListeners)
    window.addEventListener('pointerdown', startOnGesture, { passive: true })
    window.addEventListener('keydown', startOnGesture)
    window.addEventListener('touchstart', startOnGesture, { passive: true })
    void tryStartMusic()

    return () => {
      disposed = true
      removeGestureListeners()
    }
  }, [])

  return <>
    <div ref={scrollProgressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />
    <audio
      id="invitation-music"
      ref={musicRef}
      src={graduation.musicUrl}
      loop
      preload="none"
      onPlay={() => setMusicPlaying(true)}
      onPause={() => setMusicPlaying(false)}
    />
    <button
      className={`music-control${musicPlaying ? ' is-playing' : ''}`}
      type="button"
      onClick={() => void toggleMusic()}
      aria-controls="invitation-music"
      aria-pressed={musicPlaying}
      aria-label={musicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
    >
      {musicPlaying ? <Volume2 size={19} aria-hidden="true" /> : <Music2 size={19} aria-hidden="true" />}
    </button>
    <div className="invitation-page">
      <main>
        <Hero inviteeName={inviteeName} />
        <div className="invitation-body-bg">
          <Footer />
        </div>
      </main>
    </div>
  </>
}
