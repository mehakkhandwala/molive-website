export default function OriginPage() {
  return (
    <div className="about-page">

      {/* Hero banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">The Origin</h1>
          <p className="about-hero-sub">Where the cake comes from — and why it matters.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-inner">

          {/* The Cake */}
          <div className="about-block">
            <p className="about-label">The Cake</p>
            <h2 className="about-heading">Older than ovens. Simpler than butter.</h2>
            <p className="about-body">
              Olive oil cake is not a trend. It has been baked across the Mediterranean for
              centuries — in Moroccan riads, Italian farmhouses, and Spanish village kitchens alike.
              Long before refined butter became the standard, olive oil was the fat of choice:
              grassy, golden, and deeply rooted in the land.
            </p>
            <p className="about-body">
              What it produces is a cake unlike any other. Tender without being heavy. Moist for
              days without going stale. Subtly fragrant with citrus and herb. It does not scream
              for attention — it earns it, quietly, one bite at a time.
            </p>
          </div>

          <div className="about-divider" />

          {/* The Connection */}
          <div className="about-block">
            <p className="about-label">The Connection</p>
            <h2 className="about-heading">A taste that already existed in the family.</h2>
            <p className="about-body">
              Growing up, olive oil was never a cooking ingredient in our house — it was a
              presence. Drizzled over everything. Kept close. Passed down without instruction
              because it needed none.
            </p>
            <p className="about-body">
              When I first baked an olive oil cake, it felt less like discovery and more like
              recognition. The flavor was familiar in the way that only inherited things can be.
              It tasted like mornings at my grandmother Mariam's table, like the kind of
              hospitality that does not ask anything of you.
            </p>
          </div>

          <div className="about-divider" />

          {/* Why Molive */}
          <div className="about-block">
            <p className="about-label">Why Molive</p>
            <h2 className="about-heading">One cake. One commitment.</h2>
            <p className="about-body">
              We make only olive oil cake because we believe in doing one thing with full
              attention. Every batch is mixed by hand, baked fresh to order, and built around a
              single question: what does it feel like to eat something made for you?
            </p>
            <p className="about-body">
              The name Molive is M + Olive — the M for Mariam, whose handwriting still lives in
              our logo. The olive for the ingredient that started everything. Together, they are
              the whole story.
            </p>
            <p className="about-body about-signoff">Rooted in memory. Baked with intention.</p>
          </div>

        </div>
      </section>

    </div>
  )
}
