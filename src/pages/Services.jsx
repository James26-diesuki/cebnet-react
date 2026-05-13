import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ServiceIcon } from '../components/Icons'
import { useServices } from '../hooks/useContentful'

function CatCardObserver() {
  useEffect(() => {
    const cards = document.querySelectorAll('.cat-card')
    if (!cards.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    cards.forEach(c => obs.observe(c))
    return () => obs.disconnect()
  })
  return null
}

export default function Services() {
  useScrollReveal()
  const { data: SERVICES } = useServices()

  const why = [
    { icon: 'shield',     title: 'Security by Design',       desc: 'Security is embedded in every solution we deliver — never bolted on as an afterthought.' },
    { icon: 'consulting', title: 'Vendor-Certified Team',     desc: 'Our engineers hold certifications from Fortinet, Cisco, Check Point, and more.' },
    { icon: 'network',    title: 'End-to-End Delivery',       desc: 'From requirements scoping to deployment and post-project support, we own the entire lifecycle.' },
    { icon: 'vapt',       title: 'Proactive Threat Testing',  desc: "We don't wait for breaches to happen. Our VAPT service identifies and closes security gaps before attackers find them." },
  ]

  return (
    <>
      <CatCardObserver />

      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container">
          <div className="section-label">What We Offer</div>
          <h1>Technology that works:<br/>seamless, secure, smart.</h1>
          <p>We specialize in building and protecting the IT backbone that keeps your business running — from network design to vulnerability testing and 24/7 managed support.</p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <div key={i} className={`service-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="service-icon"><ServiceIcon type={svc.icon} /></div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="section catalog-section">
        <div className="container">
          <div className="catalog-header">
            <div>
              <div className="section-label reveal">Products &amp; Services</div>
              <h2 className="reveal reveal-delay-1">What We Provide</h2>
              <p className="reveal reveal-delay-2">A comprehensive portfolio of enterprise-grade products and services tailored to every layer of your IT environment.</p>
            </div>
            <div className="catalog-meta reveal reveal-delay-2">
              <div className="catalog-meta-item">
                <span className="catalog-meta-num">6</span>
                <span className="catalog-meta-label">Categories</span>
              </div>
              <div className="catalog-meta-divider"></div>
              <div className="catalog-meta-item">
                <span className="catalog-meta-num">25<span style={{fontSize:'.9em'}}>+</span></span>
                <span className="catalog-meta-label">Solutions</span>
              </div>
            </div>
          </div>

          {/* ── PRODUCTS LABEL ── */}
          <div className="catalog-group-label reveal">
            <div className="catalog-group-label-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              Products
            </div>
          </div>

          <div className="catalog-grid-v2">
            <div className="cat-card" data-index="01">
              <div className="cat-card-top">
                <div className="cat-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>
                </div>
                <div className="cat-card-index">01</div>
              </div>
              <h3 className="cat-card-title">Network &amp; Security</h3>
              <ul className="cat-list">
                {['Routing and Switching','Network Security','Wireless Connectivity'].map(item => (
                  <li key={item}><span className="cat-list-dot"></span>{item}</li>
                ))}
              </ul>
              <div className="cat-card-bar"><div className="cat-card-bar-fill"></div></div>
            </div>

            <div className="cat-card" data-index="02">
              <div className="cat-card-top">
                <div className="cat-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div className="cat-card-index">02</div>
              </div>
              <h3 className="cat-card-title">Computing</h3>
              <ul className="cat-list">
                {['Servers','Storage','Desktops','Laptops','Thin Clients','Computing Accessories'].map(item => (
                  <li key={item}><span className="cat-list-dot"></span>{item}</li>
                ))}
              </ul>
              <div className="cat-card-bar"><div className="cat-card-bar-fill"></div></div>
            </div>

            <div className="cat-card" data-index="03">
              <div className="cat-card-top">
                <div className="cat-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>
                </div>
                <div className="cat-card-index">03</div>
              </div>
              <h3 className="cat-card-title">Auxiliary Systems</h3>
              <ul className="cat-list">
                {['Access Control','CCTV and IP Surveillance','Telephony Solutions'].map(item => (
                  <li key={item}><span className="cat-list-dot"></span>{item}</li>
                ))}
              </ul>
              <div className="cat-card-bar"><div className="cat-card-bar-fill"></div></div>
            </div>

            <div className="cat-card" data-index="04">
              <div className="cat-card-top">
                <div className="cat-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>
                </div>
                <div className="cat-card-index">04</div>
              </div>
              <h3 className="cat-card-title">Software</h3>
              <ul className="cat-list">
                {['Windows Operating Systems','Other Software Licenses'].map(item => (
                  <li key={item}><span className="cat-list-dot"></span>{item}</li>
                ))}
              </ul>
              <div className="cat-card-bar"><div className="cat-card-bar-fill"></div></div>
            </div>
          </div>

          {/* ── SERVICES LABEL ── */}
          <div className="catalog-group-label reveal" style={{marginTop:'48px'}}>
            <div className="catalog-group-label-inner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Services
            </div>
          </div>

          <div className="catalog-grid-v2">
            <div className="cat-card" data-index="05">
              <div className="cat-card-top">
                <div className="cat-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/><circle cx="18" cy="5" r="3" fill="currentColor" stroke="none" opacity=".2"/><path d="M17 5l1 1 2-2" strokeWidth="1.4"/></svg>
                </div>
                <div className="cat-card-index">05</div>
              </div>
              <h3 className="cat-card-title">VAPT</h3>
              <ul className="cat-list">
                {['Web App Security Testing','Network Security Testing','Mobile App Security Testing','Cloud Security Testing','Wireless Security Testing'].map(item => (
                  <li key={item}><span className="cat-list-dot"></span>{item}</li>
                ))}
              </ul>
              <div className="cat-card-bar"><div className="cat-card-bar-fill"></div></div>
            </div>

            <div className="cat-card" data-index="06">
              <div className="cat-card-top">
                <div className="cat-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/></svg>
                </div>
                <div className="cat-card-index">06</div>
              </div>
              <h3 className="cat-card-title">Managed Security Service Provider</h3>
              <ul className="cat-list">
                {[
                  '24x7 threat monitoring & response',
                  'Threat hunting and root cause analysis',
                  'Provide recommendation based on vulnerability findings.',
                  'Annual Vulnerability and Penetration Testing (One-Time)',
                  'Monthly reporting of critical events.',
                ].map(item => (
                  <li key={item}><span className="cat-list-dot"></span>{item}</li>
                ))}
              </ul>
              <div className="cat-card-bar"><div className="cat-card-bar-fill"></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY CHECKUP */}
      <section className="section security-checkup-section">
        <div className="container">
          <div className="sc-wrapper reveal">
            <div className="sc-left">
              <div className="sc-badge">Professional Services</div>
              <div className="sc-free-badge">FREE!</div>
              <h2 className="sc-title">Security Checkup</h2>
              <p className="sc-subtitle">A no-cost professional service to help you understand the current state of your network security — no strings attached.</p>
              <Link to="/contact" className="btn btn-primary sc-cta">
                Claim Your Free Checkup
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </Link>
            </div>
            <div className="sc-right">
              <div className="sc-card">
                <div className="sc-card-header">
                  <div className="sc-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                  </div>
                  <div>
                    <h3>Real-Time Traffic Audit</h3>
                    <span className="sc-card-tag">Included in Security Checkup</span>
                  </div>
                </div>
                <div className="sc-card-divider" />
                <div className="sc-card-body">
                  <div className="sc-what-label">What is it:</div>
                  <p>A passive internal review of your live network traffic to observe what is happening inside your environment in real time.</p>
                </div>
                <div className="sc-card-features">
                  <div className="sc-feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><polyline points="20,6 9,17 4,12"/></svg>
                    <span>No disruption to your network or operations</span>
                  </div>
                  <div className="sc-feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><polyline points="20,6 9,17 4,12"/></svg>
                    <span>Passive monitoring — read-only, non-intrusive</span>
                  </div>
                  <div className="sc-feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><polyline points="20,6 9,17 4,12"/></svg>
                    <span>Delivered by certified security consultants</span>
                  </div>
                  <div className="sc-feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><polyline points="20,6 9,17 4,12"/></svg>
                    <span>Summary report of findings provided after</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CEBNET */}
      <section className="section section-dark">
        <div className="container">
          <div className="services-header">
            <div className="section-label reveal">Why CebNet</div>
            <h2 className="reveal reveal-delay-1">Our approach sets us apart.</h2>
            <p className="reveal reveal-delay-2">We don't sell cookie-cutter solutions. We take the time to understand your business and build the exact infrastructure you need.</p>
          </div>
          <div className="services-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
            {why.map((w, i) => (
              <div key={i} className={`service-card reveal reveal-delay-${(i % 2) + 1}`}>
                <div className="service-icon"><ServiceIcon type={w.icon} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <h2 className="reveal">Taking the next step with us.</h2>
          <p className="reveal reveal-delay-1">Your business deserves the best — and our IT consultants are among the best in the business of focus-oriented systems integration and network security.</p>
          <div className="cta-actions reveal reveal-delay-2">
            <Link to="/contact" className="btn btn-primary">Let's Talk!</Link>
          </div>
        </div>
      </section>
    </>
  )
}
