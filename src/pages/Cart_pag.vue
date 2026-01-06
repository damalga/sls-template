<template>
  <div>
    <Header />

    <main class="cart-page">
      <div class="cart-container">
        <h1 class="cart-title">Your Cart</h1>

        <!-- Empty cart -->
        <div v-if="cartStore.totalItems === 0" class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products and come back here</p>
          <router-link to="/shop" class="continue-shopping-btn">Go to Shop</router-link>
        </div>

        <!-- Cart with products -->
        <div v-else class="cart-content">
          <div class="cart-items">
            <div v-for="item in cartStore.cartItems" :key="item.cartItemId" class="cart-item">
              <div class="item-image">
                <img :src="item.img" :alt="item.name" />
              </div>

              <div class="item-info">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-desc">{{ item.desc }}</p>
                <div class="item-price">€{{ item.price }}</div>
              </div>

              <div class="item-controls">
                <div class="quantity-controls">
                  <button
                    class="quantity-btn minus"
                    @click="cartStore.updateQuantity(item.cartItemId, item.quantity - 1)"
                    :aria-label="`Decrease quantity of ${item.name}`"
                    :aria-describedby="`quantity-${item.cartItemId}`"
                  >
                    −
                  </button>
                  <span
                    class="quantity"
                    :id="`quantity-${item.cartItemId}`"
                    role="status"
                    aria-live="polite"
                    :aria-label="`Quantity: ${item.quantity}`"
                  >
                    {{ item.quantity }}
                  </span>
                  <button
                    class="quantity-btn plus"
                    @click="cartStore.updateQuantity(item.cartItemId, item.quantity + 1)"
                    :aria-label="`Increase quantity of ${item.name}`"
                    :aria-describedby="`quantity-${item.cartItemId}`"
                    :disabled="isMaxQuantity(item.quantity)"
                  >
                    +
                  </button>
                </div>
                <div class="item-total" aria-label="Product subtotal">
                  €{{ (item.price * item.quantity).toFixed(2) }}
                </div>
                <button
                  class="remove-item"
                  @click="confirmRemoveItem(item)"
                  :aria-label="`Remove ${item.name} from cart`"
                >
                  Remove product
                </button>
              </div>
            </div>

            <!-- Clear cart button -->
            <div v-if="cartStore.totalItems > 0" class="cart-actions">
              <button class="clear-cart-btn" @click="confirmClearCart">Clear cart</button>
            </div>
          </div>

          <!-- Cart summary -->
          <div class="cart-summary">
            <div class="summary-card">
              <h3>Order Summary</h3>

              <div class="summary-row">
                <span>Products ({{ cartStore.totalItems }})</span>
                <span>€{{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div class="summary-row total">
                <span>Total</span>
                <span>€{{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>

              <button
                class="checkout-btn"
                @click="handleCheckout"
                :disabled="cartStore.loading || cartStore.totalItems === 0"
              >
                <span v-if="cartStore.loading">Processing...</span>
                <span v-else>Proceed to Checkout</span>
              </button>

              <router-link to="/shop" class="continue-shopping">Continue Shopping</router-link>

              <!-- Stripe error message -->
              <div v-if="cartStore.error" class="checkout-error">⚠️ {{ cartStore.error }}</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />

    <!-- Clear cart confirmation modal -->
    <ConfirmModal
      :show="showConfirmModal"
      title="Clear cart"
      message="Are you sure you want to remove all products from the cart? This action cannot be undone."
      confirm-text="Yes, clear cart"
      cancel-text="Cancel"
      @confirm="handleConfirmClear"
      @cancel="handleCancelClear"
    />

    <!-- Remove item confirmation modal -->
    <ConfirmModal
      :show="showRemoveItemModal"
      title="Remove product"
      :message="`Are you sure you want to remove '${itemToRemove?.name}' from the cart?`"
      confirm-text="Yes, remove"
      cancel-text="Cancel"
      @confirm="handleConfirmRemoveItem"
      @cancel="handleCancelRemoveItem"
    />
  </div>
</template>

<script setup>
import { usePageMeta } from '@/composables/usePageMeta'
import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'
import ConfirmModal from '../components/ConfirmModal_comp.vue'
import { useCartStore } from '../stores/cartStore'
import { QUANTITY_LIMITS } from '@/utils/helpers'
import { ref, computed } from 'vue'

// SEO Meta Tags - Do not index cart
usePageMeta({
  title: 'Shopping Cart | SLS Shop',
  description: 'Review your shopping cart',
  robots: 'noindex, nofollow', // Cart should not be indexed
  url: 'https://your-domain.com/cart',
})

const cartStore = useCartStore()
const showConfirmModal = ref(false)
const showRemoveItemModal = ref(false)
const itemToRemove = ref(null)

// Check if item quantity has reached maximum
const isMaxQuantity = (quantity) => quantity >= QUANTITY_LIMITS.MAX

const confirmClearCart = () => {
  showConfirmModal.value = true
}

const handleConfirmClear = () => {
  cartStore.clearCart()
  showConfirmModal.value = false
}

const handleCancelClear = () => {
  showConfirmModal.value = false
}

const confirmRemoveItem = (item) => {
  itemToRemove.value = item
  showRemoveItemModal.value = true
}

const handleConfirmRemoveItem = () => {
  if (itemToRemove.value) {
    cartStore.removeFromCart(itemToRemove.value.cartItemId)
  }
  showRemoveItemModal.value = false
  itemToRemove.value = null
}

const handleCancelRemoveItem = () => {
  showRemoveItemModal.value = false
  itemToRemove.value = null
}

// ==========================================
// CHECKOUT - Stripe redirect
// ==========================================
const handleCheckout = async () => {
  try {
    // Verify cart is not empty
    if (cartStore.totalItems === 0) {
      console.warn('Checkout attempt with empty cart')
      return
    }

    console.log('Starting checkout process')
    console.log('Items in cart:', cartStore.totalItems)
    console.log('Total:', cartStore.totalPrice)

    // Temporary customer info (in production this would come from a form)
    const customerInfo = {
      email: 'test@example.com', // TODO: Replace with checkout form
      name: 'Test Customer',
    }

    // Redirect to Stripe Checkout
    await cartStore.redirectToCheckout(customerInfo)

    console.log('Redirecting to Stripe')
  } catch (error) {
    console.error('Checkout error:', error)
    // Error already displayed in cartStore.error automatically
  }
}
</script>
