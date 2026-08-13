import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal, useCounterAnimation } from '../hooks/useScrollReveal'
import { ServiceIcon } from '../components/Icons'
import PartnerLogo from '../components/PartnerLogo'
import HeroCanvas from '../components/HeroCanvas'
import { TESTIMONIALS, STATS } from '../data/siteData'
import { usePartners, useServices, useAnnouncements, useOffers } from '../hooks/useContentful'

// Shown in the "New Offers" panel whenever the client hasn't published any
// offers in Contentful yet — keeps the section from ever looking empty.
const DEFAULT_OFFER = {
  title: 'ThreatSentra',
  desc: "CebNet's own cybersecurity brand — Email Security and Endpoint Security, powered by Check Point.",
  badge: 'Now Available',
  logo: '/assets/img/threatsentra/threatsentra-logo.png',
  link: '/#threatsentra',
  linkLabel: 'See Details',
}

// Shown in the "Announcements" panel whenever the client hasn't published any
// announcements in Contentful yet — keeps the section from ever looking empty.
const DEFAULT_ANNOUNCEMENT = {
  title: 'Free Security Checkup',
  message: 'Claim a no-cost professional assessment of your current network security posture — no strings attached.',
  link: '/services#security-checkup',
  linkLabel: 'See Details',
}

// ── Typing animation badge ──
function HeroBadge() {
  const [typed, setTyped] = useState('')
  const phrases = ['Systems Integration','Network Security','IT Infrastructure','Cloud Solutions','Managed Support']

  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, deleting = false
    const TYPE_SPEED = 68, DELETE_SPEED = 34, PAUSE_AFTER = 2200, PAUSE_BEFORE = 400

    function tick() {
      const current = phrases[phraseIdx]
      if (!deleting) {
        setTyped(current.slice(0, ++charIdx))
        if (charIdx === current.length) {
          deleting = true
          setTimeout(tick, PAUSE_AFTER); return
        }
        setTimeout(tick, TYPE_SPEED)
      } else {
        setTyped(current.slice(0, --charIdx))
        if (charIdx === 0) {
          deleting = false
          phraseIdx = (phraseIdx + 1) % phrases.length
          setTimeout(tick, PAUSE_BEFORE); return
        }
        setTimeout(tick, DELETE_SPEED)
      }
    }
    const t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="hero-badge">
      <span className="hero-badge-prompt">~/cebnet<span className="hero-badge-caret">$</span></span>
      <span className="hero-badge-typed">{typed}</span>
      <span className="hero-badge-cursor">▋</span>
    </div>
  )
}

// ── Video Lightbox ──
function VideoLightbox({ open, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (open) {
      document.body.style.overflow = 'hidden'
      videoRef.current.play().catch(() => {})
    } else {
      document.body.style.overflow = ''
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [open])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`video-lightbox${open ? ' active' : ''}`}
      id="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="video-lightbox-inner">
        <button className="video-lightbox-close" onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Close
        </button>
        <video
          ref={videoRef}
          id="lightbox-video"
          src="/assets/video/cebnet-operations.mp4"
          poster="/assets/img/team/thumbnail.png"
          controls playsInline preload="none"
          style={{ width:'100%',height:'100%',objectFit:'contain',background:'#000' }}
        />
      </div>
    </div>
  )
}


// ── Image Lightbox (click-to-zoom for announcement images) ──
function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = image ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="video-lightbox active"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="video-lightbox-inner" style={{ aspectRatio: 'auto', background: 'transparent', boxShadow: 'none', maxWidth: '90vw' }}>
        <button className="video-lightbox-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Close
        </button>
        <img
          src={image.src}
          alt={image.title}
          style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px', display: 'block' }}
        />
      </div>
    </div>
  )
}


// ── Small logo badge with retry-on-error (same reasoning as PartnerLogo —
// one failed CDN hit shouldn't permanently hide it) ──
function OfferLogo({ src, alt }) {
  const [attempt, setAttempt] = useState(0)
  const [hidden,  setHidden]  = useState(false)
  const retries = useRef(0)

  if (!src || hidden) return null

  const handleError = () => {
    if (retries.current < 2) {
      retries.current += 1
      setTimeout(() => setAttempt(a => a + 1), 400 * retries.current)
    } else {
      setHidden(true)
    }
  }

  return (
    <div className="updates-offer-logo-wrap">
      <img key={attempt} src={src} alt={alt} className="updates-offer-logo" onError={handleError} />
    </div>
  )
}


// ── Small inline logo shown mid-sentence in announcement text (e.g.
// "...powered by [logo]") — same retry-on-error reasoning as OfferLogo/PartnerLogo. ──
function InlineLogo({ src, alt }) {
  const [attempt, setAttempt] = useState(0)
  const [hidden,  setHidden]  = useState(false)
  const retries = useRef(0)

  if (!src || hidden) return null

  const handleError = () => {
    if (retries.current < 2) {
      retries.current += 1
      setTimeout(() => setAttempt(a => a + 1), 400 * retries.current)
    } else {
      setHidden(true)
    }
  }

  return (
    <span key={attempt} className="updates-announcement-logo-wrap">
      <img
        src={src}
        alt={alt}
        className="updates-announcement-logo"
        onError={handleError}
      />
    </span>
  )
}


// ── Flip card with touch support ──
function FlipCard({ svc, i }) {
  const [flipped, setFlipped] = useState(false)

  const handleClick = () => setFlipped(f => !f)

  return (
    <div
      className={`svc-flip-card reveal reveal-delay-${(i % 3) + 1}`}
      onClick={handleClick}
    >
      {/* FRONT — shown when not flipped */}
      <div className={`svc-flip-face svc-flip-front${flipped ? ' svc-flip-face--hidden' : ''}`}>
        <div className="svc-flip-bg" style={{backgroundImage: `url('${svc.image || ''}')`}} />
        <div className="svc-flip-front-overlay" />
        <div className="svc-flip-front-content">
          <h3>{svc.title}</h3>
          <div className="svc-flip-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M7 10l5 5 5-5"/></svg>
            Tap to learn more
          </div>
        </div>
      </div>
      {/* BACK — shown when flipped */}
      <div className={`svc-flip-face svc-flip-back${flipped ? '' : ' svc-flip-face--hidden'}`}>
        <div className="svc-flip-back-icon"><ServiceIcon type={svc.icon} /></div>
        <h3>{svc.title}</h3>
        <p>{svc.desc}</p>
        <Link
          to="/services"
          className="btn btn-primary svc-flip-btn"
          onClick={e => e.stopPropagation()}
        >
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  useScrollReveal()
  useCounterAnimation()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [announcementImage, setAnnouncementImage] = useState(null)

  const { data: SERVICES } = useServices()
  const { data: PARTNERS } = usePartners()
  const { data: ANNOUNCEMENTS } = useAnnouncements()
  const { data: OFFERS   } = useOffers()

  const featuredOffer = OFFERS.length > 0 ? OFFERS[0] : DEFAULT_OFFER

  // Duplicate for infinite marquee
  const partnersAll = [...PARTNERS, ...PARTNERS]

  const features = [
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>', title: 'Security by Design', desc: 'Every solution has security baked in from day one — not bolted on after deployment.' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="6"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85"/></svg>', title: 'Vendor-Certified Team', desc: 'Fortinet, Cisco, Check Point and more — our engineers hold the credentials that matter.' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>', title: 'End-to-End Delivery', desc: 'From scoping to deployment and ongoing support — we own the full project lifecycle.' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', title: 'Proactive Support', desc: 'We monitor, respond, and resolve before issues become outages — keeping your business always on.' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero-canvas-vignette"></div>
        <div className="container">
          <div className="hero-content">
            <HeroBadge />
            <h1>
              Secure Networks.<br/>
              <span className="glitch" data-text="Smarter IT.">Smarter IT.</span><br/>
              Real Results.
            </h1>
            <p>CebNet Technologies is the SI partner you can trust — helping secure the future of your business with the right enterprise network assets, certified consultants, and battle-tested solutions.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Let's Talk
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </Link>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-group">
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v8M12 16l-7 3M12 16l7 3"/></svg>
                  </div>
                  <h4>Enterprise Clients</h4>
                </div>
                <div className="stat-num">
                  <span data-target={STATS.clients.value} data-suffix={STATS.clients.suffix}>0{STATS.clients.suffix}</span>
                </div>
                <div className="stat-bar"><div className="stat-bar-fill" style={{width:'82%'}}></div></div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h4>Security Incidents Prevented</h4>
                </div>
                <div className="stat-num">
                  <span data-target={STATS.incidents.value} data-suffix={STATS.incidents.suffix}>0{STATS.incidents.suffix}</span>
                </div>
                <div className="stat-bar"><div className="stat-bar-fill" style={{width:'95%'}}></div></div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>
                  </div>
                  <h4>Years in Business</h4>
                </div>
                <div className="stat-num">
                  <span data-target={STATS.years.value} data-suffix={STATS.years.suffix}>0{STATS.years.suffix}</span>
                </div>
                <div className="stat-bar"><div className="stat-bar-fill" style={{width:'70%'}}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS & NEW OFFERS — extends the hero */}
      <section className="section updates-section">
        <div className="container">
          <div className="updates-grid">

            {/* Announcements */}
            <div className="updates-card reveal">
              <div className="updates-card-header">
                <div className="updates-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <div>
                  <span className="updates-card-label"><span className="updates-live-dot"></span>Announcements</span>
                  <h3>Company Updates</h3>
                </div>
              </div>
              <div className="updates-card-divider"></div>
              <div className="updates-card-body">
                {ANNOUNCEMENTS.length === 0 ? (
                  <div className="updates-offer">
                    <strong>{DEFAULT_ANNOUNCEMENT.title}</strong>
                    <p>{DEFAULT_ANNOUNCEMENT.message}</p>
                    <Link to={DEFAULT_ANNOUNCEMENT.link} className="btn btn-outline updates-offer-cta">
                      {DEFAULT_ANNOUNCEMENT.linkLabel}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                    </Link>
                  </div>
                ) : (
                  <ul className="updates-list">
                    {ANNOUNCEMENTS.map((a, i) => (
                      <li key={i} className={`updates-list-item reveal reveal-delay-${(i % 5) + 1}`}>
                        {a.images?.[0] && (
                          <div
                            className="updates-list-image"
                            onClick={() => setAnnouncementImage({ src: a.images[0], title: a.title })}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && setAnnouncementImage({ src: a.images[0], title: a.title })}
                            aria-label={`View larger image for ${a.title}`}
                          >
                            <img src={a.images[0]} alt={a.title} />
                            <span className="updates-list-image-zoom">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                              </svg>
                            </span>
                          </div>
                        )}
                        <div className="updates-list-item-top">
                          {a.date && <span className="updates-list-date">{a.date}</span>}
                          {i === 0 && <span className="updates-new-badge">New</span>}
                        </div>
                        <strong>{a.title}</strong>
                        {a.message && (
                          <p>
                            {a.message}
                            {a.logo && <InlineLogo src={a.logo} alt={`${a.title} logo`} />}
                          </p>
                        )}
                        {a.link && (
                          <Link to={a.link} className="btn btn-outline updates-offer-cta" style={{ marginTop: '10px' }}>
                            {a.linkLabel}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* New Offers */}
            <div className="updates-card updates-card--offer reveal reveal-delay-1">
              <div className="updates-card-header">
                <div className="updates-card-icon updates-card-icon--offer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83z"/>
                    <circle cx="7.5" cy="7.5" r="1.5"/>
                  </svg>
                </div>
                <div>
                  <span className="updates-card-label"><span className="updates-live-dot"></span>New Offers</span>
                  <h3>Current Promotions</h3>
                </div>
              </div>
              <div className="updates-card-divider"></div>
              <div className="updates-card-body">
                {featuredOffer ? (
                  <div className="updates-offer">
                    {featuredOffer.badge && <span className="updates-offer-badge reveal">{featuredOffer.badge}</span>}
                    <div className="updates-offer-title-row reveal reveal-delay-1">
                      <strong>{featuredOffer.title}</strong>
                      <OfferLogo src={featuredOffer.logo} alt={`${featuredOffer.title} logo`} />
                    </div>
                    <p className="reveal reveal-delay-2">{featuredOffer.desc}</p>
                    <Link to={featuredOffer.link} className="btn btn-outline updates-offer-cta reveal reveal-delay-3">
                      {featuredOffer.linkLabel}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                    </Link>
                  </div>
                ) : (
                  <div className="updates-placeholder">
                    <p>No current offers. Check back soon for new promos.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUSTED BY — industries served, no named clients (NDA) */}
      <section className="section trusted-section">
        <div className="container">
          <div className="trusted-header">
            <div className="section-label reveal">Our Reach</div>
            <h2 className="reveal reveal-delay-1">Trusted by Leading Organizations<br/>Across the Philippines.</h2>
            <p className="reveal reveal-delay-2">
              We are proud to support organizations across BPO, Financial Services, Hospitality, Healthcare,
              Retail, Education, Manufacturing, and other industries with reliable IT infrastructure and
              cybersecurity solutions.
            </p>
          </div>

          <div className="trusted-industries reveal reveal-delay-3">
            {['BPO', 'Financial Services', 'Hospitality', 'Healthcare', 'Retail', 'Education', 'Manufacturing', '& More'].map((ind, i) => (
              <span key={i} className="trusted-industry-chip">{ind}</span>
            ))}
          </div>

          <div className="trusted-footnote reveal reveal-delay-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Client identities are protected under NDA — every engagement is backed by signed confidentiality and service agreements.
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section">
        <div className="container">
          <div className="about-intro reveal">
            <div className="section-label">About CebNet</div>
            <h2>More than IT. We're your <em style={{fontStyle:'normal',color:'var(--clr-accent)'}}>digital defense</em> partner.</h2>
          </div>
          <div className="about-top-row">
            <div className="about-desc reveal reveal-delay-1">
              <p className="about-lead">CebNet Technologies, Inc. is built on one promise: delivering IT infrastructure that is scalable, efficient, and genuinely secure. Our team of highly certified consultants brings multidisciplinary experience to every engagement.</p>
              <p>Founded in Cebu, we've grown into one of the Visayas' most trusted systems integrators — serving banking, healthcare, retail, manufacturing, and government sectors with precision-engineered network and security solutions.</p>
              <Link to="/company" className="btn btn-outline reveal reveal-delay-3" style={{marginTop:'16px'}}>
                Learn More About Us
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:'14px',height:'14px'}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </Link>
            </div>
            <div className="about-video-wrap reveal reveal-delay-2" onClick={() => setLightboxOpen(true)}>
              <video
                className="about-video"
                src="/assets/video/cebnet-operations.mp4"
                poster="/assets/img/team/thumbnail.png"
                playsInline preload="metadata" muted
              />
              <div className="video-play-btn" aria-label="Play video">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="40" fill="rgba(232,37,26,0.85)"/>
                  <polygon points="32,24 60,40 32,56" fill="#ffffff"/>
                </svg>
              </div>
              <div className="about-video-label">Watch Our Story</div>
            </div>
          </div>

          <div className="about-features-grid">
            {features.map((f, i) => (
              <div key={i} className={`about-feature-card reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="afc-icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
                <div className="afc-body">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <VideoLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
        <ImageLightbox image={announcementImage} onClose={() => setAnnouncementImage(null)} />
      </section>

      {/* SERVICES */}
      <section className="section section-dark services-showcase">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">What We Offer</div>
            <h2 className="reveal reveal-delay-1">Technology that works: seamless, secure, smart.</h2>
            <p className="reveal reveal-delay-2">From ground-up network builds to ongoing managed security, we deliver IT that performs when it matters most.</p>
          </div>
          <div className="svc-flip-grid">
            {SERVICES.map((svc, i) => (
              <FlipCard key={i} svc={svc} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* THREATSENTRA — CebNet's own security brand, powered by Check Point */}
      <section id="threatsentra" className="section threatsentra-section">
        <div className="container">

          <div className="ts-intro">
            <div className="section-label reveal">Introducing</div>
            <h2 className="reveal reveal-delay-1">ThreatSentra</h2>
            <p className="ts-tagline reveal reveal-delay-2">CebNet's own cybersecurity brand, powered by Check Point.</p>
            <div className="ts-intro-box reveal reveal-delay-2">
              <p>ThreatSentra is a cybersecurity initiative designed to help organizations identify threats, understand security risks, and strengthen protection across the areas threat actors target most.</p>
            </div>
          </div>

          <div className="ts-clear reveal reveal-delay-2">
            <h3>Cybersecurity Made Clear.</h3>
            <p>Modern cyber threats can reach an organization through a single email, a malicious file, or a compromised device. ThreatSentra brings a clear, security-focused approach to help businesses recognize threats and protect what matters most.</p>
          </div>

          <div className="ts-solutions">
            <div className="ts-solution-card reveal reveal-delay-1">
              <div className="ts-solution-image">
                <img src="/assets/img/threatsentra/threatsentra-email-security.jpg" alt="ThreatSentra Email Security" />
              </div>
              <div className="ts-solution-body">
                <h4>ThreatSentra Email Security</h4>
                <div className="ts-solution-headline">See Beyond the Message.</div>
                <p>Email is one of the most common ways threat actors reach an organization. ThreatSentra Email Security helps identify and protect against suspicious and potentially dangerous messages before they become a security incident.</p>
                <ul className="ts-solution-list">
                  {[
                    'Phishing and impersonation attempts',
                    'Malicious links and attachments',
                    'Suspicious or unwanted email activity',
                    'A stronger layer of protection for users and business communication',
                  ].map((item, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ts-solution-card reveal reveal-delay-2">
              <div className="ts-solution-image">
                <img src="/assets/img/threatsentra/threatsentra-endpoint-security.jpg" alt="ThreatSentra Endpoint Security" />
              </div>
              <div className="ts-solution-body">
                <h4>ThreatSentra Endpoint Security</h4>
                <div className="ts-solution-headline">Know What's Running. Stop What's Dangerous.</div>
                <p>Every laptop and workstation can become an entry point for the threat actor. ThreatSentra Endpoint Security helps protect business devices by detecting malicious activity and threats such as malware and ransomware.</p>
                <ul className="ts-solution-list">
                  {[
                    'Endpoint visibility and threat detection',
                    'Protection against malware and ransomware',
                    'Identification of suspicious or dangerous activity',
                    'Faster action when threats are detected',
                  ].map((item, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="ts-approach reveal reveal-delay-2">
            <h3>The ThreatSentra Approach</h3>
            <div className="ts-approach-grid">
              {[
                { num: '01', title: 'See', desc: 'Identify suspicious activity and potential threats.' },
                { num: '02', title: 'Understand', desc: 'Know the risk and what could be affected.' },
                { num: '03', title: 'Protect', desc: 'Take action to strengthen your security.' },
              ].map((step, i) => (
                <div className="ts-approach-step" key={i}>
                  <span className="ts-approach-num">{step.num}</span>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ts-closing reveal reveal-delay-3">
            <div className="ts-closing-brand">Threat<span>Sentra</span></div>
            <p className="ts-closing-tagline">See the Threat. Understand the Risk. Protect What Matters.</p>
            <div className="ts-closing-sub">Email Security&nbsp; &middot; &nbsp;Endpoint Security</div>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '28px' }}>
              Talk to an Expert
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
            </Link>
          </div>

        </div>
      </section>

      {/* PARTNERS */}
      <section className="section partners-section">
        <div className="container">
          <div className="partners-header">
            <div className="section-label reveal">Our Partners</div>
            <h2 className="reveal reveal-delay-1">Backed by the world's leading technology brands.</h2>
          </div>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {partnersAll.map((p, i) => (
              <div className="partner-logo-card" key={i}>
                <PartnerLogo src={p.logo} name={p.name} fallbackClassName="partner-logo-fallback" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-dark">
        <div className="container">
          <div className="testimonials-header">
            <div className="section-label reveal">Client Stories</div>
            <h2 className="reveal reveal-delay-1">What Our Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                <span className="quote-mark">"</span>
                <p>{t.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="author-info">
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="section-label reveal" style={{justifyContent:'center'}}>Take the Next Step</div>
          <h2 className="reveal reveal-delay-1">Your business deserves the best IT partner in Cebu.</h2>
          <p className="reveal reveal-delay-2">Our consultants are ready to assess your current infrastructure and build a roadmap to a more secure, efficient, and scalable future.</p>
          <div className="cta-actions reveal reveal-delay-3">
            <Link to="/contact" className="btn btn-primary">
              Let's Talk
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
            </Link>
            <Link to="/services" className="btn btn-outline">View Our Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
