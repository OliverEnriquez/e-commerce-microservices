import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { productAPI } from '../api/client'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/Toast'
import QuantityControl from '../components/QuantityControl'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    productAPI.getById(id)
      .then(res => setProduct(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    addItem(product, quantity)
    showToast(`${product.name} agregado al carrito`)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.skeletonImage} />
        <div className={styles.skeletonInfo} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Producto no encontrado</h2>
        <Link to="/products">Volver al catalogo</Link>
      </div>
    )
  }

  return (
    <div className={styles.detail}>
      <Link to="/products" className={styles.backLink}>
        <ArrowLeft size={16} />
        Volver al catalogo
      </Link>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={product.image || `https://placehold.co/800x600/12121A/00FF88?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>${product.price?.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.stock}>
            {product.quantity > 0 ? (
              <span className={styles.inStock}>En stock ({product.quantity} unidades)</span>
            ) : (
              <span className={styles.outOfStock}>Sin stock</span>
            )}
          </div>

          {product.quantity > 0 && (
            <div className={styles.actions}>
              <QuantityControl
                quantity={quantity}
                onChange={setQuantity}
                max={product.quantity}
              />
              <button className={styles.addBtn} onClick={handleAdd}>
                Agregar al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
