<template>
  <div>
    <Header />
    <main class="about-main">
      <div class="about-container">
        <section class="about-section">
          <h2>About Our Store</h2>
          <p>
            Welcome to our serverless e-commerce platform!
            <br />
            <br />
            This is a modern, scalable online store built with cutting-edge technologies.
            Our stack includes Vue 3 for the frontend, deployed on Netlify,
            with a PostgreSQL database powered by Neon.
            <br />
            <br />
            This template is designed to be:
            <br />
            - <strong>Serverless</strong>: No server management, scales automatically
            <br />
            - <strong>Fast</strong>: Optimized performance with Vue 3 and Vite
            <br />
            - <strong>Secure</strong>: Payments processed through Stripe
            <br />
            - <strong>Open Source</strong>: Free to use and customize
            <br />
            <br />
            Built with <a href="https://vuejs.org/" target="_blank">Vue 3</a>,
            deployed on <a href="https://www.netlify.com/" target="_blank">Netlify</a>,
            database on <a href="https://neon.tech/" target="_blank">Neon</a>,
            and payments via <a href="https://stripe.com/" target="_blank">Stripe</a>.
            <br />
            <br />
            Customize this page with your own story, mission, and values.
            <br />
            <br />
            Questions? <router-link to="/contact">Contact us</router-link>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSchema } from '@/composables/useSchema'
import Header from '../components/Header_comp.vue'
import Footer from '../components/Footer_comp.vue'

// SEO Meta Tags
usePageMeta({
  title: 'About Us | Serverless Shop',
  description:
    'Learn about our serverless e-commerce platform built with Vue 3, Netlify, and Neon PostgreSQL. Modern, fast, and secure online shopping.',
  keywords:
    'about us, serverless shop, vue ecommerce, netlify store, online shopping',
  url: 'https://your-domain.com/about',
  image: 'https://your-domain.com/images/og-about.jpg',
})

// Structured Data - AboutPage Schema
useSchema({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Our Store',
  description:
    'Modern serverless e-commerce platform built with Vue 3, Netlify, and Neon PostgreSQL.',
  url: 'https://your-domain.com/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'Your Store Name',
    description:
      'Serverless online store built with modern web technologies.',
    url: 'https://your-domain.com',
    foundingDate: '2025',
    email: 'contact@your-domain.com',
  },
})
</script>
