import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Trash2 } from 'lucide-react'
import { orderAPI } from '../api/client'
import { showToast } from '../components/Toast'
import StatusBadge from '../components/StatusBadge'
import styles from './OrderHistory.module.css'

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    setLoading(true)
    orderAPI.getAll()
      .then(res => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Eliminar este pedido?')) return
    try {
      await orderAPI.delete(id)
      setOrders(prev => prev.filter(o => o.id !== id))
      showToast('Pedido eliminado')
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
      <div className={styles.orders}>
        <h1>Mis Pedidos</h1>
        <div className={styles.list}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.orders}>
      <h1>Mis Pedidos</h1>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <Package size={48} />
          <p>No tienes pedidos aun</p>
          <Link to="/products">Explorar catalogo</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map(order => (
            <div key={order.id} className={styles.card}>
              <div className={styles.cardMain}>
                <div className={styles.cardInfo}>
                  <span className={styles.orderId}>#{order.orderId || order.id}</span>
                  <span className={styles.date}>{formatDate(order.orderDate)}</span>
                  <span className={styles.itemsCount}>
                    {order.items?.length || 0} productos
                  </span>
                </div>
                <div className={styles.cardRight}>
                  <StatusBadge status={order.status} />
                  <span className={styles.total}>${order.totalPrice?.toFixed(2)}</span>
                  <Link to={`/orders/${order.id}`} className={styles.viewBtn}>
                    Ver detalles
                  </Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(order.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
