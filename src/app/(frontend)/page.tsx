import LandingPage from './landing/page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Serving the global research community with quality journals and research platforms.',
  alternates: {
    canonical: '/',
  },
}

export default LandingPage
