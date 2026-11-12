import { MapPin } from 'lucide-react'
import { graduation } from '../config/graduation'

const timeZone = 'Asia/Ho_Chi_Minh'

export function Hero({ inviteeName }: { inviteeName?: string }) {
  const ceremony = new Date(graduation.eventDate)
  const day = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', timeZone }).format(ceremony)
  const month = new Intl.DateTimeFormat('vi-VN', { month: 'long', timeZone }).format(ceremony)
  const year = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', timeZone }).format(ceremony)
  const weekday = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', timeZone }).format(ceremony)
  const graduateName = graduation.graduateName
    .split(' ')
    .map((part) => part ? part[0].toLocaleUpperCase('vi') + part.slice(1).toLocaleLowerCase('vi') : '')
    .join(' ')
  const eventTimeParts = graduation.eventTime.split('—')
  const eventTime = eventTimeParts.length > 1
    ? eventTimeParts.slice(0, -1).join('—').trim()
    : graduation.eventTime.trim()
  const invitationMessage = graduation.invitationMessage.replace('{guestName}', inviteeName || 'cậu')

  return (
    <section className="hero-section graduation-cover" id="top" aria-labelledby="hero-title">
      <div className="cover-stage">
        {/* Ribbon decorations */}
        <div className="cover-ribbon cover-ribbon-left" aria-hidden="true">
          <img src="/images/left.png" alt="" />
        </div>
        <img className="cover-ribbon cover-ribbon-right" src="/images/right.png" alt="" aria-hidden="true" />

        {/* University lockup */}
        <div className="cover-school-lockup" aria-label={graduation.university}>
          <img src={graduation.universityLogo} alt="" />
          <span className="cover-school-name">
            <strong>TRƯỜNG ĐẠI HỌC Y - DƯỢC</strong>
            <small>ĐẠI HỌC THÁI NGUYÊN</small>
          </span>
        </div>

        {/* Title */}
        <header className="cover-heading">
          <h1 id="hero-title" aria-label="Graduation Ceremony">
            <span className="cover-title-script" aria-hidden="true">Thư mời</span>
            <span className="cover-title-serif" aria-hidden="true">LỄ TỐT NGHIỆP</span>
          </h1>
        </header>

        {/* Invitation details below the ceremony title */}
        <article className="cover-invite-card" aria-label="Thông tin sự kiện">
          <p className="cover-graduate-name">{graduateName}</p>
          <p className="cover-message">{invitationMessage}</p>

          {/* Date block */}
          <div className="cic-date-block" aria-label={`${weekday}, ngày ${day} ${month} ${year}`}>
            <div className="cic-date-side cic-date-left">
              <strong className="cic-weekday">THỨ {weekday.replace(/^thứ\s+/i, '').toLocaleUpperCase('vi')}</strong>
            </div>
            <div className="cic-date-center">
              <span className="cic-month">{month.toUpperCase()}</span>
              <strong className="cic-day">{day}</strong>
              <span className="cic-year">{year}</span>
            </div>
            <div className="cic-date-side cic-date-right">
              <strong className="cic-time">{eventTime}</strong>
            </div>
          </div>

          {/* Venue */}
          <div className="cic-venue">
            <MapPin size={13} aria-hidden="true" />
            <div className="cic-venue-text">
              <strong>{graduation.venue}</strong>
              <span>{graduation.address}</span>
            </div>
          </div>

        </article>
      </div>
    </section>
  )
}
