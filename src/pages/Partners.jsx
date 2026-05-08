import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePartners } from '../hooks/useContentful'

const LEVEL_ORDER = { gold: 0, silver: 1, bronze: 2, '': 3 }

const StarIcon = () => (
  <svg viewBox="0 0 14 14" fill="currentColor" width="11" height="11">
    <path d="M7 0l1.76 3.57L13 4.27l-3 2.92.71 4.13L7 9.27l-3.71 2.05L4 7.19 1 4.27l4.24-.7z"/>
  </svg>
)

export default function Partners() {
  useScrollReveal()
  const { data: PARTNERS } = usePartners()

  const sorted = [...PARTNERS].sort((a, b) => {
    const la = LEVEL_ORDER[a.level.toLowerCase()] ?? 3
    const lb = LEVEL_ORDER[b.level.toLowerCase()] ?? 3
    return la - lb
  })

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

          {/* Legend */}
          <div className="partner-level-legend reveal reveal-delay-2">
            {[
              { level: 'gold',   label: 'Premier tier — deepest technical alignment & certification' },
              { level: 'silver', label: 'Advanced tier — strong expertise & deployment track record' },
              { level: 'bronze', label: 'Registered tier — certified & authorized reseller' },
            ].map(({ level, label }) => (
              <div key={level} className="partner-level-legend-item">
                <span className={`partner-level-badge partner-level-badge--${level}`}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="partners-logo-grid">
            {sorted.map((p, i) => {
              const levelLc = p.level.toLowerCase()
              const hasLevel = ['gold', 'silver', 'bronze'].includes(levelLc)
              return (
                <div key={i} className={`partner-card reveal reveal-delay-${(i % 3) + 1}`}>
                  {hasLevel && (
                    <span className={`partner-level-badge partner-level-badge--${levelLc}`}>
                      <StarIcon />
                      {p.level}
                    </span>
                  )}
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
                    {p.desc && <p>{p.desc}</p>}
                  </div>
                </div>
              )
            })}
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
