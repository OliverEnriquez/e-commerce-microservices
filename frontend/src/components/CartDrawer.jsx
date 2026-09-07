import { useNavigate } from 'react-router-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import QuantityControl from './QuantityControl'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Tu carrito</h2>
          <button className={styles.closeBtn} onClick={closeCart}>
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBag size={48} />
            <p>Tu carrito esta vacio</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.image || `https://placehold.co/80x80/12121A/00FF88?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>${item.price?.toFixed(2)}</p>
                    <div className={styles.itemActions}>
                      <QuantityControl
                        quantity={item.quantity}
                        onChange={(q) => updateQuantity(item.id, q)}
                      />
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className={styles.itemSubtotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Ir a checkout
              </button>
              <button className={styles.keepBtn} onClick={closeCart}>
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
