import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',  '1:00 PM',  '1:30 PM', '2:00 PM',
]

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function isPickupAvailable(year, month, day) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(year, month, day)
  const daysDiff = Math.floor((target - today) / 86_400_000)
  const dow = target.getDay()
  return (dow === 0 || dow === 6) && daysDiff >= 2
}

function formatDate(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function PickupSection() {
  const now = new Date()
  const [viewYear, setViewYear]         = useState(now.getFullYear())
  const [viewMonth, setViewMonth]       = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [customer, setCustomer]         = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [submitting, setSubmitting]     = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)
  const [showCancelBanner, setShowCancelBanner] = useState(false)

  const { items, total, restoreCart } = useCart()

  // Restore state when returning from a cancelled Stripe session
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('canceled') !== 'true') return

    setShowCancelBanner(true)

    const saved = sessionStorage.getItem('molive_pending_order')
    if (saved) {
      const { cartItems: savedItems, selectedDate: d, selectedTime: t, customer: c } = JSON.parse(saved)
      if (d) setSelectedDate(d)
      if (t) setSelectedTime(t)
      if (c) setCustomer(c)
      if (savedItems?.length) restoreCart(savedItems)
    }

    // Clean ?canceled=true from the URL without a page reload
    window.history.replaceState({}, '', '/#order')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const firstDow    = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const todayKey = dateKey(now.getFullYear(), now.getMonth(), now.getDate())

  function handleDayClick(day) {
    if (!day || !isPickupAvailable(viewYear, viewMonth, day)) return
    const key = dateKey(viewYear, viewMonth, day)
    setSelectedDate(key)
    setSelectedTime(null)
  }

  function handleCustomer(e) {
    const { name, value } = e.target
    setCustomer(prev => ({ ...prev, [name]: value }))
  }

  const cartItems      = Object.values(items)
  const customerFilled = customer.firstName.trim() && customer.lastName.trim() &&
                         customer.email.trim() && customer.phone.trim()
  const ready = selectedDate && selectedTime && cartItems.length > 0 && customerFilled

  // Debug: log what's blocking the button whenever dependencies change
  console.log('[Checkout readiness]', {
    selectedDate,
    selectedTime,
    cartCount: cartItems.length,
    firstName:  customer.firstName.trim() || '(empty)',
    lastName:   customer.lastName.trim()  || '(empty)',
    email:      customer.email.trim()     || '(empty)',
    phone:      customer.phone.trim()     || '(empty)',
    ready,
  })

  async function handleCheckout() {
    console.log('[handleCheckout] called — ready:', ready, '| submitting:', submitting)
    if (submitting || !ready) return
    setSubmitting(true)
    setCheckoutError(null)

    // Persist order state so we can restore it if the customer cancels on Stripe
    sessionStorage.setItem('molive_pending_order', JSON.stringify({
      cartItems,
      selectedDate,
      selectedTime,
      customer,
    }))

    const payload = {
      items: cartItems,
      pickupDate: selectedDate,
      pickupTime: selectedTime,
      customer,
    }
    console.log('[handleCheckout] POSTing to /api/create-checkout-session:', payload)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      console.log('[handleCheckout] response status:', res.status)

      let data
      try {
        data = await res.json()
      } catch {
        throw new Error(`Server returned a non-JSON response (status ${res.status}). Make sure you are running "vercel dev" instead of "npm run dev" so the API route is available.`)
      }

      console.log('[handleCheckout] response body:', data)

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      console.log('[handleCheckout] redirecting to Stripe:', data.url)
      // Redirect to Stripe Checkout — quantities are locked (no adjustable_quantity set)
      window.location.href = data.url
    } catch (err) {
      console.error('[handleCheckout] error:', err.message)
      setCheckoutError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section id="order" className="pickup-section">
      <div className="pickup-inner">
        <h2 className="pickup-heading">Schedule Your Pickup</h2>

        {showCancelBanner && (
          <div className="cancel-banner" role="alert">
            <span>Your payment was not completed. Your selections have been restored — review and try again.</span>
            <button
              className="cancel-banner-close"
              onClick={() => setShowCancelBanner(false)}
              aria-label="Dismiss"
            >×</button>
          </div>
        )}

        <div className="pickup-layout">

          {/* ── Left: calendar + time slots ── */}
          <div className="pickup-left">

            <div className="cal-card">
              <div className="cal-header">
                <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>
                <span className="cal-month-label">{MONTH_NAMES[viewMonth]} {viewYear}</span>
                <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
              </div>

              <div className="cal-grid">
                {DAY_LABELS.map(d => (
                  <div key={d} className="cal-day-name">{d}</div>
                ))}
                {cells.map((day, i) => {
                  if (!day) return <div key={`blank-${i}`} className="cal-day-blank" />
                  const key       = dateKey(viewYear, viewMonth, day)
                  const available = isPickupAvailable(viewYear, viewMonth, day)
                  const selected  = selectedDate === key
                  const isToday   = key === todayKey
                  return (
                    <button
                      key={key}
                      className={[
                        'cal-day',
                        available ? 'cal-day--open'     : 'cal-day--blocked',
                        selected  ? 'cal-day--selected' : '',
                        isToday   ? 'cal-day--today'    : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => handleDayClick(day)}
                      disabled={!available}
                      aria-pressed={selected}
                      aria-label={`${MONTH_NAMES[viewMonth]} ${day}${available ? '' : ', unavailable'}`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              <p className="cal-note">Weekend pickup only · Orders close Thursday</p>
            </div>

            {selectedDate && (
              <div className="timeslot-card">
                <h3 className="timeslot-heading">Choose a Time</h3>
                <div className="timeslot-grid">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      className={[
                        'timeslot-btn',
                        selectedTime === slot ? 'timeslot-btn--selected' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => setSelectedTime(slot)}
                      aria-pressed={selectedTime === slot}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: order summary ── */}
          <div className="summary-card">
            <h3 className="summary-heading">Order Summary</h3>

            {cartItems.length === 0 ? (
              <p className="summary-empty">Add items from the menu above to get started.</p>
            ) : (
              <ul className="summary-items">
                {cartItems.map(item => {
                  const unit = parseFloat(String(item.price).replace(/[^0-9.]/g, ''))
                  return (
                    <li key={item.id} className="summary-item">
                      <span className="summary-item-name">{item.title}</span>
                      <span className="summary-item-meta">× {item.qty}</span>
                      <span className="summary-item-price">
                        ${(isNaN(unit) ? 0 : unit * item.qty).toFixed(2)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="summary-rule" />

            <div className="summary-total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="summary-rule" />

            <div className="summary-pickup-info">
              <div className="summary-field">
                <span className="summary-field-label">Pickup date</span>
                <span className="summary-field-value">
                  {selectedDate ? formatDate(selectedDate) : <em>Not selected</em>}
                </span>
              </div>
              <div className="summary-field">
                <span className="summary-field-label">Time slot</span>
                <span className="summary-field-value">
                  {selectedTime || <em>Not selected</em>}
                </span>
              </div>
            </div>

            <div className="summary-rule" />

            <div className="customer-form">
              <h4 className="customer-form-heading">Your Details</h4>
              <div className="customer-row">
                <label className="customer-field">
                  <span className="customer-label">First Name</span>
                  <input
                    className="customer-input"
                    type="text"
                    name="firstName"
                    value={customer.firstName}
                    onChange={handleCustomer}
                    autoComplete="given-name"
                  />
                </label>
                <label className="customer-field">
                  <span className="customer-label">Last Name</span>
                  <input
                    className="customer-input"
                    type="text"
                    name="lastName"
                    value={customer.lastName}
                    onChange={handleCustomer}
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label className="customer-field">
                <span className="customer-label">Email</span>
                <input
                  className="customer-input"
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleCustomer}
                  autoComplete="email"
                />
              </label>
              <label className="customer-field">
                <span className="customer-label">Phone</span>
                <input
                  className="customer-input"
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomer}
                  autoComplete="tel"
                />
              </label>
            </div>

            {checkoutError && (
              <p className="checkout-error" role="alert">{checkoutError}</p>
            )}

            <button
              className="summary-confirm-btn"
              disabled={!ready || submitting}
              onClick={handleCheckout}
            >
              {submitting ? 'Redirecting to payment…' : ready ? 'Confirm Order' : 'Complete your selection'}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
