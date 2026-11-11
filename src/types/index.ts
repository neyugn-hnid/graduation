export type GalleryImage = {
  src: string
  alt: string
  caption: string
  year: string
  span?: 'wide' | 'tall'
}

export type RsvpStatus = 'attending' | 'declined'

export type RsvpSubmission = {
  name: string
  phone: string
  guests: number
  message: string
  status: RsvpStatus
  createdAt: string
}
