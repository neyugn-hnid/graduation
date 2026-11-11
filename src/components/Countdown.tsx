import { useEffect, useState } from 'react'
import { graduation } from '../config/graduation'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }
function calculateTimeLeft(): TimeLeft | null {
  const difference = new Date(graduation.eventDate).getTime() - Date.now()
  if (!Number.isFinite(difference) || difference <= 0) return null
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const labels: Record<keyof TimeLeft, string> = {
    days: 'ngày',
    hours: 'giờ',
    minutes: 'phút',
    seconds: 'giây',
  }

  return (
    <div className="countdown-block reveal" aria-live="polite">
      {timeLeft ? <div className="countdown-row">{Object.entries(timeLeft).map(([unit, value]) => <div className="countdown-unit" key={unit}>
        <span className="countdown-number">{String(value).padStart(2, '0')}</span><span className="countdown-label">{labels[unit as keyof TimeLeft]}</span>
      </div>)}<span className="countdown-colon">:</span><span className="countdown-colon second">:</span><span className="countdown-colon third">:</span></div>
        : <p className="countdown-passed">Ngày vui đã đến.<br /><em>Cùng nhau đón mừng nhé!</em></p>}
    </div>
  )
}
