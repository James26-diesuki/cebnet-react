import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePartners } from '../hooks/useContentful'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="10" height="10">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
)

export default function Partners() {
  useScrollReveal()
  const { data: PARTNERS } = usePartners()

  const sorted = [...PARTNERS].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container">
          <div className="section-label">Technology Partners</div>
          <h1>Backed by the best<br/>in the business.</h1>
          <p>We partner with world-class vendors to ensure every solution we deliver is built on proven, enterprise-grade technology.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">Our Partners</div>
            <h2 className="reveal reveal-delay-1">Industry-Leading Technology Vendors</h2>
            <p className="reveal reveal-delay-2">We partner with world-class vendors to ensure every solution we deliver is built on proven, enterprise-grade technology.</p>
          </div>

          <div className="partners-logo-grid">
            {sorted.map((p, i) => (
              <div key={i} className={`partner-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="partner-card-logo">
                  <img
                    src={p.logo}
                    alt={p.name}
                    onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex' }}
                  />
                  <div className="partner-card-fallback">{p.name}</div>
                </div>
                <div className="partner-card-body">
                  <h3>{p.name}</h3>
                  {p.levels?.length > 0 && (
                    <div className="partner-badge-row">
                      {p.levels.map((lvl, li) => (
                        <span key={li} className="partner-level-badge">
                          <CheckIcon />
                          {lvl}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.desc && <p>{p.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2 className="reveal">Interested in a partner technology?</h2>
          <p className="reveal reveal-delay-1">Our certified engineers will recommend the right solution from our partner portfolio for your specific needs.</p>
          <div className="cta-actions reveal reveal-delay-2">
            <Link to="/contact" className="btn btn-primary">Talk to an Expert</Link>
          </div>
        </div>
      </section>
    </>
  )
}
