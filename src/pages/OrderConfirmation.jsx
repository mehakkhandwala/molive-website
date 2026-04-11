import { useEffect, useState } from 'react'

function formatDate(key) {
  if (!key) return null
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('molive_pending_order')
    if (saved) {
      setOrder(JSON.parse(saved))
      sessionStorage.removeItem('molive_pending_order')
    }
  }, [])

  const total = order?.cartItems?.reduce((sum, item) => {
    const unit = parseFloat(String(item.price).replace(/[^0-9.]/g, ''))
    return sum + (isNaN(unit) ? 0 : unit * item.qty)
  }, 0) ?? 0

  return (
    <div className="conf-page">
      <div className="conf-card">
        <div className="conf-icon" aria-hidden="true">✓</div>
        <h1 className="conf-title">Order Confirmed!</h1>
        <p className="conf-sub">
          Thank you{order?.customer?.firstName ? `, ${order.customer.firstName}` : ''}. Your order has been placed and payment received.
        </p>

        {order && (
          <>
            <div className="conf-rule" />

            <div className="conf-section">
              <h2 className="conf-section-heading">Pickup Details</h2>
              <div className="conf-detail-row">
                <span className="conf-detail-label">Date</span>
                <span className="conf-detail-value">{formatDate(order.selectedDate) ?? '—'}</span>
              </div>
              <div className="conf-detail-row">
                <span className="conf-detail-label">Time</span>
                <span className="conf-detail-value">{order.selectedTime ?? '—'}</span>
              </div>
            </div>

            <div className="conf-rule" />

            <div className="conf-section">
              <h2 className="conf-section-heading">Items Ordered</h2>
              <ul className="conf-items">
                {order.cartItems.map(item => {
                  const unit = parseFloat(String(item.price).replace(/[^0-9.]/g, ''))
                  return (
                    <li key={item.id} className="conf-item">
                      <span className="conf-item-name">{item.title}</span>
                      <span className="conf-item-meta">× {item.qty}</span>
                      <span className="conf-item-price">
                        ${(isNaN(unit) ? 0 : unit * item.qty).toFixed(2)}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className="conf-total-row">
                <span>Total paid</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="conf-rule" />

            <p className="conf-email-note">
              A confirmation email will be sent to <strong>{order.customer.email}</strong>.
            </p>
          </>
        )}

        <a href="/" className="conf-home-btn">Back to Home</a>
      </div>
    </div>
  )
}
