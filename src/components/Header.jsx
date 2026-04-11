import { useState } from 'react'

const LEFT = [
  { label: 'OUR CAKE', id: 'hero'  },
  { label: 'SIZES',    id: 'sizes' },
  { label: 'ORDER',    id: 'sizes' },
]
const RIGHT = [
  { label: 'PICKUP INFO', id: 'footer' },
  { label: 'CONTACT',     id: 'footer' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      {/* Desktop */}
      <header className="site-header">
        <nav className="header-nav">
          {LEFT.map(l => (
            <button key={l.label} className="nav-btn" onClick={() => scroll(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="header-logo-wrap">
          <img
            src="/images/Molive logo resized 1.svg"
            alt="Molive Bakery"
            onClick={() => scroll('hero')}
          />
        </div>

        <nav className="header-nav right">
          {RIGHT.map(l => (
            <button key={l.label} className="nav-btn" onClick={() => scroll(l.id)}>
              {l.label}
            </button>
          ))}
          <a className="nav-btn" href="/about.html" target="_blank" rel="noopener noreferrer">
            ABOUT
          </a>
          <a className="nav-btn" href="/origin.html" target="_blank" rel="noopener noreferrer">
            THE ORIGIN
          </a>
        </nav>
      </header>

      {/* Mobile */}
      <header className="site-header-mobile">
        <button className="hamburger-btn" onClick={() => setOpen(o => !o)} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <img
          src="/images/Molive logo resized 1.svg"
          alt="Molive Bakery"
          style={{ height: '34px', filter: 'drop-shadow(0 1px 5px rgba(0,0,0,0.45))' }}
          onClick={() => scroll('hero')}
        />
        <div style={{ width: '30px' }} />
      </header>

      {open && (
        <div className="mobile-nav-drawer">
          {[...LEFT, ...RIGHT].map(l => (
            <button key={l.label} className="nav-btn" onClick={() => scroll(l.id)}>
              {l.label}
            </button>
          ))}
          <a className="nav-btn" href="/about.html" target="_blank" rel="noopener noreferrer">
            ABOUT
          </a>
          <a className="nav-btn" href="/origin.html" target="_blank" rel="noopener noreferrer">
            THE ORIGIN
          </a>
        </div>
      )}
    </>
  )
}
