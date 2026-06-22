<template>
  <Header />
  <main class="contact-main">
    <div class="contact-container">
      <section class="contact-section">
        <h3>Get in Touch</h3>
        <p>
          This is where your store's contact channel goes. Replace it with your
          actual contact email, a custom form, or an integrated service like
          <a
            href="https://docs.netlify.com/forms/setup/"
            target="_blank"
            rel="noopener noreferrer"
            >Netlify Forms</a
          >,
          <a
            href="https://formspree.io/"
            target="_blank"
            rel="noopener noreferrer"
            >Formspree</a
          >
          or
          <a
            href="https://sendgrid.com/"
            target="_blank"
            rel="noopener noreferrer"
            >SendGrid</a
          >.
        </p>
      </section>

      <section class="contact-section">
        <h3>Want to talk to me?</h3>
        <p>
          I'm
          <a
            href="https://damalga.com"
            target="_blank"
            rel="noopener noreferrer"
            >this human</a
          >. You can reach me at
          <a href="mailto:damalga@protonmail.com">damalga@protonmail.com</a>.
          <br />
          <br />
          You can also hire my services through
          <a
            href="https://www.upwork.com/freelancers/~018e40e37800686d3f"
            target="_blank"
            rel="noopener noreferrer"
            >Upwork</a
          >, including professionally setting up a store like this one with your
          own visual identity:
          <a
            href="https://www.upwork.com/services/product/development-it-serverless-e-commerce-based-on-vue-2059618322864258332?ref=fl_profile"
            target="_blank"
            rel="noopener noreferrer"
            >see the e-commerce project here</a
          >.
        </p>
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
