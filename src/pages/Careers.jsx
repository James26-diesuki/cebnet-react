import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { BENEFITS } from '../data/siteData'
import { useJobs } from '../hooks/useContentful'

export default function Careers() {
  useScrollReveal()
  const { data: JOBS } = useJobs()

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

      {/* OPEN POSITIONS */}
      <section className="section">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">Open Positions</div>
            <h2 className="reveal reveal-delay-1">We're Hiring</h2>
            <p className="reveal reveal-delay-2">Find a role that matches your skills and ambition. We invest in our people through training, certifications, and career development.</p>
          </div>
          <div className="job-list">
            {JOBS.map((job, i) => (
              <div key={i} className={`job-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span className="job-tag dept">{job.dept}</span>
                    <span className="job-tag type">{job.type}</span>
                    <span className="job-tag">{job.loc}</span>
                  </div>
                </div>
                <Link
                  to={`/contact?role=${encodeURIComponent(job.title)}`}
                  className="btn btn-outline"
                  style={{whiteSpace:'nowrap', padding:'10px 20px', fontSize:'.8rem'}}
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
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
