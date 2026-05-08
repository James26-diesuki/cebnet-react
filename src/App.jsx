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
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import OurTeam from './pages/OurTeam'

const PAGE_TITLES = {
  '/':         'Home',
  '/company':  'Our Company',
  '/team':     'Our Team',
  '/services': 'Services',
  '/partners': 'Our Partners',
  '/careers':  'Careers',
  '/contact':  'Contact Us',
}

const SITE_NAME = 'CebNet Technologies, Inc.'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const label = PAGE_TITLES[pathname]
    document.title = label ? `${label} | ${SITE_NAME}` : SITE_NAME
  }, [pathname])
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
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<OurTeam />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  )
}
