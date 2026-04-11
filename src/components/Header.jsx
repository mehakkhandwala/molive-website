import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      {/* Desktop */}
      <header className="site-header">
        <div />

        <div className="header-logo-wrap">
          <img
            src="/images/Molive logo resized 1.svg"
            alt="Molive Bakery"
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>

        <nav className="header-nav right">
          <button className="nav-btn" onClick={scrollToAbout}>ABOUT</button>
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
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <div style={{ width: '30px' }} />
      </header>

      {open && (
        <div className="mobile-nav-drawer">
          <button className="nav-btn" onClick={scrollToAbout}>ABOUT</button>
        </div>
      )}
    </>
  )
}
