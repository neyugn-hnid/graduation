import { createClient } from '@supabase/supabase-js'
import type { RsvpSubmission } from '../types'

const STORAGE_KEY = 'ictu-graduation-rsvp-v1'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function readLocal(): RsvpSubmission[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(value) ? value as RsvpSubmission[] : []
  } catch {
    return []
  }
}

function matchesExisting(a: RsvpSubmission, b: RsvpSubmission) {
  const sameName = a.name.trim().toLocaleLowerCase() === b.name.trim().toLocaleLowerCase()
  const samePhone = a.phone.replace(/\D/g, '') === b.phone.replace(/\D/g, '')
  return sameName && (!a.phone || !b.phone || samePhone)
}

export async function saveRsvp(submission: RsvpSubmission): Promise<'supabase' | 'local'> {
  const existing = readLocal()
  if (existing.some((item) => matchesExisting(item, submission))) {
    throw new Error('Tên này đã được dùng để xác nhận tham dự. Nếu cần thay đổi, bạn có thể nhắn trực tiếp cho tân bác sĩ nhé.')
  }

  if (supabaseUrl && supabaseKey) {
    try {
      const client = createClient(supabaseUrl, supabaseKey)
      const { error } = await client.from('rsvps').insert({
        name: submission.name,
        phone: submission.phone || null,
        guests: submission.guests,
        message: submission.message || null,
        status: submission.status,
        created_at: submission.createdAt,
      })
      if (!error) return 'supabase'
    } catch {
      // Keep the invitation usable when the network or Supabase is unavailable.
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, submission]))
  return 'local'
}
