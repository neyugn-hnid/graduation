import { ArrowUpRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import { graduation } from '../config/graduation'

export function EventInfo({ inviteeName }: { inviteeName?: string }) {
  const ceremony = new Date(graduation.eventDate)
  const day = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' }).format(ceremony)
  const month = new Intl.DateTimeFormat('vi-VN', { month: 'long', timeZone: 'Asia/Ho_Chi_Minh' }).format(ceremony)
  const year = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' }).format(ceremony)
  const weekday = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', timeZone: 'Asia/Ho_Chi_Minh' }).format(ceremony)
  const venuePhoto = graduation.gallery[1]

  return (
    <section className="event-section section-shell" id="event">
      <div className="event-intro reveal">
        <span className="eyebrow"><span className="gold-dot" /> MỘT NGÀY ĐÁNG NHỚ</span>
        <h2>Thân mời bạn<br />đến chung vui <em>cùng em.</em></h2>
        <p>Sự hiện diện của bạn sẽ làm ngày tốt nghiệp của em thêm trọn vẹn.</p>
      </div>

      <article className="event-invitation-card reveal">
        <div className="event-invitation-heading"><span>TRÂN TRỌNG KÍNH MỜI</span><h3>{inviteeName || graduation.graduateName}</h3></div>
        <div className="event-calendar-card">
          <span>{month}</span><strong>{day}</strong><i>{weekday}</i><small>{year}</small>
        </div>
        <div className="event-card-details">
          <div><CalendarDays size={16} /><span>{graduation.eventTime.replace(/^\d{2}:\d{2}\s*—\s*/, '')}</span></div>
          <div><Clock3 size={16} /><span>{graduation.eventTime.split('—')[0].trim()}</span></div>
          <div><MapPin size={16} /><span>{graduation.venue}<small>{graduation.address}</small></span></div>
        </div>
      </article>

      <div className="event-location-showcase reveal">
        {venuePhoto && <figure className="event-location-photo"><img src={venuePhoto.src} alt={venuePhoto.alt} loading="lazy" /><figcaption>{graduation.universityShort}</figcaption></figure>}
        <article className="event-location-card">
          <span className="eyebrow"><MapPin size={14} /> ĐỊA ĐIỂM ĐÓN TIẾP</span>
          <h3>{graduation.venue}</h3>
          <p>{graduation.address}</p>
          <a href={graduation.mapUrl} target="_blank" rel="noreferrer">Xem chỉ đường <ArrowUpRight size={16} /></a>
        </article>
        <span className="location-orbit" aria-hidden="true" />
      </div>
    </section>
  )
}
