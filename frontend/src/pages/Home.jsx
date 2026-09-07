import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Truck, Shield, Zap, Tag } from 'lucide-react'
import { productAPI } from '../api/client'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

const CATEGORIES = [
  { name: 'Laptops', slug: 'Laptops', icon: '💻' },
  { name: 'Gaming', slug: 'Gaming', icon: '🎮' },
  { name: 'Perifericos', slug: 'Perifericos', icon: '⌨️' },
  { name: 'Oficina', slug: 'Oficina', icon: '🏢' }
]

const PROMOS = [
  { title: 'Ofertas de temporada', desc: 'Hasta 30% de descuento en componentes PC', accent: 'var(--danger)' },
  { title: 'Envio gratis', desc: 'En compras mayores a $2,000', accent: 'var(--accent)' },
  { title: 'Garantia extendida', desc: '2 años en productos seleccionados', accent: 'var(--info)' }
]

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productAPI.getAll()
      .then(res => setFeatured(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&h=600&fit=crop"
            alt=""
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            <Zap size={14} />
            Tienda de Tecnologia
          </span>
          <h1 className={styles.heroTitle}>
            Encuentra tu<br />setup perfecto
          </h1>
          <p className={styles.heroSubtitle}>
            Laptops, gaming, perifericos y mas con envio a todo Mexico.
          </p>
          <div className={styles.heroActions}>
            <Link to="/products" className={styles.heroCta}>
              Ver productos
              <ArrowRight size={18} />
            </Link>
            <Link to="/products?category=Gaming" className={styles.heroCtaSecondary}>
              <Tag size={16} />
              Ofertas
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.promoBar}>
        {PROMOS.map((promo, i) => (
          <div key={i} className={styles.promoItem} style={{ borderColor: promo.accent }}>
            <span className={styles.promoTitle} style={{ color: promo.accent }}>{promo.title}</span>
            <span className={styles.promoDesc}>{promo.desc}</span>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Mas vendidos</h2>
          <Link to="/products" className={styles.seeAll}>
            Ver todo <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Categorias</h2>
        <div className={styles.categories}>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className={styles.categoryCard}
            >
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span className={styles.categoryName}>{cat.name}</span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}><Truck size={24} /></div>
            <div>
              <p className={styles.benefitTitle}>Envio a todo Mexico</p>
              <p className={styles.benefitDesc}>Recibe tus productos en la comodidad de tu hogar</p>
            </div>
          </div>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}><Shield size={24} /></div>
            <div>
              <p className={styles.benefitTitle}>Compra segura</p>
              <p className={styles.benefitDesc}>Pago protegido y garantia en todos los productos</p>
            </div>
          </div>
          <div className={styles.benefit}>
            <div className={styles.benefitIcon}><Package size={24} /></div>
            <div>
              <p className={styles.benefitTitle}>30+ productos</p>
              <p className={styles.benefitDesc}>La mejor variedad en tecnologia y accesorios</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
