import { ArrowUp, Heart } from 'lucide-react'
import { graduation } from '../config/graduation'
import { Countdown } from './Countdown'

export function Footer() {
  const closingPhoto = graduation.gallery[4] ?? graduation.gallery[0]

  return <>
    <section className="thank-you section-shell">
      {closingPhoto && <figure className="thank-you-photo reveal"><img src={closingPhoto.src} alt={closingPhoto.alt} loading="lazy" /><figcaption>{closingPhoto.caption}</figcaption></figure>}
      <div className="thank-you-copy reveal">
        <span className="eyebrow"><span className="gold-dot" /> HẸN GẶP BẠN TRONG NGÀY VUI</span>
        <p className="thank-you-script">Một chặng đường mới</p>
        <h2>Hẹn gặp bạn<br /><em>ngày tốt nghiệp.</em></h2>
        <p className="thank-you-note">Cảm ơn bạn đã luôn yêu thương và đồng hành cùng em.</p>
        <div className="final-countdown"><span>ĐẾM NGƯỢC ĐẾN NGÀY HỘI NGỘ</span><Countdown /></div>
      </div>
      <span className="thank-you-orb" aria-hidden="true" />
    </section>
    <footer className="site-footer reveal">
      <a className="footer-brand" href="#top">{graduation.graduateName}<span>NIÊN KHÓA {graduation.graduationYear}</span></a>
      <span className="footer-note">THỰC HIỆN BẰNG <Heart size={11} fill="currentColor" /> YÊU THƯƠNG</span>
      <a className="back-top" href="#top">VỀ ĐẦU TRANG <ArrowUp size={14} /></a>
    </footer>
  </>
}
