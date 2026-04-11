export default function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-inner">
        <div className="footer-spacer" />

        <div className="footer-text">
          <p className="footer-line1">
            LOCAL PICKUP ONLY&nbsp;
            <em>(Available in Richmond, TX)</em>
          </p>
          <p className="footer-line2">
            © 2026 Molive Bakery &nbsp;|&nbsp; Contact: molivecakes@gmail.com
            &nbsp;|&nbsp; Pickup Times: Sat–Sun 10am–4pm
          </p>
        </div>

        <div className="footer-pin" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
        </div>
      </div>
    </footer>
  )
}
