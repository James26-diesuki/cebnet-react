import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE as SITE_FALLBACK } from '../data/siteData'
import { useSiteInfo } from '../hooks/useContentful'

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const location = useLocation()
  const { data: rawSite } = useSiteInfo()
  const SITE = { ...SITE_FALLBACK, ...rawSite }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDropdownOpen(null)
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeNav = () => {
    setMenuOpen(false)
    setDropdownOpen(null)
  }

  const toggleDropdown = (label) => {
    setDropdownOpen(prev => prev === label ? null : label)
  }

  const navRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo" onClick={closeNav}>
            <img src="/assets/img/team/cebnet.png" alt="CebNet Logo" className="logo-mark-img" />
            <div className="logo-text">
              <span className="logo-name">CebNet Technologies</span>
              <em className="logo-tagline">Your Trust. We Secure.</em>
            </div>
          </Link>

          <nav className={`main-nav${menuOpen ? ' open' : ''}`} id="main-nav" ref={navRef}>
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link.to} className={link.children ? 'has-dropdown' : ''}>
                  {link.children ? (
                    <>
                      <button
                        className={`dropdown-toggle${dropdownOpen === link.label ? ' open' : ''}${link.children.some(c => c.to === location.pathname) ? ' active' : ''}`}
                        onClick={() => toggleDropdown(link.label)}
                        aria-expanded={dropdownOpen === link.label}
                      >
                        {link.label}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                          <polyline points="6,9 12,15 18,9"/>
                        </svg>
                      </button>
                      <ul className={`dropdown-menu${dropdownOpen === link.label ? ' open' : ''}`}>
                        {link.children.map(child => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) => isActive ? 'active' : ''}
                              onClick={closeNav}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => isActive ? 'active' : ''}
                      onClick={closeNav}
                    >
                      {link.label}
                      {link.to === '/offers' && SITE.offersNavBadge && (
                        <span className="nav-badge">{SITE.offersNavBadge}</span>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link to="/contact" className="btn btn-primary header-cta" onClick={closeNav}>
            Let's Talk
          </Link>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span/><span/><span/>
          </button>
        </div>
      </header>

      <div
        className={`nav-backdrop${menuOpen ? ' active' : ''}`}
        onClick={closeNav}
      />
    </>
  )
}
