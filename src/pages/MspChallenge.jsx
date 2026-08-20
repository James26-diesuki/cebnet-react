import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useOffers } from '../hooks/useContentful'

// Same fallback shape as Offers.jsx — keeps this page working even before
// the client has published anything in Contentful.
const DEFAULT_OFFER = {
  title: 'The MSP Email Security Challenge!',
  desc: "If your email security is missing threats, it's costing you. Take the $10K Challenge and experience the difference stronger detection and prevention really makes.",
  badge: '$10K Challenge',
  link: 'https://pages.checkpoint.com/emailsecurity-msp-10k-challenge.html',
  linkLabel: 'See Details',
  registrationFormUrl: 'https://forms.cloud.microsoft/r/MLFHj9mR7A',
  detailsOverview: [
    'CebNet will set up a 14 day health check of your Microsoft Office 365 or Gmail environment using Check Point Email Security.',
    "If our patented approach to email security does not uncover more phishing and/or malware attacks than your existing security provider missed, then we'll send you the $10,000 USD.",
  ],
}

export default function MspChallenge() {
  useScrollReveal()
  const { data: OFFERS } = useOffers()

  // Use whichever published offer has a registration form attached; fall
  // back to the default so the page still works pre-CMS-setup.
  const offer = OFFERS.find(o => o.registrationFormUrl) || DEFAULT_OFFER

  if (!offer.registrationFormUrl) {
    return (
      <section className="section challenge-empty">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>No active registration right now</h2>
          <p>Check back soon, or see what's currently available.</p>
          <Link to="/offers" className="btn btn-primary">View Offers</Link>
        </div>
      </section>
    )
  }

  // Microsoft Forms renders a lighter-weight, chrome-free version of the
  // form when "embed=true" is appended — the normal URL still works, it
  // just includes the full Microsoft header/branding around it.
  const embedSrc = offer.registrationFormUrl.includes('?')
    ? `${offer.registrationFormUrl}&embed=true`
    : `${offer.registrationFormUrl}?embed=true`

  return (
    <section className="challenge-section">
      <div className="container">
        <div className="challenge-grid">

          {/* Content */}
          <div className="challenge-content reveal">
            {offer.badge && <span className="updates-offer-badge">{offer.badge}</span>}
            <div className="section-label">Take The Challenge</div>
            <h1>{offer.title}</h1>
            <p className="challenge-lead">{offer.desc}</p>

            <div className="challenge-stat">
              <span className="challenge-stat-amount">$10,000</span>
              <span className="challenge-stat-label">USD Guarantee<br/>14-Day Proof of Value</span>
            </div>

            {offer.detailsOverview?.length > 0 && (
              <ul className="challenge-highlights">
                {offer.detailsOverview.map((p, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <div className="challenge-links">
              {offer.link && (
                <a href={offer.link} target="_blank" rel="noopener noreferrer" className="challenge-link">
                  {offer.linkLabel || 'Official Challenge Page'} ↗
                </a>
              )}
              <Link to="/offers" className="challenge-link">Back to Offers</Link>
            </div>
          </div>

          {/* Embedded registration form */}
          <div className="challenge-form-panel reveal reveal-delay-1">
            <div className="challenge-form-header">
              <span className="updates-card-label"><span className="updates-live-dot"></span>Registration</span>
              <h3>Register for the Challenge</h3>
            </div>
            <div className="challenge-form-frame">
              <iframe
                src={embedSrc}
                title="MSP Email Security Challenge — Registration Form"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
