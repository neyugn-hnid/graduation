import { motion, useReducedMotion } from 'framer-motion'
import { graduation } from '../config/graduation'

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero-section graduation-cover" id="top" aria-labelledby="hero-title">
      <div className="cover-stage">
        <header className="cover-heading">
          <motion.span
            className="cover-script"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .45, delay: .06, ease: 'easeOut' }}
          >Thư mời</motion.span>
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: .5, delay: .2, ease: 'easeOut' }}
          >LỄ TỐT NGHIỆP</motion.h1>
        </header>

        <motion.img
          className="cover-photo"
          src={graduation.portrait}
          alt="Ảnh lễ tốt nghiệp"
          initial={reduceMotion ? false : { opacity: 0, x: '-50%', y: 16 }}
          animate={{ opacity: 1, x: '-50%', y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .6, delay: .36, ease: 'easeOut' }}
        />

        <motion.div
          className="cover-name-banner"
          initial={reduceMotion ? false : { opacity: 0, y: 18, skewX: -7 }}
          animate={{ opacity: 1, y: 0, skewX: -7 }}
          transition={reduceMotion ? { duration: 0 } : { duration: .5, delay: .55, ease: 'easeOut' }}
        >
          <span>{graduation.graduateName}</span>
        </motion.div>
      </div>
    </section>
  )
}
