<template>
  <div>
    <Header />
    <main class="home-main">
      <Hero />
      <Slider />
      <Products
        title="Featured Products"
        :limit="3"
        :show-title="true"
        :products-list="products"
      />
      <Product />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSchema } from '@/composables/useSchema'
import Header from '../components/Header_comp.vue'
import Hero from '../components/Hero_comp.vue'
import Slider from '../components/Slider_comp.vue'
import Products from '../components/Products_comp.vue'
import Product from '../components/Product_comp.vue'
import Contact from '../components/Contact_comp.vue'
import Footer from '../components/Footer_comp.vue'

// SEO Meta Tags
usePageMeta({
  title: 'SLS Shop | Home',
  description:
    'Online shop specialized in tech products, pentesting, and advanced technology. Fast shipping.',
  keywords:
    'tech shop, electronics, gadgets, online store, e-commerce',
  url: 'https://your-domain.com',
  image: 'https://your-domain.com/images/og-home.jpg',
})

// Structured Data - Organization & WebSite
useSchema([
  // Organization Schema
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SLS Shop',
    url: 'https://your-domain.com',
    logo: 'https://your-domain.com/logo.png',
    description:
      'Shop specialized in tech products and advanced technology',
    foundingDate: '2024',
    email: 'contact@your-domain.com',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@your-domain.com',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'English'],
    },
    sameAs: [
      'https://github.com/damalga/sls-shop',
      // Add social networks when available
      // 'https://twitter.com/sls-shop_es',
      // 'https://linkedin.com/company/sls-shop'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
      addressLocality: 'Madrid',
    },
  },
  // WebSite Schema
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SLS Shop',
    url: 'https://your-domain.com',
    description:
      'Online shop for tech products and electronics',
    publisher: {
      '@type': 'Organization',
      name: 'SLS Shop',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://your-domain.com/shop?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
])

// Load products
const { products, loadProducts } = useProducts()

onMounted(loadProducts)
</script>
