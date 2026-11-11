import type { GalleryImage } from '../types'

/**
 * Chỉnh sửa thiệp tại đây. Nội dung hiện tại là dữ liệu mẫu; hãy thay tên,
 * ngày giờ, địa điểm và ảnh trước khi chia sẻ đường dẫn.
 */
export const graduation = {
  graduateName: 'HÀ NGUYỄN PHƯƠNG DUNG',
  university: 'Trường Đại học Y - Dược, Đại học Thái Nguyên',
  universityShort: 'Y DƯỢC THÁI NGUYÊN',
  major: 'Y khoa · Bác sĩ đa khoa',
  cohort: '2020 — 2026',
  startedYear: 2020,
  graduationYear: 2026,
  eventDate: '2026-11-27T09:00:00+07:00',
  rsvpDeadline: '27 tháng 11, 2026',
  eventTime: '09:00 — Chủ Nhật, 27 tháng 11, 2026',
  venue: 'Trường Đại học Y - Dược',
  address: 'Phường Phan Đình Phùng, Tỉnh Thái Nguyên',
  mapUrl: 'https://maps.app.goo.gl/Ps8DJBJKajPwA2UT9',
  portrait: '/images/1.png',
  musicUrl: '',
  journey: [
    { year: '2020', title: 'Chiếc áo blouse đầu tiên', copy: 'Bắt đầu hành trình với chiếc áo blouse đầu tiên, những trang giải phẫu dày và một lời hứa: học để chăm sóc con người.' },
    { year: '2022', title: 'Học cách lắng nghe', copy: 'Từ giảng đường đến những buổi thực tập đầu tiên — học cách quan sát, lắng nghe và đặt sự tử tế vào mỗi lần chăm sóc.' },
    { year: '2024', title: 'Những ngày ở bệnh viện', copy: 'Những ca trực dài, những người thầy tận tâm và đồng đội đã cùng nhau đi qua từng ngày nhiều thử thách.' },
    { year: '2026', title: 'Lời hứa chăm sóc', copy: 'Khép lại sáu năm học bằng lòng biết ơn, sẵn sàng bước tiếp với tri thức, sự khiêm nhường và trái tim biết sẻ chia.' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85', alt: 'Bác sĩ chăm sóc bệnh nhân trong phòng khám', caption: 'Lý do bắt đầu hành trình', year: '2026', span: 'wide' },
    { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85', alt: 'Sinh viên y khoa học tập trong môi trường lâm sàng', caption: 'Học cách chăm sóc', year: '2024', span: 'tall' },
    { src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1000&q=85', alt: 'Đội ngũ y tế cùng làm việc', caption: 'Cùng nhau trưởng thành', year: '2023' },
    { src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1000&q=85', alt: 'Dụng cụ y tế được chuẩn bị cho một ngày thực tập', caption: 'Những ngày miệt mài', year: '2025' },
    { src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85', alt: 'Áo blouse trắng và ống nghe của sinh viên y khoa', caption: 'Tận tâm vì sự sống', year: '2026', span: 'wide' },
  ] satisfies GalleryImage[],
}

export type GraduationConfig = typeof graduation
