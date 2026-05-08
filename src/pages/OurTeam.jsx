import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTeamMembers, useGallery } from '../hooks/useContentful'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const history = [
  {
    year: 'December 2017',
    title: 'The Idea Takes Shape',
    desc: 'CebNet Technologies Inc. started from an idea posted on social media by one of the founders, looking for visionary technical entrepreneurs to collaborate with in Cebu. Three members met to discuss the idea that would soon become a company.',
  },
  {
    year: 'January 2018',
    title: 'CebNet is Born',
    desc: 'The idea became reality — CebNet Technologies, Inc. was officially established. That same month, two more members joined to complete the team and make it more dynamic.',
  },
  {
    year: 'Today',
    title: 'A Resilient Organization',
    desc: 'This group of young IT professionals with diverse backgrounds in network and security comprises a resilient organization with a breadth of experience spanning over 20 years — catering to different market segments with customers across the country.',
  },
]

// ── Lightbox for gallery ──
function GalleryLightbox({ image, title, onClose }) {
  if (!image) return null
  return (
    <div
      className="video-lightbox active"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="video-lightbox-inner" style={{ background: 'transparent', boxShadow: 'none' }}>
        <button className="video-lightbox-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Close
        </button>
        <img
          src={image}
          alt={title}
          style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px' }}
        />
        {title && (
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '12px', fontSize: '.9rem', opacity: .8 }}>
            {title}
          </p>
        )}
      </div>
    </div>
  )
}

export default function OurTeam() {
  useScrollReveal()
  const { data: consultants } = useTeamMembers()
  const { data: gallery     } = useGallery()
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container">
          <div className="section-label">Our Team</div>
          <h1>The people who make<br/>CebNet what it is.</h1>
          <p>Meet the engineers, consultants, and leaders who deliver world-class IT solutions every day.</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">Our Story</div>
            <h2 className="reveal reveal-delay-1">Our Company History</h2>
          </div>
          <div className="history-grid">
            <div className="history-timeline">
              {history.map((h, i) => (
                <div key={i} className={`history-node reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
                  <div className="history-node-dot"></div>
                  <div className="history-node-content">
                    <div className="history-node-year">{h.year}</div>
                    <h4>{h.title}</h4>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTANTS */}
      <section className="section section-dark">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">The People Behind CebNet</div>
            <h2 className="reveal reveal-delay-1">Our Lead Consultants</h2>
          </div>
          <div className="consultants-grid">
            {consultants.map((c, i) => (
              <div key={i} className={`consultant-card reveal reveal-delay-${i + 1}`}>
                <div className="consultant-photo">
                  <img
                    src={c.photo}
                    alt={c.name}
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="consultant-photo-fallback" style={{ display: 'none' }}>
                    {c.initials}
                  </div>
                </div>
                <div className="consultant-info">
                  <h3>{c.name}</h3>
                  <div className="consultant-role">{c.role}</div>
                  <p>{c.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">The Gallery</div>
            <h2 className="reveal reveal-delay-1">Life at CebNet</h2>
            <p className="reveal reveal-delay-2">A glimpse into our projects, events, and the team behind the work.</p>
          </div>

          {gallery.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', opacity: .5 }}>
              <p>No gallery images yet. Add some in Contentful!</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {gallery.map((item, i) => (
                <div
                  key={i}
                  className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`}
                  onClick={() => setLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
                  aria-label={`View ${item.title}`}
                >
                  <img src={item.image} alt={item.title} />
                  {item.title && (
                    <div className="gallery-card-overlay">
                      <span>{item.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <GalleryLightbox
          image={lightbox.image}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <h2 className="reveal">Want to be part of the team?</h2>
          <p className="reveal reveal-delay-1">We're always looking for passionate IT professionals to join CebNet.</p>
          <div className="cta-actions reveal reveal-delay-2">
            <Link to="/careers" className="btn btn-primary">View Open Positions</Link>
          </div>
        </div>
      </section>
    </>
  )
}
