import { useMemo, useState } from 'react'
import { ArrowLeft, Check, Copy, ExternalLink, Link2 } from 'lucide-react'
import { graduation } from '../config/graduation'

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, ' ').slice(0, 80)
}

export function AdminPage() {
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)
  const normalizedName = normalizeName(name)
  const invitationUrl = useMemo(() => {
    if (!normalizedName) return ''
    const url = new URL('/', window.location.origin)
    url.searchParams.set('guestName', normalizedName)
    url.searchParams.set('v', '3')
    return url.toString()
  }, [normalizedName])

  async function copyLink() {
    if (!invitationUrl) return
    try {
      await navigator.clipboard.writeText(invitationUrl)
    } catch {
      const temporaryInput = document.createElement('textarea')
      temporaryInput.value = invitationUrl
      temporaryInput.style.position = 'fixed'
      temporaryInput.style.opacity = '0'
      document.body.appendChild(temporaryInput)
      temporaryInput.select()
      document.execCommand('copy')
      temporaryInput.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="admin-page">
      <section className="admin-card" aria-labelledby="admin-title">
        <a className="admin-back" href="/" aria-label="Về thiệp mời">
          <ArrowLeft size={16} /> VỀ THIỆP MỜI
        </a>
        <span className="admin-eyebrow"><Link2 size={15} /> THIỆP MỜI TỐT NGHIỆP</span>
        <h1 id="admin-title">Tạo link<br /><em>thiệp mời</em></h1>
        <p className="admin-description">Nhập tên người nhận. Tên này sẽ hiện ở phần kính mời; tên nhân vật chính trên bìa được giữ nguyên.</p>

        <label className="admin-label" htmlFor="graduate-name">Tên người nhận</label>
        <input
          id="graduate-name"
          className="admin-input"
          type="text"
          value={name}
          maxLength={80}
          autoComplete="off"
          placeholder="Ví dụ: Nguyễn Minh Anh"
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') void copyLink() }}
        />
        <span className="admin-hint">Tên nhân vật chính trên bìa: {graduation.graduateName}</span>

        {invitationUrl ? (
          <div className="admin-result" aria-live="polite">
            <label className="admin-label" htmlFor="invitation-link">Link thiệp mời</label>
            <div className="admin-link-row">
              <input id="invitation-link" className="admin-input admin-url" type="url" value={invitationUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
              <button className="admin-copy-button" type="button" onClick={() => void copyLink()}>
                {copied ? <Check size={17} /> : <Copy size={17} />}
                <span>{copied ? 'ĐÃ SAO CHÉP' : 'SAO CHÉP'}</span>
              </button>
            </div>
            <a className="admin-preview" href={invitationUrl} target="_blank" rel="noreferrer">
              Mở thử thiệp <ExternalLink size={15} />
            </a>
          </div>
        ) : (
          <p className="admin-empty">Link sẽ xuất hiện tại đây sau khi bạn nhập tên.</p>
        )}
      </section>
    </main>
  )
}
