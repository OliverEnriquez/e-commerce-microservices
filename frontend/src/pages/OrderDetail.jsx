import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { orderAPI } from '../api/client'
import { showToast } from '../components/Toast'
import StatusBadge from '../components/StatusBadge'
import styles from './OrderDetail.module.css'

const PAYMENT_LABELS = {
  CREDIT_CARD: 'Tarjeta de Credito',
  DEBIT_CARD: 'Tarjeta de Debito',
  PAYPAL: 'PayPal',
  TRANSFER: 'Transferencia'
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderAPI.getById(id)
      .then(res => setOrder(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Eliminar este pedido?')) return
    try {
      await orderAPI.delete(id)
      showToast('Pedido eliminado')
      navigate('/orders')
    } catch {
      showToast('Error al eliminar', 'error')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.skeletonHeader} />
        <div className={styles.skeletonBody} />
      </div>
    )
  }

  if (!order) {
    return (
      <div className={styles.notFound}>
        <h2>Pedido no encontrado</h2>
        <Link to="/orders">Volver a pedidos</Link>
      </div>
    )
  }

  return (
    <div className={styles.detail}>
      <Link to="/orders" className={styles.backLink}>
        <ArrowLeft size={16} />
        Volver a pedidos
      </Link>

      <div className={styles.header}>
        <div>
          <h1>Pedido #{order.orderId || order.id}</h1>
          <p className={styles.date}>{formatDate(order.orderDate)}</p>
        </div>
        <div className={styles.headerRight}>
          <StatusBadge status={order.status} large />
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.itemsSection}>
          <h2>Productos</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map(item => (
                <tr key={item.id}>
                  <td className={styles.productName}>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td className={styles.mono}>${item.unitPrice?.toFixed(2)}</td>
                  <td className={`${styles.mono} ${styles.accent}`}>${item.subtotal?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td className={`${styles.mono} ${styles.accent}`}><strong>${order.totalPrice?.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className={styles.infoSection}>
          <h2>Informacion de envio</h2>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Direccion</span>
              <span>{order.shippingAddress}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Metodo de pago</span>
              <span>{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Usuario</span>
              <span>#{order.userId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
