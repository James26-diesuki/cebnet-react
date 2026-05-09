import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BENEFITS } from '../data/siteData'

export default function Careers() {
  useScrollReveal()
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container">
          <div className="section-label">Careers</div>
          <h1>Grow with Cebu's<br/>leading IT integrator.</h1>
          <p>Join a team of passionate engineers and consultants who take pride in building secure, resilient networks for organizations across the Philippines.</p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section section-dark">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">Why Join Us</div>
            <h2 className="reveal reveal-delay-1">Benefits of working at CebNet</h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className={`benefit-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="benefit-card-img" style={{backgroundImage:`url('${b.img}')`}}></div>
                <div className="benefit-card-body">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <h2 className="reveal">Don't see your role? Send us your CV.</h2>
          <p className="reveal reveal-delay-1">We're always looking for exceptional IT talent. Get in touch and let's start the conversation.</p>
          <div className="cta-actions reveal reveal-delay-2">
            <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
