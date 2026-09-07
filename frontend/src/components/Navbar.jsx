import { NavLink } from 'react-router-dom'
import { ShoppingCart, Store } from 'lucide-react'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <Store size={24} />
          <span>TechStore</span>
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
            Inicio
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>
            Catalogo
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ''}>
            Mis Pedidos
          </NavLink>
        </div>

        <button className={styles.cartBtn} onClick={toggleCart}>
          <ShoppingCart size={22} />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>
      </div>
    </nav>
  )
}
