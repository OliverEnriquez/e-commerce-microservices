import styles from './StatusBadge.module.css'

const STATUS_MAP = {
  PENDING: { label: 'Pendiente', className: styles.pending },
  CONFIRMED: { label: 'Confirmado', className: styles.confirmed },
  SHIPPED: { label: 'Enviado', className: styles.shipped },
  DELIVERED: { label: 'Entregado', className: styles.delivered },
  CANCELLED: { label: 'Cancelado', className: styles.cancelled }
}

export default function StatusBadge({ status, large = false }) {
  const config = STATUS_MAP[status] || { label: status, className: '' }
  return (
    <span className={`${styles.badge} ${config.className} ${large ? styles.large : ''}`}>
      {config.label}
    </span>
  )
}
