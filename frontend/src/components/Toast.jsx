import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import styles from './Toast.module.css'

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info
}

let toastId = 0
const listeners = new Set()

export function showToast(message, type = 'success') {
  const id = ++toastId
  listeners.forEach(fn => fn({ id, message, type }))
  return id
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const listener = (toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, 3000)
    }
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map(toast => {
        const Icon = ICONS[toast.type] || Info
        return (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <Icon size={18} />
            <span>{toast.message}</span>
            <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
