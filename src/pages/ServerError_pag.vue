<template>
  <div class="error-page">
    <Header />

    <main class="error-container">
      <div class="error-content">
        <h1 class="error-code">500</h1>
        <h2 class="error-title">Something went wrong</h2>
        <p class="error-description">Sorry, we have an unexpected error.</p>

        <div class="error-actions">
          <button @click="reloadPage" class="error-btn error-btn--primary">Retry</button>
          <router-link to="/" class="error-btn error-btn--secondary"> Go to home </router-link>
        </div>

        <!-- Contact information -->
        <div class="error-help">
          <p class="error-help-text">If the problem persists, you can contact us:</p>
          <a href="mailto:contact@your-domain.com" class="error-contact-link">
            contact@your-domain.com
          </a>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'

const reloadPage = () => {
  window.location.reload()
}
</script>
