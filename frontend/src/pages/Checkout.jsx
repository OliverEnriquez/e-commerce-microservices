import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { orderAPI } from '../api/client'
import { showToast } from '../components/Toast'
import styles from './Checkout.module.css'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    shippingAddress: '',
    city: '',
    paymentMethod: 'CREDIT_CARD'
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) {
      showToast('El carrito esta vacio', 'error')
      return
    }

    setLoading(true)
    try {
      const order = {
        userId: 1,
        shippingAddress: `${form.shippingAddress}, ${form.city}`,
        paymentMethod: form.paymentMethod,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }
      await orderAPI.create(order)
      clearCart()
      showToast('Pedido creado exitosamente')
      navigate('/orders')
    } catch {
      showToast('Error al crear el pedido', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <ShoppingBag size={48} />
        <h2>No hay productos en el carrito</h2>
        <button onClick={() => navigate('/products')}>Ir al catalogo</button>
      </div>
    )
  }

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Direccion de envio</label>
            <input
              type="text"
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
              placeholder="Av. Principal 123"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Ciudad</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Chihuahua"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Metodo de pago</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="CREDIT_CARD">Tarjeta de Credito</option>
              <option value="DEBIT_CARD">Tarjeta de Debito</option>
              <option value="PAYPAL">PayPal</option>
              <option value="TRANSFER">Transferencia</option>
            </select>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>
        </form>

        <div className={styles.summary}>
          <h2>Resumen del pedido</h2>
          <div className={styles.summaryItems}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div>
                  <p className={styles.summaryName}>{item.name}</p>
                  <p className={styles.summaryQty}>x{item.quantity}</p>
                </div>
                <span className={styles.summarySubtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
