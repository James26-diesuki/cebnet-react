import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Company from './pages/Company'
import Services from './pages/Services'
import Partners from './pages/Partners'
import Offers from './pages/Offers'
import MspChallenge from './pages/MspChallenge'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import OurTeam from './pages/OurTeam'

const PAGE_TITLES = {
  '/':         'Home',
  '/company':  'Our Company',
  '/team':     'Our Team',
  '/services': 'Services',
  '/partners': 'Our Partners',
  '/offers':   'Offers',
  '/msp-challenge': 'MSP Email Security Challenge',
  '/careers':  'Careers',
  '/contact':  'Contact Us',
}

const SITE_NAME = 'CebNet Technologies, Inc.'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a tick so the destination page has rendered before we scroll to it.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo(0, 0)
        }
      })
    } else {
      window.scrollTo(0, 0)
    }
    const label = PAGE_TITLES[pathname]
    document.title = label ? `${label} | ${SITE_NAME}` : SITE_NAME
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/services" element={<Services />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/msp-challenge" element={<MspChallenge />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<OurTeam />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  )
}
