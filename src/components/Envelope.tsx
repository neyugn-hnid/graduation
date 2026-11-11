import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { graduation } from '../config/graduation'

type EnvelopeProps = { onOpen: () => void }

export function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <motion.div className="opening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.035 }} transition={{ duration: 0.7 }}>
      <div className="opening-stars" aria-hidden="true" />
      <div className="opening-copy">
        <span className="eyebrow"><Sparkles size={13} strokeWidth={1.5} /> THIỆP MỜI LỄ TỐT NGHIỆP</span>
        <p className="opening-quote">Đường dài ngàn dặm<br /><em>bắt đầu từ một bước chân.</em></p>
        <div className="opening-name">{graduation.graduateName}</div>
        <div className="opening-year">NIÊN KHÓA {graduation.graduationYear}</div>
      </div>

      <motion.button className="envelope" onClick={onOpen} aria-label="Mở thiệp mời tốt nghiệp" whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
        <span className="envelope-glow" />
        <span className="envelope-back" />
        <span className="envelope-letter"><span className="letter-rule" /><span className="letter-monogram">{graduation.graduateName.split(' ').slice(-1)[0]?.slice(0, 1) ?? 'A'}</span><span className="letter-rule short" /></span>
        <span className="envelope-flap" />
        <span className="envelope-front" />
        <span className="envelope-seal">✚</span>
      </motion.button>

      <motion.button className="open-invitation" onClick={onOpen} whileHover={{ letterSpacing: '0.24em' }}>
        <span>MỞ THIỆP MỜI</span><ArrowUpRight size={16} strokeWidth={1.4} />
      </motion.button>
      <p className="opening-hint">Một khoảnh khắc nhỏ, dành riêng cho bạn</p>
      <div className="opening-bottom"><span>{graduation.universityShort} · {graduation.graduationYear}</span><span>VỚI YÊU THƯƠNG VÀ LÒNG BIẾT ƠN</span></div>
    </motion.div>
  )
}
