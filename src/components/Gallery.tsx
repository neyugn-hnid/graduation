import { graduation } from '../config/graduation'

export function Gallery() {
  const images = graduation.gallery.slice(0, 5)

  return (
    <section className="gallery-section section-shell" id="gallery" aria-label="Ảnh kỷ niệm">
      <div className="gallery-grid">
        {images.map((image) => <figure className={`gallery-item ${image.span ?? ''} reveal`} key={image.src}>
          <img src={image.src} alt={image.alt} loading="lazy" />
        </figure>)}
      </div>
    </section>
  )
}
