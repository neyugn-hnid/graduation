import { Countdown } from './Countdown'

export function Footer() {
  return (
    <section className="thank-you section-shell">
      <div className="thank-you-copy reveal">
        <p className="thank-you-script">Một chặng đường mới</p>
        <h2>Hẹn gặp bạn<br /><em>ngày tốt nghiệp.</em></h2>
        <p className="thank-you-note">Cảm ơn bạn đã luôn yêu thương và đồng hành cùng em.</p>
        <div className="final-countdown"><span>ĐẾM NGƯỢC ĐẾN NGÀY HỘI NGỘ</span><Countdown /></div>
      </div>
    </section>
  )
}
