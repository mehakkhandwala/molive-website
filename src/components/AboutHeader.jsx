import { useState } from 'react'

const LEFT = [
  { label: 'OUR CAKE', href: '/'       },
  { label: 'SIZES',    href: '/#sizes' },
  { label: 'ORDER',    href: '/#sizes' },
]
const RIGHT = [
  { label: 'ABOUT',       href: '/about.html',  active: true },
  { label: 'THE ORIGIN',  href: '/origin.html'               },
  { label: 'PICKUP INFO', href: '/#footer'                   },
  { label: 'CONTACT',     href: '/#footer'                   },
]

export default function AboutHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop */}
      <header className="site-header">
        <nav className="header-nav">
          {LEFT.map(l => (
            <a key={l.label} className="nav-btn" href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="header-logo-wrap">
          <a href="/">
            <img src="/images/Molive logo resized 1.svg" alt="Molive Bakery" />
          </a>
        </div>

        <nav className="header-nav right">
          {RIGHT.map(l => (
            <a key={l.label} className={`nav-btn${l.active ? ' active' : ''}`} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Mobile */}
      <header className="site-header-mobile">
        <button className="hamburger-btn" onClick={() => setOpen(o => !o)} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <a href="/">
          <img
            src="/images/Molive logo resized 1.svg"
            alt="Molive Bakery"
            style={{ height: '34px', filter: 'drop-shadow(0 1px 5px rgba(0,0,0,0.45))' }}
          />
        </a>
        <div style={{ width: '30px' }} />
      </header>

      {open && (
        <div className="mobile-nav-drawer">
          {[...LEFT, ...RIGHT].map(l => (
            <a key={l.label} className={`nav-btn${l.active ? ' active' : ''}`} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
