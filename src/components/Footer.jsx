import { Link } from 'react-router-dom'
import { SITE as SITE_FALLBACK } from '../data/siteData'
import { useSiteInfo } from '../hooks/useContentful'

export default function Footer() {
  const { data: rawSite } = useSiteInfo()
  const SITE = { ...SITE_FALLBACK, ...rawSite }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        <div className="footer-brand">
          <Link to="/" className="logo logo--light">
            <img src="/assets/img/team/cebnet.png" alt="CebNet Logo" className="logo-mark-img" />
            <div className="logo-text">
              <span className="logo-name">CebNet Technologies</span>
              <em className="logo-tagline">Your Trust. We Secure.</em>
            </div>
          </Link>
          <p>Focus-Oriented Systems Integration &amp; Network Security specialists serving Cebu and beyond since 2018.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" aria-label="Twitter/X">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/company">Our Company</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Systems Integration</Link></li>
            <li><Link to="/services">Network Security</Link></li>
            <li><Link to="/services">IT Infrastructure</Link></li>
            <li><Link to="/services">IT Consulting</Link></li>
            <li><Link to="/services">Cloud Solutions</Link></li>
            <li><Link to="/services">Managed Support</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{SITE.address}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.44 2 2 0 0 1 3.56 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>{SITE.phone1} / {SITE.phone2}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>{SITE.email}</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Disclaimer</a>
            <a href="#">Support Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
