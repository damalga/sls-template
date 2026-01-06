<template>
  <div class="error-page">
    <Header />

    <main class="error-container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page not found</h2>
        <p class="error-description">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div class="error-actions">
          <router-link to="/" class="error-btn error-btn--primary">
            Go to home
          </router-link>
          <router-link to="/shop" class="error-btn error-btn--secondary">
            View products
          </router-link>
        </div>

        <!-- Contact information -->
        <div class="error-help">
          <p class="error-help-text">
            If the problem persists, you can contact us:
          </p>
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
</script>
