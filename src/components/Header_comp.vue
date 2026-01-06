<template>
  <header class="header">
    <nav class="header-nav">
      <div class="header-left">
        <router-link to="/shop" class="header-link">Shop</router-link>
      </div>
      <div class="header-logo">
        <router-link to="/" class="logo-link">SLS Shop</router-link>
      </div>
      <div class="header-right">
        <router-link to="/cart" class="header-cart">
            Cart
          <span v-if="cartStore.totalItems > 0" class="cart-info">
            ({{ cartStore.totalItems }}) [{{ cartStore.totalPrice }}€]
          </span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped>
/* Styles included from _cart.scss */
</style>
