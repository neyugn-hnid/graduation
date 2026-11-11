import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Send } from 'lucide-react'
import { saveRsvp } from '../lib/rsvp'
import type { RsvpStatus } from '../types'
import { graduation } from '../config/graduation'

export function RSVP() {
  const [status, setStatus] = useState<RsvpStatus>('attending')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState('1')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(null)
    const cleanName = name.trim()
    if (cleanName.length < 2) {
      setNotice({ kind: 'error', text: 'Vui lòng nhập họ tên để mình biết ai sẽ tham dự nhé.' })
      return
    }
    setSubmitting(true)
    try {
      const destination = await saveRsvp({
        name: cleanName,
        phone: phone.trim(),
        guests: status === 'attending' ? Number(guests) : 0,
        message: message.trim(),
        status,
        createdAt: new Date().toISOString(),
      })
      setNotice({ kind: 'success', text: destination === 'supabase' ? 'Mình đã nhận được xác nhận. Cảm ơn bạn!' : 'Xác nhận đã được lưu trên thiết bị này. Cảm ơn bạn!' })
    } catch (error) {
      setNotice({ kind: 'error', text: error instanceof Error ? error.message : 'Đã có lỗi xảy ra. Bạn vui lòng thử lại nhé.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="rsvp-section section-shell" id="rsvp">
      <div className="rsvp-orbit" aria-hidden="true" />
      <div className="rsvp-layout">
        <div className="rsvp-copy reveal"><p>Sự hiện diện của bạn là niềm vui lớn với em. Mong bạn phản hồi trước ngày {graduation.rsvpDeadline}.</p><div className="rsvp-flourish">✚ <span>trân trọng cảm ơn</span></div></div>
        <form className="rsvp-form reveal" onSubmit={handleSubmit}>
          <div className="form-choice" role="group" aria-label="Xác nhận tham dự">
            <button type="button" className={status === 'attending' ? 'selected' : ''} onClick={() => setStatus('attending')}><span className="choice-check">{status === 'attending' && <Check size={13} />}</span>MÌNH SẼ THAM DỰ</button>
            <button type="button" className={status === 'declined' ? 'selected' : ''} onClick={() => setStatus('declined')}><span className="choice-check">{status === 'declined' && <Check size={13} />}</span>RẤT TIẾC, MÌNH BẬN</button>
          </div>
          <label className="field-label">HỌ VÀ TÊN <span>*</span><input required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Mình nên xưng hô với bạn thế nào?" /></label>
          <div className="form-row">
            <label className="field-label">SỐ ĐIỆN THOẠI <small>KHÔNG BẮT BUỘC</small><input type="tel" autoComplete="tel" maxLength={24} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+84 ..." /></label>
            {status === 'attending' && <label className="field-label">SỐ NGƯỜI<input type="number" min="1" max="6" value={guests} onChange={(event) => setGuests(event.target.value)} aria-label="Số người tham dự" /></label>}
          </div>
          <label className="field-label">LỜI NHẮN <small>KHÔNG BẮT BUỘC</small><textarea rows={2} maxLength={400} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Gửi đôi lời đến tân bác sĩ nhé..." /></label>
          {notice && <p className={`form-notice ${notice.kind}`} role="status">{notice.text}</p>}
          <button className="submit-rsvp" type="submit" disabled={submitting}>{submitting ? 'ĐANG GỬI…' : 'GỬI XÁC NHẬN'} {submitting ? <Send size={15} /> : <ArrowUpRight size={16} />}</button>
          <p className="privacy-note">Thông tin của bạn chỉ được dùng để chuẩn bị buổi lễ.</p>
        </form>
      </div>
    </section>
  )
}
