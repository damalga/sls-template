<template>
  <div>
    <Header />
    <main class="shop-main">
      <div class="shop-container">
        <!-- Sidebar de filtros -->
        <aside class="shop-sidebar">
          <Filters
            :products="products"
            :is-open="filtersOpen"
            @filters-changed="handleFiltersChange"
            @close="toggleFilters"
          />
        </aside>

        <!-- Overlay para cerrar filtros en móvil -->
        <div
          v-if="filtersOpen"
          class="filters-overlay"
          @click="toggleFilters"
          aria-hidden="true"
        ></div>

        <!-- Toggle de filtros para móvil (sticky) -->
        <FilterToggle
          :active-filters-count="activeFiltersCount"
          :is-open="filtersOpen"
          @toggle="toggleFilters"
          class="filter-toggle-sticky"
        />

        <!-- Área principal de productos -->
        <section class="shop-content">
          <div class="shop-header">
            <h3 class="shop-title">Products</h3>
            <div class="shop-controls">
              <div class="shop-results">
                <span class="results-current">
                  Showing {{ startIndex + 1 }}-{{ endIndex }} de
                  {{ sortedProducts.length }} Products
                </span>
              </div>
              <SortBy v-model="sortBy" @sort-change="handleSortChange" />
            </div>
          </div>

          <!-- Componente Products reutilizable -->
          <Products
            :show-title="false"
            :products-list="sortedAndPaginatedProducts"
            :show-stock="true"
            :show-cart-controls="true"
            class="shop-products"
          />

          <Product />

          <!-- Paginador -->
          <Pagination
            :current-page="currentPage"
            :total-items="sortedProducts.length"
            :items-per-page="itemsPerPage"
            @page-change="goToPage"
          />

          <!-- Loader mientras cargan productos -->
          <div v-if="loading" class="loader-container">
            <div class="loader"></div>
            <p>Loading products...</p>
          </div>

          <!-- Mensaje si no hay productos -->
          <div v-if="!loading && sortedProducts.length === 0" class="no-products">
            <h3>No products found</h3>
            <p>Try adjusting the filters to see more results.</p>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useStripe } from '@/composables/useStripe'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSchema } from '@/composables/useSchema'

import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'
import Filters from '../components/Filters_comp.vue'
import FilterToggle from '../components/FilterToggle_comp.vue'
import Products from '../components/Products_comp.vue'
import Product from '../components/Product_comp.vue'
import Pagination from '../components/Pagination_comp.vue'
import SortBy from '../components/SortBy_comp.vue'

// SEO Meta Tags
usePageMeta({
  title: 'SLS Shop | Shop',
  description:
    'Explore our catalog completo de tech products: Flipper Zero, Raspberry Pi, Hak5, RTL-SDR y más. Stock actualizado diariamente. Envíos en 24h desde ES.',
  keywords:
    'buy products, shop raspberry pi, hak5 es, tech tools, tech products, gadgets ciberseguridad',
  url: 'https://your-domain.com/shop',
  image: 'https://your-domain.com/images/og-shop.jpg',
})

// Structured Data - CollectionPage Schema
useSchema({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Shop de Tech Products',
  description:
    'Complete catalog de productos de tech products y pentesting: Flipper Zero, Raspberry Pi, Hak5, RTL-SDR y más',
  url: 'https://your-domain.com/shop',
  isPartOf: {
    '@type': 'WebSite',
    name: 'SLS Shop',
    url: 'https://your-domain.com',
  },
  about: {
    '@type': 'Thing',
    name: 'Tech Products',
    description:
      'Products and tools para pentesting, hacking ético, ciberseguridad y proyectos tecnológicos',
  },
})

// Products de Neon
const { products, loadProducts, loading, error } = useProducts()

// Stripe & Cart
const { addToCart, getCartItemCount } = useStripe()

// Cart visibility
const showCart = ref(false)

onMounted(loadProducts)

// Estado de filtros
const activeFilters = ref({
  categories: [],
  brands: [],
  stock: [],
  priceRange: { min: null, max: null },
})

// Estado de paginación
const currentPage = ref(1)
const itemsPerPage = 16

// Estado de ordenamiento
const sortBy = ref('newest')

// Estado de visibilidad de filtros (cerrado por defecto en móvil)
const filtersOpen = ref(false)

// Función para abrir/cerrar filtros
const toggleFilters = () => {
  filtersOpen.value = !filtersOpen.value
}

// Contador de filtros activos
const activeFiltersCount = computed(() => {
  let count = 0
  if (activeFilters.value.categories.length > 0) count++
  if (activeFilters.value.brands.length > 0) count++
  if (activeFilters.value.stock.length > 0) count++
  if (activeFilters.value.priceRange.min !== null && activeFilters.value.priceRange.min !== '')
    count++
  if (activeFilters.value.priceRange.max !== null && activeFilters.value.priceRange.max !== '')
    count++
  return count
})

// Products filtrados
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filtrar por categorías - ahora soporta múltiples categorías por producto
  if (activeFilters.value.categories.length > 0) {
    filtered = filtered.filter((product) => {
      // Si el producto tiene un array de categorías
      if (Array.isArray(product.category)) {
        return product.category.some(cat => activeFilters.value.categories.includes(cat))
      }
      // Compatibilidad con formato antiguo (category como string)
      else if (product.category) {
        return activeFilters.value.categories.includes(product.category)
      }
      return false
    })
  }

  // Filtrar por marcas
  if (activeFilters.value.brands.length > 0) {
    filtered = filtered.filter((product) => activeFilters.value.brands.includes(product.brand))
  }

  // Filtrar por stock
  if (activeFilters.value.stock.length > 0) {
    filtered = filtered.filter((product) => {
      if (activeFilters.value.stock.includes('inStock') && product.inStock) return true
      if (activeFilters.value.stock.includes('outOfStock') && !product.inStock) return true
      return false
    })
  }

  // Filtrar por rango de precio
  if (activeFilters.value.priceRange.min !== null && activeFilters.value.priceRange.min !== '') {
    filtered = filtered.filter(
      (product) => product.price >= parseFloat(activeFilters.value.priceRange.min)
    )
  }
  if (activeFilters.value.priceRange.max !== null && activeFilters.value.priceRange.max !== '') {
    filtered = filtered.filter(
      (product) => product.price <= parseFloat(activeFilters.value.priceRange.max)
    )
  }

  return filtered
})

// Función para obtener conteo de productos por categoría/marca
const getCategoryCount = (category) => {
  return filteredProducts.value.filter((product) => {
    // Si el producto tiene un array de categorías
    if (Array.isArray(product.category)) {
      return product.category.includes(category)
    }
    // Compatibilidad con formato antiguo
    return product.category === category
  }).length
}

const getBrandCount = (brand) => {
  return filteredProducts.value.filter((product) => product.brand === brand).length
}

// Products ordenados
const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'newest':
      // Ordenar por fecha de creación (productos más recientes primero)
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    case 'oldest':
      // Ordenar por fecha de creación (productos más antiguos primero)
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    case 'category':
      // OPCIÓN 1: Ordenar por cantidad de productos en la categoría (más productos primero)
      return sorted.sort((a, b) => {
        // Obtener la primera categoría de cada producto
        const categoryA = Array.isArray(a.category) && a.category.length > 0 ? a.category[0] : (a.category || '')
        const categoryB = Array.isArray(b.category) && b.category.length > 0 ? b.category[0] : (b.category || '')

        const countA = getCategoryCount(categoryA)
        const countB = getCategoryCount(categoryB)
        if (countA !== countB) {
          return countB - countA
        }
        // Si tienen el mismo count, ordenar alfabéticamente por categoría
        return categoryA.localeCompare(categoryB)
      })

    // ALTERNATIVA más intuitiva - descomentar para usar:
    // return sorted.sort((a, b) => a.category.localeCompare(b.category))

    case 'brand':
      // OPCIÓN 1: Ordenar por cantidad de productos de la marca (más productos primero)
      return sorted.sort((a, b) => {
        const countA = getBrandCount(a.brand)
        const countB = getBrandCount(b.brand)
        if (countA !== countB) {
          return countB - countA
        }
        // Si tienen el mismo count, ordenar alfabéticamente por marca
        return a.brand.localeCompare(b.brand)
      })

    // ALTERNATIVA más intuitiva - descomentar para usar:
    // return sorted.sort((a, b) => a.brand.localeCompare(b.brand))

    case 'price-asc':
      // Precio de menor a mayor
      return sorted.sort((a, b) => a.price - b.price)

    case 'price-desc':
      // Precio de mayor a menor
      return sorted.sort((a, b) => b.price - a.price)

    default:
      return sorted
  }
})

// Índices para paginación
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, sortedProducts.value.length)
)

// Products paginados
const sortedAndPaginatedProducts = computed(() => {
  return sortedProducts.value.slice(startIndex.value, endIndex.value)
})

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage)
})

// Función para cambiar de página
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Hacer scroll hacia arriba cuando cambias de página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Reset página cuando cambian filtros
const resetPage = () => {
  currentPage.value = 1
}

// Manejar cambios en filtros
const handleFiltersChange = (filters) => {
  activeFilters.value = filters
  resetPage() // Resetear a página 1 cuando cambian los filtros
}

// Manejar cambios en ordenamiento
const handleSortChange = (newSortBy) => {
  sortBy.value = newSortBy
  resetPage() // Resetear a página 1 cuando cambia el ordenamiento
}

// Verificar si hay filtros activos o ordenamiento no por defecto
const hasActiveFilters = computed(() => {
  return activeFiltersCount.value > 0 || sortBy.value !== 'newest'
})

// Resetear todos los filtros y ordenamiento
const resetAllFilters = () => {
  // Resetear filtros
  activeFilters.value = {
    categories: [],
    brands: [],
    stock: [],
    priceRange: { min: null, max: null },
  }

  // Resetear ordenamiento
  sortBy.value = 'newest'

  // Resetear página
  resetPage()
}
</script>
