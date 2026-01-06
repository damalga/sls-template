import { ref } from 'vue'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function loadProducts() {
    loading.value = true
    try {
      // Try Netlify function first, fallback to sample products
      let data;

      try {
        const res = await fetch('/.netlify/functions/getProducts')
        if (res.ok) {
          data = await res.json()
        } else {
          throw new Error('Function not available')
        }
      } catch (netlifyError) {
        console.log('useProducts: Netlify function not available, loading from sample products')

        // Import sample products from JS file
        const { sampleProducts } = await import('@/data/sample-products.js')

        // Transform data to match frontend schema
        data = sampleProducts.map((product, index) => ({
          id: product.id || index + 1,
          sku: product.sku,
          name: product.name,
          desc: product.description,
          longDesc: product.long_desc,
          img: product.img,
          images: product.images || [],
          price: product.price_cents ? product.price_cents / 100 : 0,
          category: product.category || [],
          brand: product.brand,
          inStock: product.variants
            ? product.variants.options?.some(opt => opt.stock > 0 || opt.inStock)
            : product.stock > 0,
          features: product.features || [],
          variants: product.variants,
          createdAt: product.created_at || new Date().toISOString()
        }))
      }

      products.value = data
    } catch (e) {
      error.value = e.message
      console.error('useProducts: Error loading products:', e)
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, loadProducts }
}
