import { motion } from 'framer-motion'
import { graduation } from '../config/graduation'

export function Journey() {
  const photos = graduation.gallery.slice(2, 5)

  return (
    <section className="journey-section section-shell" id="journey">
      <div className="journey-collage reveal">
        {photos[0] && <figure className="journey-photo journey-photo-main"><img src={photos[0].src} alt={photos[0].alt} loading="lazy" /><figcaption>{photos[0].caption}</figcaption></figure>}
        {photos[1] && <figure className="journey-photo journey-photo-small"><img src={photos[1].src} alt={photos[1].alt} loading="lazy" /><figcaption>{photos[1].year}</figcaption></figure>}
        {photos[2] && <figure className="journey-photo journey-photo-tall"><img src={photos[2].src} alt={photos[2].alt} loading="lazy" /><figcaption>{photos[2].caption}</figcaption></figure>}
        <span className="journey-script">Thanh xuân</span>
        <span className="journey-stamp">{graduation.startedYear}<i />{graduation.graduationYear}</span>
        <span className="journey-orb" aria-hidden="true" />
      </div>

      <motion.article className="journey-letter reveal" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
        <span className="eyebrow"><span className="gold-dot" /> GỬI NHỮNG NGƯỜI EM THƯƠNG</span>
        <h2>Cảm ơn vì đã<br /><em>đi cùng em.</em></h2>
        <div className="journey-letter-copy">
          {graduation.journey.map((entry) => <p key={entry.year}><span>{entry.year}</span>{entry.copy}</p>)}
        </div>
        <div className="journey-signature"><span>Thân mến,</span><strong>{graduation.graduateName}</strong></div>
        <div className="letter-ornament" aria-hidden="true"><i /><span>✦</span><i /></div>
      </motion.article>
    </section>
  )
}
