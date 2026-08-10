import { useScrollReveal } from '../hooks/useScrollReveal'
import { SITE as SITE_FALLBACK } from '../data/siteData'
import { useSiteInfo } from '../hooks/useContentful'

export default function Contact() {
  useScrollReveal()
  const { data: rawSite } = useSiteInfo()
  const SITE = { ...SITE_FALLBACK, ...rawSite }

  const mapsQuery = encodeURIComponent(SITE.address)

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container">
          <div className="section-label">Contact Us</div>
          <h1>Let's start the<br/>conversation.</h1>
          <p>Our team is ready to listen, assess, and recommend. Reach out to us today.</p>
        </div>
      </section>

      <section id="contact-details" className="section contact-section">
        <div className="container">
          <div className="contact-two-col">

            {/* LEFT — Info tiles */}
            <div className="contact-info-col">

              <div className="contact-info-tile reveal">
                <div className="contact-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <strong>Visit Our Office</strong>
                  <span>{SITE.address}</span>
                </div>
              </div>

              <div className="contact-info-tile reveal reveal-delay-1">
                <div className="contact-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.44 2 2 0 0 1 3.56 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <span>
                    <span className="phone-carrier">{SITE.phone1Label}:</span>{' '}
                    <a href={`tel:${SITE.phone1.replace(/\s+/g,'')}`}>{SITE.phone1}</a>
                    <br/>
                    <span className="phone-carrier">{SITE.phone2Label}:</span>{' '}
                    <a href={`tel:${SITE.phone2.replace(/\s+/g,'')}`}>{SITE.phone2}</a>
                  </span>
                </div>
              </div>

              <div className="contact-info-tile contact-info-tile--email reveal reveal-delay-2">
                <div className="contact-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <strong>Send us an Email</strong>
                  <span>We typically respond within one business day.</span>
                  <div className="contact-email-list">
                    <div className="contact-email-item">
                      <span className="contact-email-label">Sales Inquiries</span>
                      <a href={`mailto:${SITE.emailSales}?subject=Sales%20Inquiry`} className="contact-email-link">
                        {SITE.emailSales}
                      </a>
                    </div>
                    <div className="contact-email-item">
                      <span className="contact-email-label">Technical Inquiries</span>
                      <a href={`mailto:${SITE.emailTech}?subject=Technical%20Inquiry`} className="contact-email-link">
                        {SITE.emailTech}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-info-tile reveal reveal-delay-3">
                <div className="contact-tile-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <div>
                  <strong>Business Hours</strong>
                  <span style={{whiteSpace:'pre-line'}}>
                    {SITE.businessHours || 'Mon–Fri: 8:00 AM – 6:00 PM'}
                  </span>
                </div>
              </div>

            </div>

            {/* RIGHT — Map */}
            <div className="map-full-wrap reveal reveal-delay-1">
              <div className="map-full-overlay">
                <div className="map-full-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{SITE.address}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Get Directions
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                  </svg>
                </a>
              </div>
              <iframe
                title="CebNet Technologies Office Location"
                width="100%"
                height="100%"
                style={{border:0}}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
