import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import PageHero from '../components/PageHero'
import { STATS } from '../data/siteData'
import { usePartners } from '../hooks/useContentful'

const pillars = [
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', title: 'Customer Focused', desc: "We don't give you off-the-shelf products that may or may not be a good fit for you. We strive to understand your needs, and we address those needs with focus-oriented systems integration." },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>', title: 'Excellent', desc: "Information technology is a science, but in the context of business, it is an art. We bring to bear all our knowledge, skill and expertise to create and secure a system that is just right for your business." },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>', title: 'Borderless', desc: "Even as we act locally, we think globally. We provide the best network assets that the world can offer, integrating them into a system optimized for the local business ecosystem." },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', title: 'Nimble', desc: "Technologies evolve fast. Businesses and their network systems need to keep pace. We pride ourselves on our digital agility — adapting to change so you can focus on your business." },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>', title: 'Effective', desc: "It's not about the technology; it's how you use it. Our consultants value both IT and industry expertise — the only true test of our value is how effective we are in enabling your success." },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="6"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>', title: 'Trustworthy', desc: "Us here in CebNet understand that it's all about trust. Our clients trust us to empower their businesses, and our business is to secure and deserve that trust." },
]

const history = [
  { year: 'December 2017', title: 'The Idea Takes Shape', desc: 'CebNet Technologies Inc. started from an idea posted on social media by one of the founders, looking for visionary technical entrepreneurs to collaborate with in Cebu. Three members met to discuss the idea that would soon become a company.' },
  { year: 'January 2018',  title: 'CebNet is Born',      desc: 'The idea became reality — CebNet Technologies, Inc. was officially established. That same month, two more members joined to complete the team and make it more dynamic.' },
  { year: 'Today',         title: 'A Resilient Organization', desc: 'This group of young IT professionals with diverse backgrounds in network and security comprises a resilient organization with a breadth of experience spanning over 20 years — catering to different market segments with customers across the country.' },
]



const wheelItems = [
  { pos: 'wheel-top',          letter: 'C', label: 'Customer Focused', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
  { pos: 'wheel-top-right',    letter: 'T', label: 'Trustworthy',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="5"/><path d="M9 13l-3 8h12l-3-8"/><path d="M12 13v8"/></svg>' },
  { pos: 'wheel-bottom-right', letter: 'E', label: 'Effective',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><polyline points="9,12 11,14 15,10"/></svg>' },
  { pos: 'wheel-bottom',       letter: 'N', label: 'Nimble',           icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17.5 19a6.5 6.5 0 1 0-11 0"/><path d="M12 2v4"/><path d="M12 12l3-5"/></svg>' },
  { pos: 'wheel-bottom-left',  letter: 'B', label: 'Borderless',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>' },
  { pos: 'wheel-top-left',     letter: 'E', label: 'Excellent',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>' },
]

const mvvBullets = {
  mission: ['Customer-first approach in every engagement','Certified expertise across leading vendors','Proven track record across 200+ enterprises'],
  vision:  ['Expand our reach across the Visayas and beyond','Set the benchmark for ethical, high-quality IT service','Empower businesses through cutting-edge technology'],
}

const values = [
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', label: 'Customer Focused' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>', label: 'Excellent' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>', label: 'Borderless' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', label: 'Nimble' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>', label: 'Effective' },
  { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="6"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85"/></svg>', label: 'Trustworthy' },
]

export default function Company() {
  useScrollReveal()
  const { data: PARTNERS } = usePartners()
  const partnersAll = [...PARTNERS, ...PARTNERS]

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-grid-overlay"></div>
        <div className="container page-hero-inner">
          <div className="page-hero-text">
            <div className="section-label">Our Company</div>
            <h1>Built on Trust.<br/>Driven by Excellence.</h1>
            <p>Since 2018, CebNet Technologies has been Cebu's go-to partner for enterprise-grade network infrastructure and security.</p>
          </div>
          <div className="page-hero-wheel reveal">
            <div className="values-wheel">
              <div className="wheel-ring"></div>
              <div className="wheel-center">
                <img src="/assets/img/team/cebnet.png" alt="CebNet" />
              </div>
              {wheelItems.map((item, i) => (
                <div key={i} className={`wheel-item ${item.pos}`}>
                  <div className="wheel-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <span><em>{item.letter}</em>{item.label.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section">
        <div className="container">
          <div className="whoweare-header">
            <div className="section-label reveal">Who We Are</div>
            <h2 className="reveal reveal-delay-1">Focus-Oriented Systems Integration</h2>
            <p className="reveal reveal-delay-2">CebNet Technologies, Inc. was founded with a singular purpose: to bring world-class IT infrastructure expertise to businesses in Cebu and across the Visayas. We started small, but our commitment to quality and our clients' success fueled consistent growth.</p>
            <p className="reveal reveal-delay-3">Today, we are proud to have served over {STATS.clients.value}{STATS.clients.suffix} enterprise clients across industries including banking, manufacturing, retail, healthcare, and government — delivering solutions that stand the test of time.</p>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className={`pillar-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="pillar-icon" dangerouslySetInnerHTML={{ __html: p.icon }} />
                <div className="pillar-body">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section className="section section-dark mvv-section">
        <div className="container">
          <div className="mvv-header">
            <div className="section-label reveal">Our Foundation</div>
            <h2 className="reveal reveal-delay-1">Mission, Vision &amp; Values</h2>
            <p className="reveal reveal-delay-2">Everything we do — every solution we build, every client we serve — is guided by a clear purpose, an ambitious vision, and a set of values that define who we are.</p>
          </div>

          <div className="mvv-top-row">
            <div className="mvv-card mvv-card--mission reveal reveal-delay-1">
              <div className="mvv-card-eyebrow">
                <div className="mvv-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
                </div>
                <span>Our Mission</span>
              </div>
              <h3>Empowering Business Through Secure, Reliable IT</h3>
              <p>To deliver world-class systems integration and network security solutions that enable our clients to operate with confidence — knowing their infrastructure is resilient, compliant, and built to scale.</p>
              <ul className="mvv-bullets">
                {mvvBullets.mission.map((b, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,12 11,14 15,10"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mvv-card mvv-card--vision reveal reveal-delay-2">
              <div className="mvv-card-eyebrow">
                <div className="mvv-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
                </div>
                <span>Our Vision</span>
              </div>
              <h3>The Most Trusted IT Partner in the Philippines</h3>
              <p>To become the most trusted and sought-after systems integrator and network security firm in the Philippines — recognized for our integrity, technical excellence, and the lasting impact we have on the businesses we serve.</p>
              <ul className="mvv-bullets">
                {mvvBullets.vision.map((b, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,12 11,14 15,10"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mvv-values-block reveal">
            <div className="mvv-values-header">
              <div className="mvv-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>
              </div>
              <div>
                <div className="mvv-values-eyebrow">Our Values</div>
                <h3>The C.E.B.N.E.T. Principles</h3>
              </div>
            </div>
            <p className="mvv-values-lead">Our name isn't just a brand — it's an acronym that captures the six core values our company was built on. Every interaction, every project, and every decision is measured against these principles.</p>
            <div className="mvv-values-grid">
              {values.map((v, i) => (
                <div key={i} className="mvv-value-pill">
                  <span dangerouslySetInnerHTML={{ __html: v.icon }} />
                  <span>{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
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
                <img src={p.logo} alt={p.name} title={p.name} onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex' }} />
                <div className="partner-logo-fallback" style={{display:'none'}}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="section-label reveal" style={{justifyContent:'center'}}>Taking the Next Step with Us</div>
          <h2 className="reveal reveal-delay-1">Your business deserves the best.</h2>
          <p className="reveal reveal-delay-2">Our IT consultants are among the best in the business of focus-oriented systems integration and network security.</p>
          <div className="cta-actions reveal reveal-delay-3">
            <Link to="/contact" className="btn btn-primary">
              Let's Talk!
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
