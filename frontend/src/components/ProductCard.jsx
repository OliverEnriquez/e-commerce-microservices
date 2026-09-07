import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image || `https://placehold.co/600x400/12121A/00FF88?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className={styles.image}
        />
        <span className={styles.category}>{product.category}</span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>${product.price?.toFixed(2)}</p>
        <button className={styles.addBtn} onClick={handleAdd}>
          <ShoppingCart size={16} />
          Agregar
        </button>
      </div>
    </Link>
  )
}
