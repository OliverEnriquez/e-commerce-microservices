import { Minus, Plus } from 'lucide-react'
import styles from './QuantityControl.module.css'

export default function QuantityControl({ quantity, onChange, min = 1, max = 99 }) {
  const decrement = () => {
    if (quantity > min) onChange(quantity - 1)
  }

  const increment = () => {
    if (quantity < max) onChange(quantity + 1)
  }

  return (
    <div className={styles.control}>
      <button className={styles.btn} onClick={decrement} disabled={quantity <= min}>
        <Minus size={14} />
      </button>
      <span className={styles.value}>{quantity}</span>
      <button className={styles.btn} onClick={increment} disabled={quantity >= max}>
        <Plus size={14} />
      </button>
    </div>
  )
}
