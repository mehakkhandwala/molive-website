const STEPS = [
  {
    num: '1',
    label: 'Order',
    icon: (
      /* clipboard */
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
  },
  {
    num: '2',
    label: 'We Bake',
    icon: (
      /* chef hat */
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
  },
  {
    num: '3',
    label: 'You Pick Up',
    icon: (
      /* house */
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12L12 3l9 9"/>
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"/>
      </svg>
    ),
  },
]

export default function ProcessBanner() {
  return (
    <section className="process-banner">
      <div className="process-steps">
        {STEPS.map((step, i) => (
          <div key={step.num} className="process-item">
            <div className="process-icon">{step.icon}</div>
            <div className="process-label">
              <span className="process-num">{step.num}.</span> {step.label}
            </div>
            {i < STEPS.length - 1 && <div className="process-connector" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  )
}
