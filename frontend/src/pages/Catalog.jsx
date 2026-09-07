import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { productAPI } from '../api/client'
import ProductCard from '../components/ProductCard'
import styles from './Catalog.module.css'

const ALL_CATEGORIES = [
  'Laptops', 'Monitores', 'Perifericos', 'Gaming', 'Audio',
  'Redes', 'Almacenamiento', 'Componentes PC', 'Oficina',
  'Hogar Inteligente', 'Accesorios'
]

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Nombre A-Z' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'price-asc', label: 'Menor precio' }
]

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : []
  )
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [sort, setSort] = useState('name-asc')

  useEffect(() => {
    productAPI.getAll()
      .then(res => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    if (priceMin) {
      result = result.filter(p => p.price >= parseFloat(priceMin))
    }
    if (priceMax) {
      result = result.filter(p => p.price <= parseFloat(priceMax))
    }

    const [key, dir] = sort.split('-')
    result.sort((a, b) => {
      const mul = dir === 'asc' ? 1 : -1
      if (key === 'price') return (a.price - b.price) * mul
      return (a.name || '').localeCompare(b.name || '') * mul
    })

    return result
  }, [products, search, selectedCategories, priceMin, priceMax, sort])

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategories([])
    setPriceMin('')
    setPriceMax('')
    setSort('name-asc')
  }

  const hasFilters = search || selectedCategories.length > 0 || priceMin || priceMax

  return (
    <div className={styles.catalog}>
      <aside className={styles.sidebar}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <h3>Categorias</h3>
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <h3>Precio (S/)</h3>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h3>Ordenar por</h3>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button className={styles.clearBtn} onClick={clearFilters}>
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Catalogo</h1>
          <span className={styles.count}>{filtered.length} productos</span>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>No se encontraron productos</p>
            {hasFilters && (
              <button onClick={clearFilters}>Limpiar filtros</button>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
