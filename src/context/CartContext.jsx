import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState({})

  function setQty(productId, qty) {
    setItems(prev => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: { ...prev[productId], qty } }
    })
  }

  function addToCart(product) {
    setItems(prev => {
      const existing = prev[product.id]
      return {
        ...prev,
        [product.id]: {
          ...product,
          qty: existing ? existing.qty : (product.pendingQty ?? 1),
        },
      }
    })
  }

  const total = Object.values(items).reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace(/[^0-9.]/g, ''))
    return sum + (isNaN(price) ? 0 : price * item.qty)
  }, 0)

  const cartCount = Object.values(items).reduce((sum, item) => sum + item.qty, 0)

  return (
    <CartContext.Provider value={{ items, setQty, addToCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
