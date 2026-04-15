import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ id, src, pos, title, price, serves, desc }) {
  const [qty, setQtyLocal] = useState(1)
  const { addToCart, items } = useCart()
  const inCart = Boolean(items[id])

  function handleAddToCart() {
    addToCart({ id, title, price, pendingQty: qty })
  }

  return (
    <div className="card">
      <div className="card-image">
        <img src={src} alt={title} style={{ objectPosition: pos }} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-top">
          <span className="card-title">{title}</span>
          <span className="card-price">{price}</span>
        </div>
        <p className="card-serves">{serves}</p>
        <p className="card-desc">{desc}</p>
        <div className="card-actions">
          <div className="qty-row">
            <button
              className="qty-btn"
              onClick={() => setQtyLocal(q => Math.max(1, q - 1))}
              disabled={qty === 1}
              aria-label="Decrease quantity"
            >−</button>
            <div className="qty-num">{qty}</div>
            <button
              className="qty-btn"
              onClick={() => setQtyLocal(q => q + 1)}
              aria-label="Increase quantity"
            >+</button>
          </div>
          <button
            className="add-btn"
            onClick={handleAddToCart}
          >{inCart ? '✓ Added to cart' : 'ADD TO CART'}</button>
        </div>
      </div>
    </div>
  )
}
