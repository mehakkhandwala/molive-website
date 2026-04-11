import { PRODUCTS } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductSection() {
  return (
    <section id="sizes" className="product-section">
      <div className="product-section-inner">
        <h2 className="product-section-heading">Choose Your Size</h2>
        <div className="product-grid">
          {PRODUCTS.map(p => <ProductCard key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  )
}
