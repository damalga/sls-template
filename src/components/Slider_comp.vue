<template>
  <section class="slider" aria-label="New arrivals carousel">
    <h2 class="slider-title-main">New Arrivals</h2>
    <div class="slider-container" role="region" aria-roledescription="carrusel">
      <div
        class="slider-slide"
        v-for="(product, i) in limitedProducts"
        :key="product.id"
        :class="{ active: i === activeIndex }"
        v-show="i === activeIndex"
        role="group"
        :aria-roledescription="'slide'"
        :aria-label="`${i + 1} of ${limitedProducts.length}`"
      >
        <img
          :src="product.img"
          :alt="`${product.name} - promotional image`"
          class="slider-img"
        />
        <h3 class="slider-title">{{ product.name }}</h3>
        <p class="slider-desc">{{ product.desc }}</p>
        <button
          class="slider-cta"
          @click="openProductModal(product.id)"
          :aria-label="`View details of ${product.name}`"
        >
          View Product
        </button>
      </div>
      <button
        class="slider-arrow slider-arrow--left"
        @click="prevSlide"
        aria-label="Go to previous slide"
      >
        &#8592;
      </button>
      <button
        class="slider-arrow slider-arrow--right"
        @click="nextSlide"
        aria-label="Go to next slide"
      >
        &#8594;
      </button>
    </div>
    <div class="slider-dots" role="tablist" aria-label="Carousel navigation controls">
      <button
        v-for="(product, i) in limitedProducts"
        :key="product.id"
        :class="{ active: i === activeIndex }"
        @click="goToSlide(i)"
        role="tab"
        :aria-label="`Go to slide ${i + 1}: ${product.name}`"
        :aria-selected="i === activeIndex ? 'true' : 'false'"
        :tabindex="i === activeIndex ? 0 : -1"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useProductModalStore } from '@/stores/productModalStore'

const productModalStore = useProductModalStore()
const { products, loadProducts } = useProducts()
const activeIndex = ref(0)

// Limit to last 3 products
const limitedProducts = computed(() => {
  return products.value.slice(-4)
})

onMounted(() => {
  loadProducts()
})

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % limitedProducts.value.length
}

function prevSlide() {
  activeIndex.value =
    (activeIndex.value - 1 + limitedProducts.value.length) % limitedProducts.value.length
}

function goToSlide(index) {
  activeIndex.value = index
}

function openProductModal(productId) {
  const product = products.value.find((p) => p.id === productId)
  if (product) {
    productModalStore.openModal(product)
  }
}
</script>
