export default function PageHero({ label, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid-overlay"></div>
      <div className="container">
        <div className="section-label">{label}</div>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{subtitle}</p>
      </div>
    </section>
  )
}
