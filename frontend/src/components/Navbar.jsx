import { NavLink } from 'react-router-dom'
import { ShoppingCart, Store, LogIn, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const { token, logout } = useAuth()

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

        <div className={styles.actions}>
          {token ? (
            <button className={styles.authBtn} onClick={logout} title="Cerrar sesion">
              <LogOut size={20} />
            </button>
          ) : (
            <NavLink to="/login" className={styles.authBtn} title="Iniciar sesion">
              <LogIn size={20} />
            </NavLink>
          )}
          <button className={styles.cartBtn} onClick={toggleCart}>
            <ShoppingCart size={22} />
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  )
}
