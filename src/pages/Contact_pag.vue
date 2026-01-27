<template>
  <Header />
  <main class="contact-main">
    <div class="contact-container">
      <section class="contact-section">
        <h3>Get in Touch</h3>
        <p>
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        <div class="contact-info">
          <p>
            <strong>Email: </strong>
            <a href="mailto:damalga@protonmail.com">damalga@protonmail.com</a>
          </p>
          <p class="contact-note">
            <em
              >Note: Replace with your actual contact email or integrate a
              contact form service like Formspree, Netlify Forms, or
              SendGrid.</em
            >
          </p>
        </div>
      </section>
    </div>
  </main>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSchema } from '@/composables/useSchema'
import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'

// SEO Meta Tags
usePageMeta({
  title: 'SLS Shop | Contact',
  description:
    'Contacta con SLS Shop para consultas sobre productos, soporte técnico o colaboraciones. Escríbenos a contact@your-domain.com',
  keywords:
    'contact sls-shop, soporte técnico, consultas pentesting, ayuda compra hardware',
  url: 'https://your-domain.com/contact',
  image: 'https://your-domain.com/images/og-contact.jpg',
})

// Structured Data - ContactPage Schema
useSchema({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact - SLS Shop',
  description:
    'Contacta con SLS Shop para consultas sobre productos, soporte técnico o colaboraciones. Escríbenos a contact@your-domain.com',
  url: 'https://your-domain.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'SLS Shop',
    email: 'contact@your-domain.com',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@your-domain.com',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'English'],
      areaServed: 'ES',
    },
  },
})

const showCart = ref(false)
</script>
