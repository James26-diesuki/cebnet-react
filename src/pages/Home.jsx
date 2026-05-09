import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal, useCounterAnimation } from '../hooks/useScrollReveal'
import { ServiceIcon } from '../components/Icons'
import HeroCanvas from '../components/HeroCanvas'
import { TESTIMONIALS, STATS } from '../data/siteData'
import { usePartners, useClients, useServices } from '../hooks/useContentful'

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

export default function Home() {
  useScrollReveal()
  useCounterAnimation()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const { data: SERVICES } = useServices()
  const { data: CLIENTS  } = useClients()
  const { data: PARTNERS } = usePartners()

  // Duplicate for infinite marquees
  const clientsAll  = [...CLIENTS,  ...CLIENTS]
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

      {/* CLIENTS */}
      <section className="clients-section">
        <div className="container">
          <div className="clients-header">
            <div className="clients-header-left">
              <div className="section-label reveal">Our Clients</div>
              <h2 className="reveal reveal-delay-1">Trusted by leading organizations<br/>across the Philippines.</h2>
            </div>
          </div>
        </div>
        <div className="clients-marquee-wrap">
          <div className="clients-marquee clients-marquee--drift">
            {clientsAll.map((client, i) => (
              <div className="cmarq-card" key={i}>
                <div className="cmarq-logo-wrap">
                  <img
                    src={client.logo}
                    alt={client.name}
                    onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex' }}
                  />
                  <div className="cmarq-fallback">{client.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="clients-footnote reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            All client relationships are backed by signed NDAs and service agreements — your data and infrastructure are always protected.
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
      </section>

      {/* SERVICES */}
      <section className="section section-dark services-showcase">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">What We Offer</div>
            <h2 className="reveal reveal-delay-1">Technology that works: seamless, secure, smart.</h2>
            <p className="reveal reveal-delay-2">From ground-up network builds to ongoing managed security, we deliver IT that performs when it matters most.</p>
          </div>
          <div className="svc-cards-grid">
            {SERVICES.map((svc, i) => (
              <div key={i} className={`svc-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className={`svc-card-image svc-row-image--${i + 1}`}>
                  <div className="svc-card-image-label">
                    <div className="svc-card-image-icon"><ServiceIcon type={svc.icon} /></div>
                    <span>{svc.title}</span>
                  </div>
                </div>
                <div className="svc-card-body">
                  <div className="svc-card-icon"><ServiceIcon type={svc.icon} /></div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                  <Link to="/services" className="btn btn-outline svc-row-link">
                    Learn More
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                  </Link>
                </div>
              </div>
            ))}
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
                <img
                  src={p.logo} alt={p.name} title={p.name}
                  onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex' }}
                />
                <div className="partner-logo-fallback" style={{display:'none'}}>{p.name}</div>
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
                  <div className="author-avatar">{t.company.charAt(0).toUpperCase()}</div>
                  <div className="author-info">
                    <strong>{t.company}</strong>
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
