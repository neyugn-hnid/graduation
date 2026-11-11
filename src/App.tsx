import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AdminPage } from './components/AdminPage'
import { EventInfo } from './components/EventInfo'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'

export default function App() {
  const route = window.location.pathname.replace(/\/+$/, '') || '/'
  if (route === '/admin') return <AdminPage />
  return <InvitationPage />
}

function InvitationPage() {
  const scrollProgressRef = useRef<HTMLDivElement>(null)
  const inviteeName = new URLSearchParams(window.location.search).get('guestName')?.trim().replace(/\s+/g, ' ').slice(0, 80)

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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return
    let revertGsap: (() => void) | undefined
    let cancelled = false
    void import('gsap').then(async ({ default: gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        const compactMotion = window.matchMedia('(max-width: 600px)').matches
        gsap.utils.toArray<HTMLElement>('.reveal:not(.timeline-item)').forEach((element) => {
          gsap.fromTo(
            element,
            compactMotion ? { y: 16, opacity: 0 } : { y: 30, opacity: 0, scale: 0.985 },
            { y: 0, opacity: 1, ...(compactMotion ? {} : { scale: 1 }), duration: compactMotion ? 0.58 : 0.8, ease: compactMotion ? 'power2.out' : 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: element, start: compactMotion ? 'top 94%' : 'top 88%', once: true } },
          )
        })
      })
      revertGsap = () => ctx.revert()
    })
    return () => { cancelled = true; revertGsap?.() }
  }, [])

  useEffect(() => {
    document.body.classList.add('invitation-open')
    return () => document.body.classList.remove('invitation-open')
  }, [])

  return <>
    <div ref={scrollProgressRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />
    <motion.div className="invitation-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65 }}>
      <main>
        <Hero />
        <EventInfo inviteeName={inviteeName} />
        <Gallery />
        <Footer />
      </main>
    </motion.div>
  </>
}
