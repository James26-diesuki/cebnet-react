import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useOffers } from '../hooks/useContentful'

// Shown whenever the client hasn't published any offers in Contentful yet —
// keeps the page from ever looking empty.
const DEFAULT_OFFER = {
  title: 'The MSP Email Security Challenge!',
  desc: "If your email security is missing threats, it's costing you. Take the $10K Challenge and experience the difference stronger detection and prevention really makes.",
  badge: '$10K Challenge',
  logo: '',
  link: 'https://pages.checkpoint.com/emailsecurity-msp-10k-challenge.html',
  linkLabel: 'See Details',
  registrationFormUrl: 'https://forms.cloud.microsoft/r/MLFHj9mR7A',
  detailsOverview: [
    'CebNet will set up a 14 day health check of your Microsoft Office 365 or Gmail environment using Check Point Email Security.',
    "If our patented approach to email security does not uncover more phishing and/or malware attacks than your existing security provider missed, then we'll send you the $10,000 USD.",
  ],
  detailsRules: [
    'Participants must be new partners or customers who have not previously subscribed to Check Point Email Security.',
    'Participants must be using Microsoft 365 or Google workspace for corporate email.',
    'Admin is required to authorized us to do the initial setup',
    'Check Point Email Security must be deployed to a production (cloud) mail environment of 50 or more users.',
    'Participants must follow the Check Point 14-day Proof of Value process, including meetings with Check Point.',
    'The applicant is required to participate in a technical walkthrough of the Check Point Email Security product, conducted in collaboration with a Check Point Sales Engineer.',
    'The POC must be completed and licensed by Dec 21st, 2026.',
    'If we can not discover any threats in your mail environment from the 14-day proof of value we will send you a $10K USD.',
    'Users of API solutions such as Abnormal and Ironscales do not qualify.',
    'Participants must work through MSP pay as you go partners of Check Point.',
    'Signing up for the challenge does not guarantee participation.',
    'The company must have been in continuous operation for at least one (1) year and be a legally registered business entity.',
    "Payment will be issued within thirty (30) days following Check Point's determination, at its sole discretion, that Check Point Email Security did not detect any threats, as defined under the terms of the promotion.",
    'Check Point Software Technologies Ltd. reserves the right to modify or terminate this promotion at any time, at its sole discretion, without prior notice.',
  ],
}

// A second, differently-shaped offer — a subscription plan rather than a
// time-limited challenge — so the page never looks empty and the
// pricing-card variant always has something to render.
const DEFAULT_THREATSENTRA = {
  title: 'Threat Sentra',
  desc: 'Advanced Email Security for Businesses',
  logo: '',
  badge: '12-Month Subscription — For 10 Users',
  price: '₱4,880/month',
  features: [
    'Known Malware Prevention',
    'Malicious URL Prevention',
    'Unauthorized Applications Detection',
    'Zero-Day Malware Protection',
    'Advanced Anti-Phishing Security',
    'Includes License',
    'Setup',
    '24x7 Managed Support',
  ],
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

// ── Pricing-style offer card — for subscription products (a fixed price,
// a feature checklist) rather than a time-limited promo. Deliberately a
// different shape from the promo card below so two offers on the same
// page don't read as duplicates of each other. ──
function PricingOfferCard({ offer, i }) {
  return (
    <div className={`pricing-card reveal reveal-delay-${(i % 3) + 1}`}>
      <div className="updates-card-header">
        <div className="updates-card-icon updates-card-icon--offer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2 3 6v6c0 5.25 3.6 9.74 9 11 5.4-1.26 9-5.75 9-11V6z"/>
            <path d="M8 12l2.5 2.5L16 9"/>
          </svg>
        </div>
        <div>
          <span className="updates-card-label"><span className="updates-live-dot"></span>Subscription Plan</span>
          <h3>{offer.title}</h3>
        </div>
      </div>
      <div className="updates-card-divider"></div>
      <div className="updates-card-body">
        {offer.desc && <p className="pricing-card-tagline">{offer.desc}</p>}

        {offer.features?.length > 0 && (
          <ul className="pricing-card-features">
            {offer.features.map((f, fi) => (
              <li key={fi}>
                <span className="pricing-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {offer.price && (
          <div className="pricing-card-price-box">
            <div className="pricing-card-price-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2 3 6v6c0 5.25 3.6 9.74 9 11 5.4-1.26 9-5.75 9-11V6z"/>
                <rect x="7.5" y="9.5" width="9" height="6.5" rx="1"/>
                <path d="M7.5 10.3l4.5 3 4.5-3"/>
              </svg>
            </div>
            {offer.badge && <div className="pricing-card-plan-label">{offer.badge}</div>}
            <div className="pricing-card-price">{offer.price}</div>
          </div>
        )}

        <div className="pricing-card-footer">
          {offer.logo && (
            <div className="pricing-card-powered-by">
              <span>Powered by</span>
              <OfferLogo src={offer.logo} alt={`${offer.title} logo`} />
            </div>
          )}
          <Link to="/contact" className="btn btn-primary pricing-card-cta">
            Get Started
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Offer Details Modal — scrollable panel for offers with longer terms/
// rules (e.g. a promo with legal fine print) that shouldn't bloat the
// compact offer card itself. Reuses the same lightbox chrome used elsewhere
// on the site for visual consistency. ──
function OfferDetailsModal({ offer, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = offer ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [offer, onClose])

  if (!offer) return null

  return (
    <div
      className="video-lightbox active"
      role="dialog"
      aria-modal="true"
      aria-label={`${offer.title} details`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="video-lightbox-inner offer-details-modal">
        <button className="video-lightbox-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Close
        </button>
        <div className="offer-details-body">
          <span className="updates-card-label"><span className="updates-live-dot"></span>Offer Details</span>
          <h3>{offer.title}</h3>

          {offer.detailsOverview?.length > 0 && (
            <div className="offer-details-block">
              <h4>Overview</h4>
              {offer.detailsOverview.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {offer.detailsRules?.length > 0 && (
            <div className="offer-details-block">
              <h4>Terms & Rules</h4>
              <ul className="offer-details-rules">
                {offer.detailsRules.map((r, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Promo-style offer card — for time-limited challenges/promotions with
// a badge, short pitch, and optional registration + rules modal. ──
function PromoOfferCard({ offer, i, onViewDetails }) {
  return (
    <div className={`updates-card updates-card--offer reveal reveal-delay-${(i % 3) + 1}`}>
      <div className="updates-card-header">
        <div className="updates-card-icon updates-card-icon--offer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83z"/>
            <circle cx="7.5" cy="7.5" r="1.5"/>
          </svg>
        </div>
        <div>
          <span className="updates-card-label"><span className="updates-live-dot"></span>Offer</span>
          <h3>Current Promotion</h3>
        </div>
      </div>
      <div className="updates-card-divider"></div>
      <div className="updates-card-body">
        <div className="updates-offer">
          {offer.badge && <span className="updates-offer-badge">{offer.badge}</span>}
          <div className="updates-offer-title-row">
            <strong>{offer.title}</strong>
            <OfferLogo src={offer.logo} alt={`${offer.title} logo`} />
          </div>
          <p>{offer.desc}</p>
          <div className="updates-offer-actions">
            {offer.registrationFormUrl && (
              <Link to="/msp-challenge" className="btn btn-primary updates-offer-cta">
                Register Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </Link>
            )}
            {(offer.detailsOverview?.length > 0 || offer.detailsRules?.length > 0) && (
              <button
                type="button"
                className="updates-offer-viewdetails"
                onClick={() => onViewDetails(offer)}
              >
                View Full Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Offers() {
  useScrollReveal()
  const { data: OFFERS } = useOffers()
  const [detailsOffer, setDetailsOffer] = useState(null)

  const list = OFFERS.length > 0 ? OFFERS : [DEFAULT_OFFER, DEFAULT_THREATSENTRA]

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container">
          <div className="section-label">Offers</div>
          <h1>Current Promotions<br/>&amp; Partner Offers.</h1>
          <p>Limited-time deals, bundles, and vendor-backed promotions — updated as new offers become available.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="updates-grid">
            {list.map((offer, i) => (
              offer.price
                ? <PricingOfferCard key={i} offer={offer} i={i} />
                : <PromoOfferCard key={i} offer={offer} i={i} onViewDetails={setDetailsOffer} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2 className="reveal">Have questions about an offer?</h2>
          <p className="reveal reveal-delay-1">Our team can walk you through eligibility, setup, and what to expect.</p>
          <div className="cta-actions reveal reveal-delay-2">
            <Link to="/contact" className="btn btn-primary">Talk to Us</Link>
          </div>
        </div>
      </section>

      <OfferDetailsModal offer={detailsOffer} onClose={() => setDetailsOffer(null)} />
    </>
  )
}
