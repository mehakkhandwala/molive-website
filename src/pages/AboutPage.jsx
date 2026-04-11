export default function AboutPage() {
  return (
    <div className="about-page">

      {/* Hero banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">Our Story</h1>
          <p className="about-hero-sub">Made with love, olive oil, and a little bit of magic.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-inner">

          {/* Intro */}
          <div className="about-block">
            <h2 className="about-heading">Molive stands for M + Olive.</h2>
            <p className="about-body">
              Soft, golden, and purposefully not-too-sweet. It's the kind of cake you return to
              with coffee, again and again.
            </p>
            <p className="about-body">
              Rooted in memory, but made for right now. Started with family. Now I'd love to share
              it with you.
            </p>
            <p className="about-body about-signoff">
              (Moe-live? Mah-live? Either way, it pairs well with coffee.)
            </p>
          </div>

          <div className="about-divider" />

          {/* Thank you note + CTA */}
          <div className="about-block">
            <p className="about-thankyou">
              Thank you for bringing Molive into your home. Whether it's a quiet solo ritual or
              the centerpiece of a Sunday lunch, I hope it brings you as much joy as it has
              brought my family.
            </p>
            <p className="about-body about-signoff">Enjoy every crumb.</p>
            <a className="about-cta-btn" href="/#sizes">Order Your Cake</a>
          </div>

          <div className="about-divider" />

          {/* Operations */}
          <div className="about-block">
            <p className="about-label">Operations & Connection</p>
            <h2 className="about-heading">Local & Made to Order</h2>
            <p className="about-body">
              We are a small operation by design. Every cake is baked fresh to order for local
              pickup in Richmond, TX.
            </p>
            <ul className="about-list">
              <li><span className="about-list-label">When:</span> Saturdays & Sundays | 10am to 4pm</li>
              <li><span className="about-list-label">Where:</span> Richmond, TX <span className="about-muted">(Details provided upon ordering)</span></li>
              <li>
                <span className="about-list-label">Inquiries:</span>{' '}
                <a className="about-link" href="mailto:molivecakes@gmail.com">molivecakes@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* The M — two-column layout */}
      <section className="the-m">
        <div className="m-image">
          <img src="/images/Molive logo resized 1.svg" alt="Mariam's signature — the M in Molive" />
        </div>
        <div className="m-text">
          <p className="about-label">The M</p>
          <p className="about-body">
            I'm Mehak, the M in Molive, and somehow one olive oil cake became all of this.
          </p>
          <p className="about-body">
            The "M" in our logo is my grandmother Mariam's signature. After three generations,
            I finally decided to honor her beautiful handwriting.
          </p>
        </div>
      </section>

      {/* The Mustapha Project — dark full-width section */}
      <section className="mustapha-section">
        <div className="mustapha-inner">
          <p className="mustapha-label">The Mustapha Project</p>
          <h2 className="mustapha-heading">Molive is the first chapter.</h2>
          <p className="mustapha-body">
            The Mustapha Project is a creative studio I'm building around language, roots, and
            form. When not in the kitchen, I'm deep in its next exploration:{' '}
            <em>When Letters Speak</em>, a visual journey through Arabic calligraphy found in
            nature.
          </p>
          <p className="mustapha-italic">
            Think: mountains, letters, and somehow still cake.
          </p>
          <p className="mustapha-more">More on that soon.</p>
        </div>
      </section>

    </div>
  )
}
