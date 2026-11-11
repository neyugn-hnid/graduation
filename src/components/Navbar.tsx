import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { graduation } from '../config/graduation'

const links = [
  ['Ngày lễ', '#event'], ['Kỷ niệm', '#gallery'],
] as const

type NavbarProps = { musicOn: boolean; onToggleMusic: () => void }

export function Navbar({ musicOn, onToggleMusic }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={close} aria-label="Về đầu trang">
        <span className="brand-mark">{graduation.graduateName.split(' ').slice(-1)[0]?.slice(0, 1) ?? 'A'}</span>
        <span>{graduation.graduateName}</span>
      </a>
      <nav className="desktop-nav" aria-label="Điều hướng chính">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className={`sound-toggle ${musicOn ? 'is-playing' : ''}`} onClick={onToggleMusic} aria-pressed={musicOn} aria-label={musicOn ? 'Tắt nhạc nền' : 'Bật nhạc nền'}>
          <span className="sound-bars"><i /><i /><i /><i /></span><span>{musicOn ? 'Tắt nhạc' : 'Bật nhạc'}</span>
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Đóng trình đơn' : 'Mở trình đơn'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} aria-label="Điều hướng trên điện thoại">
          {links.map(([label, href], index) => <motion.a key={href} href={href} onClick={close} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>{label}</motion.a>)}
        </motion.nav>}
      </AnimatePresence>
    </header>
  )
}
